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

USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}


def norm(v):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", str(v or "")).strip())


def col_index(ref):
    m = re.match(r"[A-Z]+", ref or "")
    if not m:
        return None
    n = 0
    for ch in m.group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read(), r.geturl(), r.headers.get("Content-Type", "")


def shared_strings(z):
    try:
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    return ["".join(n.text or "" for n in si.findall(".//x:t", NS)) for si in root.findall("x:si", NS)]


def sheets(z):
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    relmap = {n.attrib["Id"]: n.attrib["Target"] for n in rels.findall("r:Relationship", REL_NS)}
    relattr = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
    for sheet in wb.findall("x:sheets/x:sheet", NS):
        target = relmap.get(sheet.attrib.get(relattr))
        if target:
            path = target.lstrip("/") if target.startswith("/") else "xl/" + target.lstrip("./")
            yield sheet.attrib.get("name", ""), path


def cell_value(cell, strings):
    t = cell.attrib.get("t")
    if t == "inlineStr":
        return "".join(n.text or "" for n in cell.findall(".//x:t", NS))
    v = cell.find("x:v", NS)
    if v is None:
        return ""
    raw = v.text or ""
    if t == "s":
        try:
            return strings[int(raw)]
        except (ValueError, IndexError):
            return raw
    return raw


def rows(z, path, strings):
    root = ET.fromstring(z.read(path))
    for row in root.findall(".//x:sheetData/x:row", NS):
        vals = {}
        for cell in row.findall("x:c", NS):
            i = col_index(cell.attrib.get("r"))
            if i is not None:
                vals[i] = cell_value(cell, strings)
        if vals:
            yield [vals.get(i, "") for i in range(max(vals) + 1)]


def find_col(cells, predicates):
    for i, c in enumerate(cells):
        v = norm(c)
        if any(p(v) for p in predicates):
            return i
    return None


def detect_header(row):
    name = find_col(row, [lambda v: "法人名称" in v, lambda v: "宗教法人名" in v, lambda v: v in {"法人名", "名称"}])
    address = find_col(row, [lambda v: "主たる事務所" in v and ("所在地" in v or "住所" in v), lambda v: "事務所所在地" in v, lambda v: v in {"所在地", "住所"}])
    if name is None or address is None:
        return None
    system = find_col(row, [lambda v: "系統" in v, lambda v: "宗派" in v, lambda v: "分類" in v])
    municipality = find_col(row, [
        lambda v: v in {"市町村", "市町村名", "市区町村", "市区町村名"},
        lambda v: "所在地市町村" in v,
        lambda v: "所在地市区町村" in v,
    ])
    umbrella = find_col(row, [
        lambda v: "包括団体" in v,
        lambda v: "包括宗教団体" in v,
        lambda v: "被包括宗教団体" in v,
    ])
    return {"name": name, "address": address, "system": system, "municipality": municipality, "umbrella": umbrella}


def at(row, i):
    return str(row[i]).strip() if i is not None and i < len(row) else ""


def municipality_from_address(address, prefecture):
    v = norm(address)
    if prefecture and v.startswith(prefecture):
        v = v[len(prefecture):]
    designated = ["大阪市", "堺市", "福岡市", "北九州市"]
    for city in designated:
        if v.startswith(city):
            return city
    if "郡" in v:
        rest = v.split("郡", 1)[1]
        m = re.match(r"^(.+?[町村])", rest)
        if m:
            return m.group(1)
    m = re.match(r"^(.+?[市町村])", v)
    return m.group(1) if m else ""


def shinto_label(value):
    v = norm(value)
    if not v:
        return False
    return (
        "神社本庁" in v
        or "神道" in v
        or "神社" in v
        or "単立(神社)" in v
        or "単立（神社）" in v
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--source-page", required=True)
    ap.add_argument("--authority-id", required=True)
    ap.add_argument("--jurisdiction", required=True)
    ap.add_argument("--prefecture", required=True)
    ap.add_argument("--publisher", required=True)
    ap.add_argument("--source-title", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--minimum-records", type=int, default=50)
    args = ap.parse_args()

    payload, resolved, content_type = fetch(args.url)
    if not payload.startswith(b"PK\x03\x04"):
        raise RuntimeError(f"not OOXML: {content_type}; {resolved}")
    z = zipfile.ZipFile(io.BytesIO(payload))
    strings = shared_strings(z)
    records = []
    diagnostics = []
    for sheet_name, path in sheets(z):
        allrows = list(rows(z, path, strings))
        header = None
        header_i = None
        for i, row in enumerate(allrows[:60]):
            h = detect_header(row)
            if h:
                header, header_i = h, i
                break
        if not header:
            diagnostics.append({"sheet": sheet_name, "status": "header_not_found"})
            continue
        context = norm(sheet_name + " " + " ".join(" ".join(map(str, r[:12])) for r in allrows[:header_i + 1]))
        sheet_shinto = "神道" in context or "神社" in context
        count = 0
        for row in allrows[header_i + 1:]:
            name = re.sub(r"^宗教法人\s*", "", at(row, header["name"])).strip()
            address = at(row, header["address"])
            if not name or not address:
                continue
            system = at(row, header["system"])
            umbrella = at(row, header["umbrella"])
            is_shinto = sheet_shinto or shinto_label(system) or shinto_label(umbrella)
            if not is_shinto:
                continue
            municipality = at(row, header["municipality"]) or municipality_from_address(address, args.prefecture)
            if not municipality:
                continue
            records.append({
                "name": name,
                "municipality": municipality,
                "address": address,
                "system": system or "神道系",
                "umbrella": umbrella or None,
                "source_url": resolved,
                "source_title": args.source_title,
                "sheet": sheet_name,
            })
            count += 1
        diagnostics.append({"sheet": sheet_name, "status": "parsed", "header_row": header_i + 1, "header": header, "shinto_rows": count})

    seen, deduped = set(), []
    for row in records:
        key = (norm(row["name"]), norm(row["municipality"]), norm(row["address"]))
        if key not in seen:
            seen.add(key)
            deduped.append(row)
    deduped.sort(key=lambda r: (norm(r["municipality"]), norm(r["name"]), norm(r["address"])))
    if len(deduped) < args.minimum_records:
        raise RuntimeError(f"too few Shinto records: {len(deduped)} < {args.minimum_records}; diagnostics={json.dumps(diagnostics, ensure_ascii=False)}")
    out = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": args.authority_id,
        "jurisdiction": args.jurisdiction,
        "prefecture": args.prefecture,
        "publisher": args.publisher,
        "source_page": args.source_page,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source_count": 1,
        "failed_source_count": 0,
        "record_count": len(deduped),
        "resolved_xlsx_url": resolved,
        "records": deduped,
    }
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(json.dumps({"authority": args.authority_id, "records": len(deduped), "resolved": resolved}, ensure_ascii=False))


if __name__ == "__main__":
    main()
