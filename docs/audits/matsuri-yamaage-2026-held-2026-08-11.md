# 山あげ祭 2026 Dated Review — 2026-08-11

## Result

**Passed.** The pending 2026 山あげ祭 review is closed with post-event municipality Evidence.

## Implementation

```text
Implementation PR     #252
Implementation merge  bea26482f4cdc45ec5688e9734ebc816e7ae396f
Maintenance bundle    data/public/matsuri/f2/maintenance-95.json
Occurrence             occ-yamaage-matsuri-2026
```

## Reviewed source

那須烏山市の2026年7月29日プレスリリースを一次資料として使用した。

```text
Publisher   那須烏山市
Published   2026-07-29
URL         https://www.city.nasukarasuyama.lg.jp/city-administration/public-relations/press-release/page006847.html
Accessed    2026-08-11 UTC review date
```

市の発表は、令和8年山あげ祭が鍛冶町の当番により2026年7月24日から26日までの3日間開催されたことを報告している。

## Occurrence conclusion

```text
Start      2026-07-24
End        2026-07-26
Outcome    held
Scale      modified
```

`held` は市の事後発表によって裏付ける。

`modified` は、熱中症対策として日中の公演数を減らし、例年16～18公演に対して2026年は13公演だったという同じ市発表に基づく。入込数63,000人は資料上の補足情報であり、来場者数からscaleを推定していない。

## Evidence separation

2本のclaim-specific Evidenceを分離した。

```text
evd-yamaage-occ-2026-held      supports_occurrence_outcome
evd-yamaage-occ-2026-modified  supports_occurrence_scale
```

開催されたという事実と、開催規模・プログラムが通常と異なったという事実を同一assertionにまとめていない。

## Boundaries

- annual Occurrenceの結果からEntity Current Stateを変更していない。
- 1年限りの熱中症対策を恒久的なChange Eventとして推定していない。
- 2026年Occurrenceは、Batch 20時点で事後Evidence取得まで意図的に未公開だったため、既存recordの上書きではなく新規Occurrenceとして追加した。
- 座標、画像、Jinja State、将来サイト実装、Worker、hostname、publication authorizationは追加していない。
- Matsuri stabilizationは`reviewing`のままで、formal review completionやJinja authorizationを発生させていない。

## Validation

PR #252 head `58fb9c24b6c2bc8604e9f41fef70a731aa071a62` で、以下を含む全triggered workflowがsuccessになった後にsquash mergeした。

- complete repository CI
- Source / Evidence audit
- data freshness
- canonical dataset contract
- correction contract
- Relation coverage
- corpus coverage
- Detail C navigation
- full-page screenshot capture and audit
- future-site seed inventory / readiness
- Jinja start-gate

最初のCI失敗は、JSTの2026-08-12を`accessed_at` / `captured_at`へ入れたため、UTC基準のaudit date 2026-08-11から見て未来日になったことが原因だった。Evidence内容やgateを緩めず、日時だけUTCへ修正して全検証を通した。

## Dated-review consequence

`山あげ祭 2026 — review when official post-event Evidence is available` は完了した。今後のdated-review pending inventoryから外す。
