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

SOURCE_PAGE = "https://www.pref.kanagawa.jp/docs/a7g/cnt/f7176/meibo080101.html"
SOURCES = [
    ("横浜市宗教法人名簿", "https://www.pref.kanagawa.jp/documents/131519/4_yokohamashi.xlsx"),
    ("川崎市宗教法人名簿", "https://www.pref.kanagawa.jp/documents/131519/5_kawasakishi.xlsx"),
    ("相模原市宗教法人名簿", "https://www.pref.kanagawa.jp/documents/131519/6_sagamiharashi.xlsx"),
    ("その他1宗教法人名簿", "https://www.pref.kanagawa.jp/documents/131519/7_sonota1.xlsx"),
    ("その他2宗教法人名簿", "https://www.pref.kanagawa.jp/documents/131519/8_sonota2.xlsx"),
]
USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    return parser.parse_args()


def normalize(value):
    value = unicodedata.normalize("NFKC", str(value or "")).strip()
    return re.sub(r"\s+", "", value)


def fetch_bytes(url):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def column_index(reference):
    match = re.match(r"[A-Z]+", reference or "")
    if not match:
        return None
    index = 0
    for char in match.group(0):
        index = index * 26 + ord(char) - ord("A") + 1
    return index - 1


def shared_strings(archive):
    try:
        root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    result = []
    for item in root.findall("x:si", NS):
        result.append("".join(node.text or "" for node in item.findall(".//x:t", NS)))
    return result


def sheet_paths(archive):
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    relationship_map = {
        node.attrib["Id"]: node.attrib["Target"]
        for node in relationships.findall("r:Relationship", REL_NS)
    }
    relationship_attr = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
    result = []
    for sheet in workbook.findall("x:sheets/x:sheet", NS):
        target = relationship_map.get(sheet.attrib.get(relationship_attr))
        if not target:
            continue
        if target.startswith("/"):
            path = target.lstrip("/")
        else:
            path = "xl/" + target.lstrip("./")
        result.append((sheet.attrib.get("name", ""), path))
    return result


def cell_value(cell, strings):
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(node.text or "" for node in cell.findall(".//x:t", NS))
    value_node = cell.find("x:v", NS)
    if value_node is None:
        return ""
    raw = value_node.text or ""
    if cell_type == "s":
        try:
            return strings[int(raw)]
        except (ValueError, IndexError):
            return raw
    return raw


def rows_from_sheet(archive, path, strings):
    root = ET.fromstring(archive.read(path))
    for row in root.findall(".//x:sheetData/x:row", NS):
        values = {}
        for cell in row.findall("x:c", NS):
            index = column_index(cell.attrib.get("r"))
            if index is not None:
                values[index] = cell_value(cell, strings)
        if values:
            yield [values.get(index, "") for index in range(max(values) + 1)]


def find_header(row):
    normalized = [normalize(cell) for cell in row]
    name_index = next((i for i, cell in enumerate(normalized) if cell in {"法人名", "宗教法人名", "名称"} or "法人名" in cell), None)
    address_index = next((i for i, cell in enumerate(normalized) if "所在地" in cell or "主たる事務所" in cell), None)
    if name_index is None or address_index is None:
        return None
    return {
        "name": name_index,
        "address": address_index,
        "system": next((i for i, cell in enumerate(normalized) if "系統" in cell), None),
        "umbrella": next((i for i, cell in enumerate(normalized) if "包括団体" in cell), None),
        "municipality": next((i for i, cell in enumerate(normalized) if "市区町村" in cell or "市町村" in cell), None),
    }


def row_value(row, index):
    return str(row[index]).strip() if index is not None and index < len(row) else ""


def system_marker(row):
    for cell in row:
        value = normalize(cell)
        if not value:
            continue
        if "神道系" in value or value == "神道":
            return "神道系"
        if "仏教系" in value or value == "仏教":
            return "仏教系"
        if "キリスト教系" in value or value == "キリスト教":
            return "キリスト教系"
        if value == "諸教" or "諸教系" in value:
            return "諸教"
    return None


def strip_corporate_prefix(name):
    value = str(name or "").strip()
    return re.sub(r"^宗教法人\s*", "", value).strip()


def municipality_from_address(address):
    value = normalize(address)
    value = re.sub(r"^神奈川県", "", value)
    for city in ("横浜市", "川崎市", "相模原市"):
        if value.startswith(city):
            return city
    match = re.match(r"^(.+?[市町村])", value)
    return match.group(1) if match else ""


def parse_workbook(title, url, payload):
    archive = zipfile.ZipFile(io.BytesIO(payload))
    strings = shared_strings(archive)
    records = []
    diagnostics = []

    for sheet_name, sheet_path in sheet_paths(archive):
        header = None
        current_system = None
        sample_count = 0
        for row in rows_from_sheet(archive, sheet_path, strings):
            marker = system_marker(row)
            if marker:
                current_system = marker

            possible_header = find_header(row)
            if possible_header:
                header = possible_header
                continue

            if sample_count < 12 and any(normalize(cell) for cell in row):
                diagnostics.append({"sheet": sheet_name, "row": [str(cell) for cell in row[:8]]})
                sample_count += 1

            if not header:
                continue

            system = row_value(row, header["system"]) if header["system"] is not None else current_system
            if "神道" not in normalize(system):
                continue

            name = strip_corporate_prefix(row_value(row, header["name"]))
            address = row_value(row, header["address"])
            municipality = row_value(row, header["municipality"]) if header["municipality"] is not None else ""
            municipality = municipality or municipality_from_address(address)
            umbrella = row_value(row, header["umbrella"]) if header["umbrella"] is not None else ""

            if not name or not address or not municipality:
                continue
            if normalize(name) in {"法人名", "宗教法人名", "名称"}:
                continue

            records.append({
                "name": name,
                "municipality": municipality,
                "address": address,
                "system": "神道系",
                "umbrella": umbrella or None,
                "source_url": url,
                "source_title": f"{title}｜神奈川県",
                "sheet": sheet_name,
            })

    return records, diagnostics


def main():
    args = parse_args()
    records = []
    failures = []
    diagnostics = {}

    for title, url in SOURCES:
        try:
            parsed, samples = parse_workbook(title, url, fetch_bytes(url))
            diagnostics[title] = {"parsed_records": len(parsed), "samples": samples}
            records.extend(parsed)
        except Exception as exc:  # noqa: BLE001
            failures.append({"title": title, "url": url, "error": str(exc)})

    seen = set()
    deduped = []
    for row in records:
        key = (normalize(row["name"]), normalize(row["municipality"]), normalize(row["address"]))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(row)
    deduped.sort(key=lambda row: (normalize(row["municipality"]), normalize(row["name"]), normalize(row["address"])))

    if failures:
        raise RuntimeError(f"Kanagawa authority workbook failures: {json.dumps(failures, ensure_ascii=False)}")
    if len(deduped) < 100:
        raise RuntimeError(
            "Kanagawa parser produced too few Shinto-system records: "
            f"{len(deduped)}; diagnostics={json.dumps(diagnostics, ensure_ascii=False)[:10000]}"
        )

    output = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": "kanagawa-prefecture-religious-corporation-roster",
        "jurisdiction": "JP-14",
        "prefecture": "神奈川県",
        "publisher": "神奈川県",
        "source_page": SOURCE_PAGE,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source_count": len(SOURCES),
        "failed_source_count": len(failures),
        "record_count": len(deduped),
        "records": deduped,
    }
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(json.dumps({
        "authority": output["authority_id"],
        "sources": output["source_count"],
        "failed_sources": output["failed_source_count"],
        "records": output["record_count"],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
