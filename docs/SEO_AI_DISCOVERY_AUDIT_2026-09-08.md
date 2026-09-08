# Weekly SEO and AI Discovery Check — 2026-09-08

- Site: https://mannabread.com/; America/Chicago.
- Overall status: **Yellow — healthy technical/search foundation, one new expired-content issue.** No confirmed P0/P1 blocker.
- Compared with: August 31 technical audit and releases through `781fc04` (September 5).
- Reporting comparison: August 30–September 5 versus August 23–29, 2026; equal seven-day Sunday–Saturday windows. September 7 Labor Day is outside these windows. GA4 and Search Console retain their own reporting calendars.
- Work completed: live crawl, repository/build verification, authenticated Search Console/GA4 review, browser homepage check, workflow update, and evidence record. No application source, presentation, analytics settings, crawler policy, or production changes.

## Outcome and weekly movement

All eight current public pages return 200, have unique titles/descriptions and correct canonicals, and appear in Search Console's sitemap-filtered indexed URL list. Current business hours are consistent across visible content, Bakery JSON-LD and `llms.txt`. The August 31 canonical/OG/Sunday-closure work and careers discovery entry are now present live.

| Metric | Aug 30–Sep 5 | Aug 23–29 | Movement |
|---|---:|---:|---|
| Google Search clicks | 92 | 65 | +41.5% |
| Search impressions, rounded UI totals | 2.33K | 2.52K | Approximately −7.5% |
| Search CTR, rounded | 4.0% | 2.6% | +1.4 percentage points |
| Average search position | 7.2 | 8.2 | Improved by 1.0; lower is better |
| GA4 sessions | 828 | 845 | −2.0% |
| Organic Search sessions | 431 | 418 | +3.1% |
| Organic Search engagement rate | 64.04% | 55.98% | +8.06 percentage points |
| AI Assistant sessions | 4 | 4 | Unchanged; very small sample |
| AI Assistant key events | 0 | 0 | No recorded key events |
| All-channel key events | 18 | 8 | Includes mixed actions and employment; not sales |
| Customer inquiry events, excluding employment | **7** | **2** | +5 |
| General inquiries | 4 | 0 | +4 |
| Rental inquiries | 2 | 2 | Unchanged |
| Catering inquiries | 1 | 0 | +1 |
| Employment applications | 1 | 3 | Reported separately |

Customer inquiry counts are all-channel events, not verified bookings, revenue, unique customers or qualified leads. They reconcile to `generate_lead`: current 4 + 2 + 1 + 1 employment = 8; prior 0 + 2 + 0 + 3 employment = 5. No attribution of these movements to a specific release is supported. No internal-traffic or geographic exclusions were applied. GA4 traffic acquisition reports 100% of available data; the event headline says mostly complete, while lead-type cards say 100%.

Sources: [Search Console comparison](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fmannabread.com%2F&start_date=20260830&end_date=20260905&compare_start_date=20260823&compare_end_date=20260829), [GA4 traffic acquisition](https://analytics.google.com/analytics/web/#/a386683689p547450817/reports/explorer?params=_r.explorerCard..selmet%3D%5B%22sessions%22%5D%26_r.explorerCard..seldim%3D%5B%22sessionPrimaryChannelGroup%22%5D%26_u.comparisonOption%3DlastPeriodMdw%26_u.date00%3D20260830%26_u.date01%3D20260905&r=lifecycle-traffic-acquisition-v2), [lead detail](https://analytics.google.com/analytics/web/#/a386683689p547450817/reports/dashboard?params=_u.comparisonOption%3DlastPeriodMdw%26_u.date00%3D20260830%26_u.date01%3D20260905%26_u..nav%3Dmaui%26_r..dimension-value%3D%7B%22dimension%22:%22eventName%22,%22value%22:%22generate_lead%22%7D&r=events-overview&collectionId=business-objectives).

Search page rows show home 59 versus 50 clicks, menu 24 versus 16, contact 4 versus 0, story 2 versus 0, rentals 2 versus 1, catering 1 versus 0, careers 1 versus 0 and gift cards 0 versus 0. Page-row counts must not be summed as the property-level total; the displayed aggregations differ. Brand queries dominate the leading query rows; this is not evidence of a broad non-brand ranking gain.

## New and remaining findings

| Priority | Finding and evidence | Action |
|---|---|---|
| P2 — new | Expired Labor Day announcement remains in initial homepage HTML on September 8. `app/page.tsx` sets expiry to September 8 at 00:01 Central, but `components/ui/TimedVisibility.tsx` initializes visibility to true and checks time only in an effect. Live browser hydration removes it; raw fetch, the web text reader, and a fresh production build retain it. | Recommend removing the completed Labor Day invocation/import/constant from `app/page.tsx`, retaining the reusable banner. Requires separate presentation approval under the workflow. A rebuild alone does not solve it. No demonstrated ranking loss. |
| P2 — carried forward, reverified | `/rentals` initially exposes zero capacity values; source targets remain 55/25/120/40. The policy still overlaps “up to 20” and “20+” attendees. | Correcting counters changes presentation/animation; exact attendee boundary needs client confirmation. Keep these as explicit follow-ups rather than adding hidden text or unsupported schema. |
| P2 — content backlog | Caption/transcript, testimonial provenance and privacy-disclosure opportunities remain recorded in the August 31 audit. | Owner-reviewed content work; not reclassified as new regressions or legal findings. |
| P3 — measurement interpretation | All-known-URL indexing reports 97 exclusions, but the current sitemap's indexed list contains all eight public pages. | Monitor current sitemap URLs separately from legacy URL inventory; do not treat 97 as broken current pages or mass-redirect unknown URLs. |

**Concrete presentation follow-up:** remove only the expired Labor Day placement, unused import and date constant in `app/page.tsx`. Expected effect: no stale closure notice in initial HTML or a pre-hydration flash; the already-hydrated current homepage remains visually the same. Keep the reusable components untouched. Risk: an intentional initial-render change. Validate a build, raw HTML absence, normal/reduced-motion browser rendering and existing homepage navigation, then verify production after separately authorized publication. Future announcements should have an explicit server-output expiry strategy; any rendering/cache design should be reviewed separately.

This follow-up was not implemented because the [SEO skill](/Users/dillanmilosevich/.codex/skills/seo-ai-optimization-audit/SKILL.md) says: “If the audit recommends anything that would change UI/UX, visible content, design, loading behavior, animation, motion, layout, or interaction behavior, report the recommendation to Dillan first and make no such change.” Removing the banner invocation changes initial rendered content. The existing project workflow reinforces that boundary.

## Checks passed and evidence limits

| Category | Result |
|---|---|
| Availability and indexability | Eight public routes 200; one H1 and main each, one canonical each, no observed noindex in page metadata or response headers. Missing test route returns true 404. |
| Redirects | HTTP apex, HTTPS www, `/menu/`, and `/catering-2` return 308 to expected destinations. No routing changes. |
| Discovery | robots.txt, sitemap.xml and llms.txt return 200 with intended types. Eight sitemap routes; robots allows `/` and excludes `/api/`. Careers and 7 AM–4 PM Monday–Saturday/Sunday closure are present in discovery text. |
| Metadata/social | Eight unique titles/descriptions; `lang=en`; `og:type=website`; canonical share image returns 200. |
| Schema and content | All JSON-LD parses. Bakery hours match approved public hours on all eight pages; 62 Menu item names appear in non-script menu text. No new FAQ, review, job, offer or invented AI markup. |
| Architecture | All eight linked internal page destinations are in the successful crawl. No newly added public routes. |
| Crawler samples | Googlebot, OAI-SearchBot, GPTBot and PerplexityBot user-agent samples receive 200. These are audit requests, not authentic provider crawler/IP evidence. No WAF or training-policy change. |
| Indexing | Search Console report updated September 3 lists all eight current pages as indexed. The overview displays 0 not indexed; a residual N/A “discovered” reason row shows 1, so the explicit indexed URL list was checked rather than interpreting that row as a current missing page. |
| Field performance | Core Web Vitals updated September 6: **8 good, 0 needs improvement, 0 poor** URLs on both mobile and desktop. These are Search Console/CrUX classifications, not individual LCP/INP/CLS values or a new lab test. |
| Google security/manual actions | Both authenticated reports show “No issues detected” on September 8. |
| Browser | Live homepage hydrates, displays expected navigation and updated hours, and removes expired banner text. No form or purchase submitted. No comprehensive accessibility or mobile visual audit claimed. |
| Build/source | `npm run build`, `npm run lint`, standalone `tsc --noEmit --incremental false` pass. Fresh build also reproduces stale announcement HTML. |

[Index coverage](https://search.google.com/search-console/index/drilldown?resource_id=https%3A%2F%2Fmannabread.com%2F&pages=SITEMAP&sitemap=https%3A%2F%2Fmannabread.com%2Fsitemap.xml), [field Core Web Vitals](https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fmannabread.com%2F).

The indexed list's last-crawled dates range from August 15 to September 1. Index inclusion does not prove Google has ingested the September 3 hours change. No recrawl submission was made. All-known-URL exclusions are 47 not found, 27 redirects, 4 noindex, 18 crawled-not-indexed and 1 alternate canonical; no prior comparable coverage snapshot was available to assert a weekly spike.

Bing reports, authentic crawler/WAF logs, external business-profile hours, domain-wide verification, detailed AI citation counts and production event delivery beyond the reporting evidence were not verified. AI Assistant is the existing GA4 channel label; raw source/medium attribution was not independently re-audited. No forecast or causal SEO-performance claim is made.

## Workflow improvements and files

Updated `docs/seo-and-ai-optimization-workflow.md` with compact weekly comparisons, authenticated browser reporting fallback, sitemap-only indexing checks, customer-versus-employment distinctions, expired-announcement HTML checks and field-performance evidence. This is durable operational guidance; healthy metadata was not rewritten merely to create activity.

Files changed are this report, that workflow and `docs/seo-evidence-2026-09-08.json`. Every change is internal documentation/evidence, strictly under the hood. Existing untracked duplicate source files and client reports were preserved. No commit, push, deployment, webmaster submission, account change or scheduled automation was performed.

Evidence: [bounded live response record](seo-evidence-2026-09-08.json). Raw response bodies/headers, the reproducible crawl script and build log are in `/tmp/manna-seo-2026-09-08/`; temporary files are not durable deliverables. The 21-request live sample includes eight pages, three discovery files, a true missing URL, four redirect samples, one share image and four bot user-agent samples.

## Next weekly check

Use September 6–12 versus August 30–September 5 once data is complete; annotate Labor Day closure as a comparison caveat. Repeat the eight-route/discovery/status matrix, sitemap-filtered indexing, Core Web Vitals, customer inquiries and AI referral counts. Escalate unexpected noindex, failed public pages, canonical drift, missing current sitemap pages or materially false schema immediately. Dillan owns the expired-announcement approval and any release; Christin owns attendee-policy clarification and verified content facts.

Current official guidance checked September 8: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) describes ordinary SEO/indexing/snippet eligibility rather than special AI markup; [OpenAI publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) separates search discovery from training permission. Existing robots policy and the optional `llms.txt` convention were preserved.

## September 8 follow-up authorization

After reviewing the audit, Dillan authorized committing and pushing the three audit/workflow/evidence documents to `main`, with an explicit requirement to preserve all UI and animations. Earlier no-commit/no-push statements describe the audit-time state. The approved commit contains documentation only; no application code or banner removal is included. The prior production build, lint and standalone TypeScript checks passed; the final diff confirms no application changes, so those checks were not repeated for documentation-only publication.
