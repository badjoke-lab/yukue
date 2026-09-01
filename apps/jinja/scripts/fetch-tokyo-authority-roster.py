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
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

SOURCE_PAGE = "https://www.seikatubunka.metro.tokyo.lg.jp/houjin/shukyo_houjin"
USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"
NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-page", default=SOURCE_PAGE)
    parser.add_argument("--excel-url")
    parser.add_argument("--out", required=True)
    return parser.parse_args()


def normalize(value):
    value = unicodedata.normalize("NFKC", str(value or "")).strip()
    return re.sub(r"\s+", "", value)


def fetch_bytes(url, accept="*/*"):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": accept},
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read(), response.headers.get("Content-Type", "")


class ExcelLinkParser(HTMLParser):
    def __init__(self, base_url):
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.current_href = None
        self.current_text = []
        self.candidates = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "a":
            self.current_href = dict(attrs).get("href")
            self.current_text = []

    def handle_data(self, data):
        if self.current_href is not None:
            self.current_text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() != "a" or self.current_href is None:
            return
        href = urljoin(self.base_url, self.current_href)
        text = normalize("".join(self.current_text)).upper()
        parsed = urlparse(href)
        path = parsed.path.lower()
        score = 0
        if path.endswith((".xlsx", ".xls", ".xlsm")):
            score += 10
        if "EXCEL" in text or "エクセル" in text:
            score += 6
        if "宗教法人名簿" in text:
            score += 4
        if "20251231" in href or "071231" in href or "R07" in href.upper():
            score += 3
        if score:
            self.candidates.append((score, href, text))
        self.current_href = None
        self.current_text = []


def resolve_excel_url(source_page):
    payload, _ = fetch_bytes(source_page, "text/html,*/*;q=0.8")
    parser = ExcelLinkParser(source_page)
    parser.feed(payload.decode("utf-8", errors="replace"))
    if not parser.candidates:
        raise RuntimeError("No Tokyo religious-corporation Excel link found on source page")
    candidates = sorted(parser.candidates, key=lambda item: (-item[0], item[1]))
    for _, url, text in candidates:
        if "宗教法人" in text or url.lower().endswith((".xlsx", ".xls", ".xlsm")):
            return url
    return candidates[0][1]


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
        path = target.lstrip("/") if target.startswith("/") else "xl/" + target.lstrip("./")
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
    cells = [normalize(cell) for cell in row]
    system = next((i for i, cell in enumerate(cells) if "系統名" in cell or cell == "系統"), None)
    name = next((i for i, cell in enumerate(cells) if "法人名称" in cell or "法人名" in cell), None)
    address = next((i for i, cell in enumerate(cells) if "事務所所在地" in cell or "所在地" == cell), None)
    if system is None or name is None or address is None:
        return None
    umbrella = next((i for i, cell in enumerate(cells) if "包括団体" in cell), None)
    return {"system": system, "name": name, "address": address, "umbrella": umbrella}


def row_value(row, index):
    return str(row[index]).strip() if index is not None and index < len(row) else ""


def municipality_from_address(address):
    value = normalize(address)
    value = re.sub(r"^東京都", "", value)
    if "郡" in value:
        value = value.split("郡", 1)[1]
    match = re.match(r"^(.+?[区市町村])", value)
    return match.group(1) if match else ""


def parse_xlsx(payload, source_url):
    try:
        archive = zipfile.ZipFile(io.BytesIO(payload))
    except zipfile.BadZipFile as exc:
        raise RuntimeError(
            f"Tokyo roster Excel is not OOXML/XLSX; source={source_url}; magic={payload[:8].hex()}"
        ) from exc
    strings = shared_strings(archive)
    records = []
    diagnostics = []
    for sheet_name, sheet_path in sheet_paths(archive):
        header = None
        sample_count = 0
        for row in rows_from_sheet(archive, sheet_path, strings):
            possible_header = find_header(row)
            if possible_header:
                header = possible_header
                continue
            if sample_count < 10 and any(normalize(cell) for cell in row):
                diagnostics.append({"sheet": sheet_name, "row": [str(cell) for cell in row[:8]]})
                sample_count += 1
            if not header:
                continue
            system = row_value(row, header["system"])
            if "神道" not in normalize(system):
                continue
            name = re.sub(r"^宗教法人\s*", "", row_value(row, header["name"])).strip()
            address = row_value(row, header["address"])
            municipality = municipality_from_address(address)
            umbrella = row_value(row, header["umbrella"])
            if not name or not address or not municipality:
                continue
            records.append({
                "name": name,
                "municipality": municipality,
                "address": address,
                "system": "神道系",
                "umbrella": umbrella or None,
                "source_url": source_url,
                "source_title": "東京都宗教法人名簿（令和7年12月31日現在）",
                "sheet": sheet_name,
            })
    return records, diagnostics


def main():
    args = parse_args()
    excel_url = args.excel_url or resolve_excel_url(args.source_page)
    payload, content_type = fetch_bytes(excel_url)
    records, diagnostics = parse_xlsx(payload, excel_url)

    seen = set()
    deduped = []
    for row in records:
        key = (normalize(row["name"]), normalize(row["municipality"]), normalize(row["address"]))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(row)
    deduped.sort(key=lambda row: (normalize(row["municipality"]), normalize(row["name"]), normalize(row["address"])))

    if len(deduped) < 500:
        raise RuntimeError(
            "Tokyo parser produced too few Shinto-system records: "
            f"{len(deduped)}; source={excel_url}; content_type={content_type}; "
            f"diagnostics={json.dumps(diagnostics, ensure_ascii=False)[:12000]}"
        )

    output = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": "tokyo-metropolitan-religious-corporation-roster",
        "jurisdiction": "JP-13",
        "prefecture": "東京都",
        "publisher": "東京都",
        "source_page": args.source_page,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source_count": 1,
        "failed_source_count": 0,
        "record_count": len(deduped),
        "resolved_excel_url": excel_url,
        "records": deduped,
    }
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(json.dumps({
        "authority": output["authority_id"],
        "excel_url": excel_url,
        "records": output["record_count"],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
