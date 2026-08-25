# SEO and AI Discovery Audit — Manna Bakery

## Audit details

- Site/project: Manna Bakery
- Production URL: https://mannabread.com
- Audit date and timezone: 2026-08-25, America/Chicago
- Audit mode: Full audit with evidence-supported low-risk local implementation
- Auditor/agent: Codex
- Evidence inspected: current repository and route inventory; working-tree diff; project SEO workflow and growth profile; 2026-08-11 and 2026-08-18 audit artifacts; live production content fetched through the available web reader; current Google, OpenAI, Perplexity, Bing, and Schema.org guidance; lint and TypeScript results
- Access limitations: shell DNS could not resolve the production host; the browser extension declined access to the production domain; the web reader could not return raw `robots.txt`, `sitemap.xml`, `llms.txt`, `/careers`, or a test 404; no current Search Console, Bing Webmaster Tools, GA4 reporting, CDN/WAF logs, Google Business Profile, field Core Web Vitals, or schema-validator session was available. Local server binding and loopback requests were inconsistent and ultimately blocked by the sandbox. A normal Turbopack build could not fetch Google Fonts, so the successful full build used Webpack with a temporary build-only local font response; application source and final tracked files were not changed by that substitution.
- Guidance last verified: 2026-08-25

## Executive summary

**Overall verdict: Strong repository foundation; production controls require a network-enabled verification pass before release actions.** No repository-level P0 or confirmed P1 defect was found. The current tree provides eight priority routes, server/pre-render compatible metadata, self-canonical paths, one site-wide Bakery/WebSite entity graph, menu-specific structured data, crawlable navigation, conversion links, analytics event wiring, `robots.txt`, a sitemap, and a concise optional `llms.txt`. Live production content was retrievable for the homepage, menu, story, catering, rentals, and contact surfaces, but current raw headers and discovery files were not testable with this run's access. The highest-risk unresolved observation is an ambiguous production fetch for `/gift-cards`, which surfaced Toast gift-card content rather than the local Manna landing page and therefore needs a direct header/browser check before any claim about its live redirect behavior. No unsupported local content, schema, crawler-policy, or performance change was made.

## Scorecard

| Category | Score | Confidence | Summary |
|---|---:|---|---|
| Crawlability and indexability | 4/5 | Medium | Repository controls are coherent; current production robots, sitemap, redirects, and 404 headers were not directly testable. |
| Rendering and initial HTML | 4.5/5 | High | Built output contains primary text, links, metadata, H1/main landmarks, and JSON-LD; live interactive browser rendering was denied. |
| Metadata and canonicalization | 5/5 | High | All eight built pages have unique titles, descriptions, and one self-canonical using the preferred host. |
| Site architecture and semantics | 4.5/5 | High | Eight flat priority routes, crawlable navigation/footer links, main landmarks, H1s, and labeled forms are present in source. |
| Structured data and entity clarity | 4/5 | Medium | Bakery/WebSite and Menu JSON-LD are centralized and fact-aligned; remote validation and current live extraction were unavailable. |
| Content quality and answer readiness | 4/5 | Medium | Strong first-party story, local details, menu, catering, rental, and conversion content; some trust/media gaps remain. |
| Trust, authorship, and evidence | 3/5 | Medium | Named founder and public contact details are strong; privacy disclosure and testimonial provenance remain unresolved. |
| AI crawler and discovery readiness | 3.5/5 | Medium | Search crawlers are allowed in source and `llms.txt` is accurate; live controls and model-training policy remain unverified/undecided. |
| Performance, media, and accessibility | 3/5 | Medium | Source preserves responsive and accessible patterns, but prior hero-video LCP risk remains and no current lab/field run was possible. |
| Measurement and monitoring | 4/5 | Medium | GA4 and Search Console setup is documented and analytics wiring remains present; current reports were not accessed. |

## Priority findings

| ID | Priority | Surface | Finding | Evidence | Impact | Recommendation | Validation |
|---|---|---|---|---|---|---|---|
| SEO-2026-08-25-01 | P1 | Production `/gift-cards` | The available live reader surfaced Toast's gift-card purchase content instead of the local Manna landing-page content. This is an ambiguous observation, not proof of a redirect, because raw status and `Location` headers were unavailable. | Web reader opened `https://mannabread.com/gift-cards` on 2026-08-25 and returned a Toast-style purchase flow. The current repository defines a local 200 page with a Toast CTA and has no `/gift-cards` redirect in `next.config.ts`. | An unintended redirect would remove Manna's canonical metadata and local context from this conversion route; a reader artifact would have no production impact. | Before deployment or URL submission, run a direct `curl -sSIL` and a normal browser check. If production redirects unexpectedly, inspect Vercel/domain redirect configuration. Do not alter the local page without confirming the live behavior. | Confirm final status, redirect chain, final URL, title, canonical, and visible CTA in a network-enabled environment. |
| SEO-2026-08-25-02 | P2 | Production validation | Current raw robots, sitemap, `llms.txt`, canonical-host redirects, `/careers`, response headers, and a representative 404 could not be independently reverified in this environment. | Shell DNS failed; the web reader returned internal errors for non-HTML discovery files and `/careers`; browser access was declined. The 2026-08-18 review is the latest direct passing baseline. | A production-only CDN, WAF, redirect, or deployment regression could remain undetected. | Repeat the exact production smoke matrix from the weekly monitoring plan before approving a release or Search Console action. | Record HTTP status/content type/body for every discovery surface and final redirect destinations for HTTP/`www`. |
| SEO-2026-08-25-03 | P2 | Homepage media | The autoplay hero video remains the leading known mobile performance risk. | `components/sections/Hero.tsx` uses `preload="auto"`; the 2026-08-11 mobile Lighthouse diagnostic reported 6.3 s LCP and identified the hero MP4 as the dominant transfer. No current field or repeatable lab data was available. | If field data agrees, slower mobile visual completion can reduce user satisfaction and conversion opportunity. | Test a smaller mobile encode, responsive poster-first delivery, or delayed source loading as a separate design-approved performance task. | Compare repeat mobile lab runs, then use Search Console/CrUX field LCP by template after an approved release. |
| SEO-2026-08-25-04 | P2 | Founder video | No caption track or declared transcript accompanies the story video. | `components/sections/Story.tsx` uses the founder video with metadata preload and no `<track>`; no approved WebVTT/transcript asset was found. | Spoken content is less accessible and less directly available to retrieval systems. | Obtain an approved caption file and accurate transcript; do not infer a transcript from surrounding marketing copy. | Test captions, keyboard controls, and transcript availability in initial HTML. |
| SEO-2026-08-25-05 | P2 | Privacy and data collection | No public privacy notice was observed despite GA4, inquiry forms, employment details, and reCAPTCHA integrations. | No privacy route/link exists in the current route and footer inventory. | This is a visitor-trust and governance gap and may require legal review. | Have the client/legal owner approve an accurate notice covering analytics, inquiry/employment data, retention, and spam protection, then link it from forms and the footer. | Confirm visible notice text matches production configuration and is linked from every collection surface. |
| SEO-2026-08-25-06 | P2 | Testimonials | Displayed testimonials lack visible source/date provenance. | `components/sections/Testimonials.tsx` contains named quotes and ratings without source links or review dates. No review schema is emitted, which should be preserved until eligibility and provenance are verified. | Visitors and retrieval systems have less context for evaluating customer evidence. | Confirm permission and source records, then add concise attribution only where approved. | Verify every quote against its approved source; validate any future schema against visible content and current Google eligibility rules. |
| SEO-2026-08-25-07 | P2 | AI crawler policy | Search/citation access and model-training access are not separated by an approved business policy. | `app/robots.ts` allows `*` except `/api/`, which permits `OAI-SearchBot`, `PerplexityBot`, and `GPTBot` unless blocked elsewhere. CDN/WAF behavior was unavailable. | Search discovery is intended, but potential model-training permission remains an undocumented choice. | Obtain a dated owner decision. If training opt-out is desired, disallow `GPTBot` specifically while keeping intended search/retrieval crawlers accessible; separately verify hosting/WAF behavior. | Fetch production robots after an approved change and review verified bot traffic in hosting/WAF logs. |

## What is already working

- The route inventory matches the durable priority list: `/`, `/menu`, `/our-story`, `/catering`, `/gift-cards`, `/rentals`, `/contact`, and `/careers`.
- `createPageMetadata` centralizes unique titles, descriptions, self-canonical paths, Open Graph metadata, and Twitter cards.
- `getSiteUrl` centralizes the canonical host and `next.config.ts` defines a permanent `www` host redirect plus intentional legacy/order redirects.
- `app/robots.ts` allows public content and excludes `/api/`; `app/sitemap.ts` includes all eight priority routes and does not fabricate an audit-date `lastmod` across the site.
- Site-wide Bakery/WebSite JSON-LD uses stable IDs; Menu JSON-LD is derived from the same `menuData` rendered visibly.
- Navigation and footer links expose all priority pages with real anchors.
- Catering, rentals, contact, careers, directions, gift cards, and optional ordering paths provide clear next steps. GA4 event code still covers lead, contact, directions, gift-card, ordering, video, and AI-referral interactions.
- Live production text was retrievable for the homepage, menu, story, catering, rentals, and contact pages. The menu, story, catering, and rental surfaces expose substantial answer-ready visible text rather than an empty client shell.
- The modified `public/llms.txt` adds only the existing `/careers` route, uses canonical URLs, matches current verified business constants and feature state, and correctly remains an optional retrieval aid rather than an access control.

## Technical SEO

The current source has no broad `noindex`, disallow, canonical-to-home, parameter/facet, pagination, locale, or app-shell pattern. Priority pages define one intended H1 in source and use semantic main content. Missing routes are handled by Next.js rather than a custom soft-404 page. The sitemap's only explicit `lastModified` is the menu's real recorded update date, which avoids manufactured freshness.

Production evidence is intentionally narrower than the prior audit: content retrieval confirms multiple priority pages are publicly readable, but raw status codes, response headers, redirects, discovery-file content types, and the unknown-route status were not observable on 2026-08-25. The production baseline from 2026-08-18 should therefore be treated as the last complete direct transport verification, not silently carried forward as today's result.

## Content, AEO, GEO, and AI discovery

Manna's visible content provides a clear entity, address, local context, founder, story, menu, service options, practical rental/catering details, and conversion paths. It is materially stronger than thin query-variant pages. Current Google guidance continues to treat generative visibility as an extension of foundational SEO and people-first content; it does not require special AI schema or `llms.txt`. OpenAI continues to separate `OAI-SearchBot` search discovery from `GPTBot` potential training controls, while Perplexity documents `PerplexityBot` for search discovery and separately documents its user-triggered agent.

`public/llms.txt` is accurate in the current tree and was preserved. Its `/careers` addition is supported by the route, navigation, sitemap, metadata, and visible careers content. The file does not guarantee ingestion, indexing, ranking, or citation.

## Structured data

- Site-wide: `Bakery` and `WebSite` in one JSON-LD graph with stable `@id` links.
- Menu: `Menu`, `MenuSection`, and `MenuItem`, derived from visible `menuData`.
- Fact sources: brand, contact, hours, social profiles, menu link, and founder name are centralized in approved repository context.
- Appropriate restraint: no Review, AggregateRating, fabricated FAQ, product availability, or outcome schema was added.
- Current build validation: every JSON-LD block in all eight generated HTML files parsed successfully; menu output contained the site graph plus menu graph. Remote Schema.org and Google rich-result validation were not available.

## Performance, media, and accessibility

No current field or reproducible lab metrics were available, so no new performance score is claimed. Source review confirms responsive breakpoints, `next/image` usage with sizes, labeled navigation controls, labeled form fields, meaningful image alternatives, and reduced-motion/performance hooks. The prior hero-video LCP finding remains open. Founder-video captions/transcript remain the clearest accessibility and retrieval content gap.

The browser-control skill affected this audit by attempting a real 390 × 844 production verification; access to the production domain was declined before navigation, so no screenshot or browser-derived mobile claim is included.

## Measurement

- Documented and preserved: GA4 property `G-TM9DZFLC2P`, key conversion events, a verified `https://mannabread.com/` Search Console URL-prefix property, and GA4/Search Console linking.
- Source-confirmed: analytics code remains present and categorizes known AI referrals while preserving normal referral behavior.
- Not tested: current users, events, conversions, queries, impressions, indexed pages, AI referral totals, Generative AI report data, Bing coverage, manual actions, security issues, rich-result errors, and field Core Web Vitals.

## Changes implemented

| Change | Files/surfaces | Reason | Verification |
|---|---|---|---|
| Preserved the existing careers addition in the optional discovery brief. | `public/llms.txt` | `/careers` is a real priority route with metadata, sitemap inclusion, navigation links, visible content, and an employment form. | Diff and route/source inventory reviewed; no unsupported fact was added. |
| Added this dated audit artifact. | `docs/SEO_AI_DISCOVERY_AUDIT_2026-08-25.md` | Provide reproducible evidence, priorities, limitations, and handoff. | Markdown/source review. |
| Appended a concise durable update. | `docs/seo-and-ai-optimization-workflow.md` | Preserve verified crawler/discovery context and the correct `llms.txt` inventory. | Markdown/source review. |

No page copy, metadata, structured data, robots policy, routes, forms, analytics, styles, or conversion behavior was changed. No commit, push, deploy, publish, URL submission, account mutation, DNS/CDN/WAF change, or crawler-policy change was performed.

## Validation results

- `npm run lint`: passed with no warnings or errors.
- `npx tsc --noEmit`: passed.
- `npm run build`: the normal Turbopack attempt reached compilation and failed only because `next/font` could not reach Google Fonts for Playfair Display, Lora, and Libre Franklin in the restricted sandbox.
- Full offline production build: `npm run build -- --webpack` passed after supplying a temporary build-only response backed by Next.js's existing local font asset. It compiled, ran TypeScript, generated all 16 static outputs, and emitted all eight priority pages plus `robots.txt` and `sitemap.xml`. The temporary fixture was removed and did not alter tracked application files.
- Generated-output checks: all eight priority HTML files had exactly one title, description, canonical, H1, and main landmark; titles were unique; canonicals used `https://mannabread.com`; every JSON-LD block parsed; primary Manna text and crawlable anchors were present; no unresolved internal route link was found. Generated robots metadata reported 200 `text/plain`; sitemap metadata reported 200 `application/xml`; the built not-found output reported status 404 with `noindex`.
- Local server/browser checks: attempted; loopback was denied across processes and subsequent binds were blocked. Generated production artifacts were inspected directly instead.
- Live web-reader checks: homepage, menu, story, catering, rentals, and contact content were retrievable; raw discovery files, `/careers`, test 404, live mobile browser behavior, and exact headers were not testable.
- Working tree safety: unrelated modified/untracked duplicate and retainer files were not edited, removed, reset, staged, committed, or overwritten.

## Remaining opportunities

1. **Blocking/high-priority technical work:** directly resolve the `/gift-cards` fetch ambiguity and rerun the complete production header/status matrix.
2. **Content and evidence work:** obtain approved founder-video captions/transcript and testimonial source/date/permission records; keep menu, catering, rental, prices, hours, and availability synchronized with client-approved sources.
3. **Authority/entity work:** keep Google Business Profile, Toast, social profiles, and the website's name/address/phone/hours consistent; pursue authentic local references only.
4. **Performance/accessibility work:** test mobile hero-video delivery with repeat lab runs and field data; add approved captions/transcript.
5. **Measurement and operational work:** review current Search Console index coverage, queries, Generative AI performance, Core Web Vitals, and GA4 organic/AI-referral conversions; establish dated baselines rather than inferred outcomes.
6. **Policy decisions:** approve or decline model-training crawler access; obtain a legally reviewed privacy notice; approve testimonial attribution.

## Approval-required production actions

- Approve a network-enabled production verification of statuses, redirects, discovery files, `/careers`, `/gift-cards`, and a true 404.
- Approve deployment only if the preserved `public/llms.txt` careers addition is intended to go live; documentation files do not require publication for site behavior.
- Approve Search Console URL inspection/recrawl or sitemap resubmission only after the production verification passes.
- Obtain Manna/client approval before changing `GPTBot` or any other model-training policy.
- Obtain client/legal approval before publishing a privacy notice or changing form disclosures.
- Obtain approved caption/transcript and testimonial provenance assets before publishing those changes.

## Weekly monitoring plan

- URLs/templates to sample: `/`, `/menu`, `/our-story`, `/catering`, `/gift-cards`, `/rentals`, `/contact`, `/careers`, one unknown URL, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and the social share image.
- Metrics and tools: response status/redirect chain, content type, title, description, canonical, robots, H1, initial text/links, JSON-LD parse, Search Console coverage/queries/Core Web Vitals/Generative AI performance, GA4 qualified conversions and AI referrals, and Bing coverage when connected.
- Expected baselines: priority routes 200; HTTP/`www` converge once to the canonical host; missing route 404/noindex; discovery files 200 with intended content types; one self-canonical and H1 per priority route; primary content and links in initial HTML; JSON-LD parses and matches visible facts.
- Alert thresholds: any priority route non-200, accidental noindex/disallow, canonical-host drift, sitemap removal, blank initial HTML, invalid/false schema, or material conversion/coverage decline requires same-day review. Treat lab performance movement as diagnostic until field data corroborates it.
- Report destination: `docs/` dated audit/delta artifact and the concise durable workflow update log.
- Owner/escalation path: Creative Currents for code and release; Christin/Manna for business facts, testimonials, privacy, captions, and crawler-training policy; Vercel/DNS provider for hosting configuration.

## Sources

Primary guidance rechecked 2026-08-25:

- [Google: optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [OpenAI: Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity: crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Bing: robots.txt guidance](https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec)
- [Schema.org](https://schema.org/)
