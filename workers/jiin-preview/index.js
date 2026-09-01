const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>寺院のゆくえ — Development preview</title>
<meta name="description" content="寺院の継続、移転、再建、合併・解散、宗派・管理関係、墓地・納骨堂との関係を根拠と履歴とともに記録する開発中サイトです。" />
<style>
:root{--bg:#f5f2ed;--panel:#fbf9f5;--text:#1d1a18;--soft:#625b55;--muted:#847a73;--accent:#684B78;--rule:#d6cec6;--ruleStrong:#a59b93;--max:1180px}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:ui-serif,"Yu Mincho","Hiragino Mincho ProN",serif;line-height:1.65}a{color:inherit;text-decoration:none}.wrap{width:min(calc(100% - 40px),var(--max));margin:auto}.site-head{border-bottom:1px solid var(--rule);background:rgba(245,242,237,.96)}.site-head .wrap{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:baseline;gap:12px;font-weight:600;letter-spacing:.09em}.brand small{font-family:ui-sans-serif,system-ui,sans-serif;color:var(--muted);font-size:11px;letter-spacing:.14em}.nav{display:flex;gap:24px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px;color:var(--soft)}.hero{padding:92px 0 76px;border-bottom:1px solid var(--rule)}.kicker{font-family:ui-sans-serif,system-ui,sans-serif;color:var(--accent);font-size:12px;letter-spacing:.16em;margin:0 0 18px}.hero h1{font-size:clamp(44px,7vw,88px);line-height:1.08;font-weight:500;letter-spacing:.05em;margin:0;max-width:11em}.lead{font-size:clamp(17px,2vw,22px);color:var(--soft);max-width:760px;margin:30px 0 0}.boundary{max-width:760px;margin:28px 0 0;border-left:3px solid var(--accent);padding:4px 0 4px 18px;color:var(--muted);font-family:ui-sans-serif,system-ui,sans-serif;font-size:13px}.section{padding:70px 0}.section-title{font-size:34px;margin:0 0 34px;font-weight:500}.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:38px 44px}.card{border-top:2px solid var(--ruleStrong);padding-top:20px}.card h2{font-size:23px;margin:0 0 10px;font-weight:500}.card p,.copy{color:var(--soft);margin:0;font-family:ui-sans-serif,system-ui,sans-serif}.publication{border-top:1px solid var(--rule)}.foot{border-top:1px solid var(--rule);padding:28px 0 46px;color:var(--muted);font:12px ui-sans-serif,system-ui,sans-serif}.badge{display:inline-block;border:1px solid var(--accent);color:var(--accent);padding:4px 8px;margin-left:10px;font-size:10px;letter-spacing:.1em;vertical-align:middle}@media(max-width:760px){.site-head .wrap{align-items:flex-start;flex-direction:column;padding:20px 0}.nav{gap:14px;flex-wrap:wrap}.hero{padding:64px 0 56px}.cards{grid-template-columns:1fr}.section{padding:52px 0}}
</style>
</head>
<body>
<header class="site-head"><div class="wrap"><div class="brand">寺院のゆくえ <small>JIIN YUKUE</small><span class="badge">PREVIEW</span></div><nav class="nav"><a href="#temples">寺院</a><a href="#regions">地域</a><a href="#changes">変化</a><a href="#about">このサイトについて</a></nav></div></header>
<main>
<section class="hero"><div class="wrap"><p class="kicker">寺院の継続と変化の記録</p><h1>寺院の、<br>現在と変化を記録する。</h1><p class="lead">寺院のIdentity、現在状態、移転、再建、合併・解散、宗派・本末・管理関係、関連する祭・神社・墓地・納骨堂を、Evidenceと履歴を分けて記録します。</p><p class="boundary"><strong>Development preview.</strong> このURLは見た目と情報設計確認用の非canonical previewです。検索登録・独自ドメイン公開は行っていません。</p></div></section>
<section class="section" id="temples"><div class="wrap"><p class="kicker">FIRST IMPLEMENTATION LANE</p><h2 class="section-title">最初に作るもの</h2><div class="cards"><article class="card"><h2>寺院Identity</h2><p>名称、所在地、別称、宗派・本末関係などを、寺院自身または公的・権威ある資料で確認します。</p></article><article class="card"><h2>Current State</h2><p>施設としての継続状態と宗教法人状態を分け、推測で補完しません。</p></article><article class="card"><h2>Change History</h2><p>移転、再建、災害、合併・解散、所属変更などを、日付とEvidence付きのEventとして記録します。</p></article><article class="card"><h2>Relations</h2><p>祭、神社、寺院、墓地、納骨堂、文化財、管理組織との関係を別Entityとして接続します。</p></article></div></div></section>
<section class="section publication" id="about"><div class="wrap"><p class="kicker">PUBLICATION BOUNDARY</p><h2 class="section-title">公開前の境界</h2><p class="copy">Matsuri/Jinja由来のRelationや第三者ディレクトリは調査seedにだけ使用し、寺院のcanonical recordへ自動昇格させません。Tier Aでも寺院専用のIdentity確認とauthoritative Sourceを必須とします。</p></div></section>
</main>
<footer class="foot"><div class="wrap">寺院のゆくえ — noncanonical visual review preview / noindex,nofollow</div></footer>
</body></html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
    }
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" } });
  }
};
