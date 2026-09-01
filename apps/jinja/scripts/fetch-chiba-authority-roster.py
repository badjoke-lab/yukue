#!/usr/bin/env python3
import argparse
import json
import re
import unicodedata
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

INDEX_URL = "https://www.pref.chiba.lg.jp/gakuji/shuukyou/houjin/houjinmeibo.html"
BASE_PATH = "/gakuji/shuukyou/houjin/"
USER_AGENT = "badjoke-lab-yukue/1.0 (+https://github.com/badjoke-lab/yukue)"


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--index-url", default=INDEX_URL)
    parser.add_argument("--out", required=True)
    parser.add_argument("--workers", type=int, default=8)
    return parser.parse_args()


def normalize(value):
    value = unicodedata.normalize("NFKC", str(value or "")).strip()
    return re.sub(r"\s+", "", value)


def fetch_text(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*;q=0.8"})
    with urllib.request.urlopen(request, timeout=60) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


class LinkParser(HTMLParser):
    def __init__(self, base_url):
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.urls = set()

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "a":
            return
        href = dict(attrs).get("href")
        if not href:
            return
        url = urljoin(self.base_url, href)
        parsed = urlparse(url)
        if parsed.netloc != "www.pref.chiba.lg.jp":
            return
        if not parsed.path.startswith(BASE_PATH) or not parsed.path.endswith(".html"):
            return
        slug = parsed.path.rsplit("/", 1)[-1]
        if slug in {"houjinmeibo.html", "index.html"}:
            return
        self.urls.add(url)


class RosterTableParser(HTMLParser):
    REQUIRED = ["系統", "法人名", "市町村名", "所在地"]
    OPTIONAL = ["包括団体名", "地区コード", "連番"]

    def __init__(self, source_url):
        super().__init__(convert_charrefs=True)
        self.source_url = source_url
        self.in_row = False
        self.in_cell = False
        self.cell_parts = []
        self.row = []
        self.header = None
        self.records = []
        self.title = ""
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        if tag == "title":
            self.in_title = True
        elif tag == "tr":
            self.in_row = True
            self.row = []
        elif self.in_row and tag in {"th", "td"}:
            self.in_cell = True
            self.cell_parts = []

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        elif self.in_row and tag in {"th", "td"} and self.in_cell:
            self.row.append(" ".join(part.strip() for part in self.cell_parts if part.strip()).strip())
            self.in_cell = False
            self.cell_parts = []
        elif tag == "tr" and self.in_row:
            self._consume_row(self.row)
            self.in_row = False
            self.row = []

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_cell:
            self.cell_parts.append(data)

    def _consume_row(self, row):
        cells = [normalize(value) for value in row]
        if all(key in cells for key in self.REQUIRED):
            keys = self.REQUIRED + [key for key in self.OPTIONAL if key in cells]
            self.header = {key: cells.index(key) for key in keys}
            return
        if not self.header:
            return

        def field(name):
            index = self.header.get(name)
            return row[index].strip() if index is not None and index < len(row) else ""

        system = normalize(field("系統"))
        name = field("法人名")
        municipality = field("市町村名")
        address = field("所在地")
        if system != "神道系" or not name or not municipality or not address:
            return
        self.records.append({
            "name": name,
            "municipality": municipality,
            "address": address,
            "system": field("系統") or "神道系",
            "umbrella": field("包括団体名") or None,
            "district_code": field("地区コード") or None,
            "serial": field("連番") or None,
            "source_url": self.source_url,
            "source_title": self.title.strip() or f"{municipality}｜宗教法人一覧／千葉県",
        })


def parse_roster_page(url):
    parser = RosterTableParser(url)
    parser.feed(fetch_text(url))
    return parser.records


def main():
    args = parse_args()
    if args.workers < 1 or args.workers > 16:
        raise SystemExit("--workers must be between 1 and 16")

    index_html = fetch_text(args.index_url)
    link_parser = LinkParser(args.index_url)
    link_parser.feed(index_html)
    urls = sorted(link_parser.urls)
    if not urls:
        raise RuntimeError("No Chiba municipality roster links found")

    records = []
    failures = []
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(parse_roster_page, url): url for url in urls}
        for future in as_completed(futures):
            url = futures[future]
            try:
                records.extend(future.result())
            except Exception as exc:  # noqa: BLE001
                failures.append({"url": url, "error": str(exc)})

    seen = set()
    deduped = []
    for row in records:
        key = (normalize(row["name"]), normalize(row["municipality"]), normalize(row["address"]))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(row)
    deduped.sort(key=lambda row: (normalize(row["municipality"]), normalize(row["name"]), normalize(row["address"])))

    if not deduped:
        raise RuntimeError(f"No Shinto-system authority records parsed from {len(urls)} pages")
    if len(failures) > max(3, len(urls) // 10):
        raise RuntimeError(f"Too many municipality roster fetch failures: {len(failures)} / {len(urls)}")

    output = {
        "format_version": 1,
        "site_id": "jinja",
        "authority_id": "chiba-prefecture-religious-corporation-roster",
        "jurisdiction": "JP-12",
        "prefecture": "千葉県",
        "publisher": "千葉県",
        "source_page": args.index_url,
        "source_type": "public_authority_roster",
        "retrieved_at": datetime.now(timezone.utc).isoformat(),
        "page_count": len(urls),
        "failed_page_count": len(failures),
        "failures": failures,
        "record_count": len(deduped),
        "records": deduped,
    }
    with open(args.out, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    print(json.dumps({
        "authority": output["authority_id"],
        "pages": output["page_count"],
        "failed_pages": output["failed_page_count"],
        "records": output["record_count"],
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
