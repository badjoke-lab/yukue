#!/usr/bin/env python3
import argparse
import json
import re
import unicodedata
import urllib.request
from datetime import datetime, timezone

import xlrd

SOURCE_PAGE = "https://www.pref.saitama.lg.jp/a0204/shukyo/shukyo-ichiran.html"
XLS_URL = "https://www.pref.saitama.lg.jp/documents/2035/r0712syukyouhoujinichiran.xls"
USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"
OFFICIAL_SHINTO_COUNT = 2059


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-page", default=SOURCE_PAGE)
    parser.add_argument("--xls-url", default=XLS_URL)
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
            "Accept": "application/vnd.ms-excel,*/*;q=0.5",
        },
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read(), response.headers.get("Content-Type", "")


def cell_text(value):
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value).strip()


def find_column(cells, patterns):
    for index, cell in enumerate(cells):
        normalized = normalize(cell)
        if any(pattern(normalized) for pattern in patterns):
            return index
    return None


def detect_header(row):
    cells = [cell_text(value) for value in row]
    name = find_column(cells, [
        lambda value: "法人名称" in value,
        lambda value: "宗教法人名" in value,
        lambda value: value == "法人名",
        lambda value: value == "名称",
    ])
    address = find_column(cells, [
        lambda value: "主たる事務所" in value and ("所在地" in value or "住所" in value),
        lambda value: "事務所所在地" in value,
        lambda value: value == "所在地",
        lambda value: value == "住所",
    ])
    if name is None or address is None:
        return None
    system = find_column(cells, [
        lambda value: "系統名" in value,
        lambda value: value == "系統",
    ])
    umbrella = find_column(cells, [
        lambda value: "包括団体" in value,
    ])
    municipality = find_column(cells, [
        lambda value: value in {"市町村", "市町村名"},
    ])
    return {
        "name": name,
        "address": address,
        "system": system,
        "umbrella": umbrella,
        "municipality": municipality,
    }


def value_at(row, index):
    if index is None or index >= len(row):
        return ""
    return cell_text(row[index])


def municipality_from_address(address):
    value = normalize(address)
    value = re.sub(r"^埼玉県", "", value)
    if value.startswith("さいたま市"):
        return "さいたま市"
    if "郡" in value:
        after_gun = value.split("郡", 1)[1]
        match = re.match(r"^(.+?[町村])", after_gun)
        if match:
            return match.group(1)
    match = re.match(r"^(.+?[市町村])", value)
    return match.group(1) if match else ""


def workbook_records(payload, source_url):
    if not payload.startswith(bytes.fromhex("d0cf11e0a1b11ae1")):
        raise RuntimeError(
            f"Saitama roster is not a legacy OLE/BIFF XLS file; source={source_url}; magic={payload[:8].hex()}"
        )
    book = xlrd.open_workbook(file_contents=payload, on_demand=True)
    records = []
    diagnostics = []

    for sheet in book.sheets():
        header = None
        header_row = None
        title_context = []
        for row_index in range(min(sheet.nrows, 40)):
            row = sheet.row_values(row_index)
            nonempty = [cell_text(value) for value in row if normalize(value)]
            if nonempty:
                title_context.extend(nonempty[:6])
            possible = detect_header(row)
            if possible:
                header = possible
                header_row = row_index
                break

        if not header:
            diagnostics.append({
                "sheet": sheet.name,
                "status": "header_not_found",
                "sample": title_context[:20],
            })
            continue

        context = normalize(" ".join([sheet.name, *title_context]))
        sheet_is_shinto = "神道" in context
        sheet_rows = 0
        shinto_rows = 0
        for row_index in range(header_row + 1, sheet.nrows):
            row = sheet.row_values(row_index)
            name = re.sub(r"^宗教法人\s*", "", value_at(row, header["name"])).strip()
            address = value_at(row, header["address"])
            if not name or not address:
                continue
            sheet_rows += 1

            system = value_at(row, header["system"])
            row_is_shinto = "神道" in normalize(system) if header["system"] is not None else sheet_is_shinto
            if not row_is_shinto:
                continue

            municipality = value_at(row, header["municipality"])
            municipality = municipality_from_address(municipality or address)
            if not municipality:
                continue

            umbrella = value_at(row, header["umbrella"])
            shinto_rows += 1
            records.append({
                "name": name,
                "municipality": municipality,
                "address": address,
                "system": "神道系",
                "umbrella": umbrella or None,
                "source_url": source_url,
                "source_title": "埼玉県知事所轄宗教法人一覧（令和7年12月31日現在）",
                "sheet": sheet.name,
            })

        diagnostics.append({
            "sheet": sheet.name,
            "status": "parsed",
            "header_row": header_row + 1,
            "header": header,
            "sheet_rows": sheet_rows,
            "shinto_rows": shinto_rows,
            "context": title_context[:12],
        })

    book.release_resources()
    return records, diagnostics


def main():
    args = parse_args()
    payload, content_type = fetch_bytes(args.xls_url)
    records, diagnostics = workbook_records(payload, args.xls_url)

    seen = set()
    deduped = []
    for row in records:
        key = (normalize(row["name"]), normalize(row["municipality"]), normalize(row["address"]))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(row)
    deduped.sort(key=lambda row: (
        normalize(row["municipality"]),
        normalize(row["name"]),
        normalize(row["address"]),
    ))

    # The prefecture's page reports 2,059 Shinto-system corporations as of 2025-12-31.
    # Fail closed if the workbook layout changes enough that we no longer recover most of them.
    minimum_expected = 1800
    if len(deduped) < minimum_expected:
        raise RuntimeError(
            "Saitama parser produced too few Shinto-system records: "
            f"{len(deduped)} < {minimum_expected}; official_count={OFFICIAL_SHINTO_COUNT}; "
            f"content_type={content_type}; diagnostics={json.dumps(diagnostics, ensure_ascii=False)[:16000]}"
        )

    output = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": "saitama-prefecture-religious-corporation-roster",
        "jurisdiction": "JP-11",
        "prefecture": "埼玉県",
        "publisher": "埼玉県",
        "source_page": args.source_page,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "source_count": 1,
        "failed_source_count": 0,
        "official_shinto_count": OFFICIAL_SHINTO_COUNT,
        "record_count": len(deduped),
        "resolved_xls_url": args.xls_url,
        "records": deduped,
    }
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(json.dumps({
        "authority": output["authority_id"],
        "xls_url": args.xls_url,
        "official_shinto_count": OFFICIAL_SHINTO_COUNT,
        "records": output["record_count"],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
