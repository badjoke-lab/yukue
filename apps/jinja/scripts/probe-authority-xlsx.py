#!/usr/bin/env python3
import argparse
import io
import json
import re
import urllib.request
import zipfile
import xml.etree.ElementTree as ET

USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}


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
    return ["".join(node.text or "" for node in item.findall(".//x:t", NS)) for item in root.findall("x:si", NS)]


def sheet_paths(archive):
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    relmap = {node.attrib["Id"]: node.attrib["Target"] for node in relationships.findall("r:Relationship", REL_NS)}
    relattr = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
    for sheet in workbook.findall("x:sheets/x:sheet", NS):
        target = relmap.get(sheet.attrib.get(relattr))
        if not target:
            continue
        path = target.lstrip("/") if target.startswith("/") else "xl/" + target.lstrip("./")
        yield sheet.attrib.get("name", ""), path


def cell_value(cell, strings):
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(node.text or "" for node in cell.findall(".//x:t", NS))
    value = cell.find("x:v", NS)
    if value is None:
        return ""
    raw = value.text or ""
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


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    with urllib.request.urlopen(request, timeout=90) as response:
        payload = response.read()
        return payload, response.geturl(), response.headers.get("Content-Type", "")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--label", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--rows", type=int, default=30)
    args = parser.parse_args()

    payload, resolved_url, content_type = fetch(args.url)
    if not payload.startswith(b"PK\x03\x04"):
        raise RuntimeError(f"{args.label}: not OOXML; content_type={content_type}; magic={payload[:16].hex()}; resolved={resolved_url}")
    archive = zipfile.ZipFile(io.BytesIO(payload))
    strings = shared_strings(archive)
    output = {"label": args.label, "resolved_url": resolved_url, "content_type": content_type, "bytes": len(payload), "sheets": []}
    for sheet_name, sheet_path in sheet_paths(archive):
        rows = []
        nonempty_count = 0
        for row in rows_from_sheet(archive, sheet_path, strings):
            if not any(str(cell).strip() for cell in row):
                continue
            nonempty_count += 1
            if len(rows) < args.rows:
                rows.append([str(cell) for cell in row[:16]])
        output["sheets"].append({"name": sheet_name, "nonempty_rows": nonempty_count, "sample": rows})
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
