# SEO and AI Discovery Audit — Manna Bakery

## Audit details

- Site/project: Manna Bakery
- Production URL: https://mannabread.com
- Audit date and timezone: 2026-08-11, America/Chicago
- Audit mode: Full audit with low-risk local implementation
- Auditor/agent: Codex
- Evidence inspected: complete repository, production build, local production server, live HTTP responses and initial HTML, live robots.txt/sitemap.xml/llms.txt, local JSON-LD, internal links, GA4 tag presence, and mobile Lighthouse lab output
- Access limitations: no direct Google Search Console, Bing Webmaster Tools, GA4 reporting, CDN/WAF logs, Google Business Profile, field Core Web Vitals, or client/legal approval records; Schema.org's remote validator did not return a usable result, so JSON-LD validation was limited to successful parsing and visible-content review
- Guidance last verified: 2026-08-11

## Executive summary

**Overall verdict: Strong technical foundation, with a material mobile performance opportunity.** No P0 or P1 issue was observed. Production pages are available on the canonical HTTPS host, missing routes return a real 404, and current public pages expose their primary content, metadata, canonicals, links, and JSON-LD in initial HTML. The local release adds a complete `/careers` page and sitemap entry, while the currently deployed site correctly returns 404 for that not-yet-published route and excludes it from the production sitemap. The highest-risk observed issue is homepage media weight: the autoplay hero video dominated a mobile Lighthouse run and produced a 6.3-second lab LCP in a diagnostic run. The best next move is to preserve the approved visual direction while evaluating responsive video delivery separately and only with design approval.

## Scorecard

| Category | Score | Confidence | Summary |
|---|---:|---|---|
| Crawlability and indexability | 5/5 | High | Canonical pages return 200; robots and sitemap return 200; missing URLs return 404/noindex. |
| Rendering and initial HTML | 4.5/5 | High | Primary headings, copy, anchors, metadata, and JSON-LD are present before interaction; extensive client animation remains a resilience/performance consideration. |
| Metadata and canonicalization | 5/5 | High | Unique titles/descriptions, self-canonicals, OG/Twitter data, language, icons, and canonical-host redirects are present. |
| Site architecture and semantics | 4.5/5 | High | Flat, crawlable navigation; one H1 per audited route; sensible headings and landmarks; no broken internal links found. |
| Structured data and entity clarity | 4/5 | Medium | Bakery/WebSite graph and Menu data parse successfully and match visible facts; remote validator and Google rich-result testing were unavailable. |
| Content quality and answer readiness | 4.5/5 | Medium | Strong original founder story, detailed menu/catering/rental content, location facts, and direct next steps. |
| Trust, authorship, and evidence | 3/5 | Medium | Named founder and contact details are strong; review provenance and privacy/legal disclosures require confirmation. |
| AI crawler and discovery readiness | 4/5 | High | Search/retrieval crawlers are crawlable and llms.txt is accurate; model-training policy is not explicitly decided. |
| Performance, media, and accessibility | 3.5/5 | High | Diagnostic Lighthouse: performance 77, accessibility 100, SEO 100; lab LCP was 6.3 s and the hero video dominated bytes. Story-video preload was restored by request. |
| Measurement and monitoring | 4/5 | Medium | GA4 is live, conversion events are implemented, and the growth profile records a linked verified Search Console property; dashboards were not directly accessible. |

## Priority findings

| ID | Priority | Surface | Finding | Evidence | Impact | Recommendation | Validation |
|---|---|---|---|---|---|---|---|
| SEO-001 | P2 | Homepage performance | The autoplay hero video dominates mobile loading and LCP. | Post-fix local mobile Lighthouse: performance 77, LCP 6.3 s, 3,633 KiB total transfer; the hero MP4 accounted for about 2.65 MB during the run. No field data was available. | Slow visual completion can reduce mobile satisfaction and may become a Core Web Vitals issue if field data agrees. | Keep the approved desktop treatment, but test a responsive static poster on mobile, a smaller mobile encode, and/or delayed video source loading after the critical render. | Compare three repeat Lighthouse runs per variant, then confirm mobile LCP in Search Console/CrUX after release. |
| SEO-002 | P2 | Video accessibility and retrieval | The founder-story video has no caption track or linked transcript. | `components/sections/Story.tsx` contains a controlled video but no `<track>`; the repository contains story copy, but not a declared verbatim transcript/captions asset for the video. | Spoken content is less accessible and less directly reusable by search/retrieval systems. | Obtain an approved WebVTT caption file and add captions; publish an accurate transcript or link the video clearly to a matching transcript section. | Keyboard/screen-reader smoke test; confirm captions render and transcript text is present in initial HTML. |
| SEO-003 | P2 | Trust and evidence | Testimonials do not expose their source, review date, or permission/provenance in the UI. | `components/sections/Testimonials.tsx` contains named quotes and ratings, but no source links or dates. No review schema is present, which is appropriate until provenance is verified. | Visitors and retrieval systems have less context for evaluating customer evidence. | Confirm client permission and source URLs, then add concise source/date attribution where approved. Do not add Review/AggregateRating schema unless it accurately represents eligible visible reviews. | Verify every displayed quote against the approved source record and visible attribution. |
| SEO-004 | P2 | AI crawler policy | Search/citation and model-training crawlers are all allowed by the wildcard rule; no separate training decision is recorded. | Live and local robots.txt allow `*` except `/api/`. That permits OAI-SearchBot and PerplexityBot for discovery, but also permits GPTBot unless blocked elsewhere. CDN/WAF behavior was not testable. | Discovery is enabled, but the business has not documented whether potential model training is intended. | Record a dated business decision. If training opt-out is desired, disallow GPTBot specifically while leaving OAI-SearchBot and intended search agents crawlable; verify CDN/WAF behavior separately. | Fetch robots.txt after any approved change and test each intended crawler group against robots rules and hosting logs/WAF. |
| SEO-005 | P2 | Privacy and trust | No public privacy page or data-use notice was observed despite inquiry forms, GA4, and optional reCAPTCHA. | Repository route/content inventory has no privacy page; forms collect contact and event/employment details. | This is a trust and governance gap and may become a legal/compliance concern depending on policy and configuration. | Have the client/legal owner approve a privacy notice covering analytics, inquiry data, retention, and spam protection; then link it from forms/footer. | Confirm the published notice is accurate for production configuration and reachable from all data-collection surfaces. |
| SEO-006 | P3 | Release coordination | `/careers` exists locally but is not deployed. | Local production server returns 200 and the local sitemap includes it; production returns 404 and the production sitemap omits it. | No current indexability defect exists, but the route will not be discoverable until the intended release is deployed. | Deploy only through the normal approved release process, then verify the URL, sitemap entry, canonical, and form behavior. | Production smoke test after approved deployment and Search Console URL inspection. |

## What is already working

- Canonical host behavior is clean: HTTP and `www` redirect once to `https://mannabread.com/`.
- All seven currently published priority routes return 200; a fabricated URL returns a true 404 with `noindex`.
- Production robots.txt and sitemap.xml return the correct content types and contain only intended public URLs.
- All eight local public routes are statically pre-rendered by Next.js, with unique metadata and self-canonicals.
- Audited local routes contain one useful H1, visible body content, semantic landmarks, and crawlable anchors in initial HTML.
- The site-wide Bakery/WebSite entity graph uses stable IDs and consistent business details; menu JSON-LD is generated from the same menu data rendered on-page.
- Social preview image dimensions match the real 1050 × 600 asset, and referenced icons/images return through the application build.
- GA4 `G-TM9DZFLC2P` is present on production. The implementation tracks primary conversions and preserves raw referral behavior while adding AI-referral categorization.
- The optional `llms.txt` is concise, factual, canonical, and correctly states that it is not an ordering surface.

## Technical SEO

Confirmed production behavior:

- `https://mannabread.com/` and representative public routes return 200.
- `http://mannabread.com/` and `https://www.mannabread.com/` return a single 308 to the canonical host.
- An unknown path returns 404 with `noindex`.
- `/robots.txt` returns 200 `text/plain`; `/sitemap.xml` returns 200 XML.
- Production sitemap contains the seven deployed public routes. Local output contains those routes plus `/careers`, matching the local router.
- No broken local internal links were found among rendered anchors.

Local Next.js output is pre-rendered rather than an empty app shell. Important text is present in HTML even when motion styles initially reduce opacity. Canonicals consistently use the production host. No pagination, facets, locales, campaign routes, or parameter crawl traps were observed.

## Content, AEO, GEO, and AI discovery

The site clearly defines Manna Bakery as a bakery, cafe, and gathering place in Tomball; names the founder; gives address, hours, phone, email, offerings, catering/rental constraints, prices, and next steps; and provides substantial first-party story content. This is a stronger basis for answer retrieval than thin query-variant landing pages. Google states that generative Search visibility uses the same foundational SEO principles and does not require special AI markup; it also states that `llms.txt` is not used for Google Search ranking or generative eligibility. The existing file should therefore remain an optional maintained directory, not be represented as a ranking control.

The wildcard robots rule permits search/citation retrieval. Current OpenAI guidance separates OAI-SearchBot discovery from GPTBot training controls, and Perplexity documents PerplexityBot as its search-discovery crawler. The business should decide training policy independently from search visibility and verify that Vercel/CDN/WAF behavior agrees with robots.txt.

## Structured data

- Site-wide: `Bakery` and `WebSite` in one JSON-LD graph with stable `@id` references.
- Menu: `Menu`, `MenuSection`, and `MenuItem` generated from the same local menu source used for visible rendering.
- Syntax: every JSON-LD block on the audited local routes parsed successfully.
- Parity: name, address, phone, email, hours, founder, menu link, cuisine categories, map, and social links were found in visible/project-approved sources.
- Limitation: external Schema.org/Google rich-result validation was not completed successfully in this environment. Menu markup is useful for entity comprehension but is not represented here as a guaranteed Google rich result.

## Performance, media, and accessibility

This audit used local mobile Lighthouse lab runs, not field data. The initial sample scored performance 57, accessibility 96, SEO 100, with 7.2 s LCP and 4,685 KiB transfer. A subsequent diagnostic sample scored performance 77, accessibility 100, SEO 100, with 6.3 s LCP, 20 ms TBT, 0 CLS, and 3,633 KiB transfer. Run-to-run lab variation means the score change is directional rather than proof of production improvement. The temporary story-video preload change used for the second sample was reverted at the owner's request; the footer contrast correction remains.

The remaining LCP element is the hero video. Its approved visual role should be preserved, but a responsive delivery strategy deserves focused testing. The 31 MB founder video also needs captions and should continue loading only near use.

## Measurement

- Confirmed on live HTML: GA4 measurement ID `G-TM9DZFLC2P`.
- Confirmed in repository: click, lead, video, and AI-referral event instrumentation.
- Recorded in the current growth profile: the verified `https://mannabread.com/` Search Console property is linked to GA4 and the sitemap was successfully read with seven pages discovered as of 2026-08-04.
- Not testable with current access: rankings, impressions, indexed-page status, query movement, AI-referral volume, conversion totals, Bing coverage, schema enhancement reports, manual actions, security issues, and field Core Web Vitals.

## Changes implemented

| Change | Files/surfaces | Reason | Verification |
|---|---|---|---|
| Increased the footer scripture citation's effective contrast. | `components/layout/Footer.tsx` | Correct the only Lighthouse WCAG contrast failure. | Post-fix Lighthouse accessibility 100; color-contrast audit passed. |

The founder-story video was temporarily changed to `preload="none"` during the audit, then restored to its original `preload="metadata"` behavior at the owner's request.

No commit, push, deployment, URL submission, analytics setting change, crawler-policy change, CDN/WAF change, or webmaster-tool mutation was performed.

## Remaining opportunities

1. **Blocking/high-priority technical work:** none observed. Optimize hero video delivery as the leading P2 technical opportunity.
2. **Content and evidence work:** obtain caption/transcript assets; verify testimonial sources, dates, and permissions; keep menu/catering/rental facts synchronized with Toast and client approvals.
3. **Authority/entity work:** keep Google Business Profile, social profiles, Toast, and the website's name/address/phone/hours consistent; pursue authentic local/community references rather than manufactured mentions.
4. **Performance/accessibility work:** test a mobile hero poster or mobile-specific encode; use field CWV to decide urgency; keep media responsive and avoid preloading below-the-fold video.
5. **Measurement and operational work:** establish 90-day Search Console/GA4 baselines, review the Generative AI performance report where available, monitor AI referrals and qualified conversions, and add release annotations.
6. **Policy decisions:** document GPTBot/model-training intent; obtain an approved privacy notice; confirm testimonial permissions.

## Weekly monitoring plan

- URLs/templates to sample: `/`, `/menu`, `/our-story`, `/catering`, `/gift-cards`, `/rentals`, `/contact`, `/careers` after deployment, one unknown URL, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and social preview assets.
- Metrics and tools: response status/redirect chain, canonical/meta robots/title/description, JSON-LD parse, internal links, Search Console indexing/queries/Core Web Vitals/generative performance, GA4 organic and AI-referral conversions, and Bing coverage when connected.
- Expected baselines: canonical pages 200; alternate hosts one 308; missing pages 404/noindex; robots/sitemap 200; one H1; one canonical; initial HTML contains primary copy; JSON-LD parses; no broken internal links.
- Alert thresholds: any P0/P1 condition immediately; any priority route non-200, accidental noindex/disallow, canonical-host drift, sitemap removal, blank initial HTML, invalid JSON-LD, or sharp conversion/coverage decline requires same-day review. Treat lab performance changes as diagnostic until field data corroborates them.
- Report destination: append a compact weekly delta next to this audit or use the project's established reporting channel.
- Owner/escalation path: Creative Currents for code/release; Christin/Manna for business facts, testimonial permission, privacy, and crawler-training policy; hosting/DNS provider for external configuration.

## Sources

Current primary guidance verified 2026-08-11:

- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [OpenAI: Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity: crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Schema.org vocabulary](https://schema.org/)
