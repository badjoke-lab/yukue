#!/usr/bin/env python3
import argparse
import io
import json
import re
import unicodedata
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

DEFAULT_URL = "https://www.pref.chiba.lg.jp/gakuji/shuukyou/houjin/documents/syuukyoumeibo202607.xlsx"
SOURCE_PAGE = "https://www.pref.chiba.lg.jp/gakuji/shuukyou/houjin/houjinmeibo.html"
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=DEFAULT_URL)
    parser.add_argument("--out", required=True)
    return parser.parse_args()


def normalize(value):
    value = unicodedata.normalize("NFKC", str(value or "")).strip()
    return re.sub(r"\s+", "", value)


def col_index(ref):
    letters = re.match(r"[A-Z]+", ref).group(0)
    index = 0
    for ch in letters:
        index = index * 26 + (ord(ch) - ord("A") + 1)
    return index - 1


def read_shared_strings(zf):
    try:
        root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    values = []
    for si in root.findall("x:si", NS):
        values.append("".join(node.text or "" for node in si.findall(".//x:t", NS)))
    return values


def workbook_sheet_paths(zf):
    workbook = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels.findall("r:Relationship", REL_NS)}
    result = []
    rel_attr = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
    for sheet in workbook.findall("x:sheets/x:sheet", NS):
        target = rel_map.get(sheet.attrib.get(rel_attr))
        if not target:
            continue
        path = target.lstrip("/") if target.startswith("/") else "xl/" + target.lstrip("./")
        result.append((sheet.attrib.get("name", ""), path))
    return result


def cell_value(cell, shared):
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(node.text or "" for node in cell.findall(".//x:t", NS))
    value_node = cell.find("x:v", NS)
    if value_node is None:
        return ""
    raw = value_node.text or ""
    if cell_type == "s":
        try:
            return shared[int(raw)]
        except (ValueError, IndexError):
            return raw
    return raw


def rows_from_sheet(zf, path, shared):
    root = ET.fromstring(zf.read(path))
    for row in root.findall(".//x:sheetData/x:row", NS):
        values = {}
        for cell in row.findall("x:c", NS):
            ref = cell.attrib.get("r")
            if ref:
                values[col_index(ref)] = cell_value(cell, shared)
        if values:
            yield [values.get(i, "") for i in range(max(values) + 1)]


def find_header(row):
    normalized = [normalize(value) for value in row]
    required = ["系統", "法人名", "市町村名", "所在地"]
    if not all(key in normalized for key in required):
        return None
    optional = ["包括団体名", "地区コード", "連番"]
    return {key: normalized.index(key) for key in required + [key for key in optional if key in normalized]}


def download(url):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"},
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def main():
    args = parse_args()
    workbook_bytes = download(args.url)
    zf = zipfile.ZipFile(io.BytesIO(workbook_bytes))
    shared = read_shared_strings(zf)
    records = []
    seen = set()

    for sheet_name, sheet_path in workbook_sheet_paths(zf):
        header = None
        for row in rows_from_sheet(zf, sheet_path, shared):
            candidate_header = find_header(row)
            if candidate_header:
                header = candidate_header
                continue
            if not header:
                continue

            def field(name):
                index = header.get(name)
                return str(row[index]).strip() if index is not None and index < len(row) else ""

            system = normalize(field("系統"))
            name = field("法人名")
            municipality = field("市町村名")
            address = field("所在地")
            if system != "神道系" or not name or not municipality or not address:
                continue
            key = (normalize(name), normalize(municipality), normalize(address))
            if key in seen:
                continue
            seen.add(key)
            records.append({
                "name": name,
                "municipality": municipality,
                "address": address,
                "system": field("系統") or "神道系",
                "umbrella": field("包括団体名") or None,
                "district_code": field("地区コード") or None,
                "serial": field("連番") or None,
                "sheet": sheet_name,
            })

    records.sort(key=lambda row: (normalize(row["municipality"]), normalize(row["name"]), normalize(row["address"])))
    output = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": "chiba-prefecture-religious-corporation-roster",
        "jurisdiction": "JP-12",
        "publisher": "千葉県",
        "source_page": SOURCE_PAGE,
        "source_url": args.url,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "record_count": len(records),
        "records": records,
    }
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    print(json.dumps({"authority": output["authority_id"], "records": len(records)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
