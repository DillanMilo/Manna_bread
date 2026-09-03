# Manna Bakery SEO and AI Optimization Workflow

## Purpose

Durable project-specific guidance for recurring SEO, AEO, GEO, local discovery, content-quality, conversion-path, and technical-search work on `https://mannabread.com/`.

## Verified project context

- Repository: `/Users/dillanmilosevich/Desktop/IDE/Manna_bread`
- Framework: Next.js App Router.
- Business: Manna Bakery is a handcrafted bakery, cafe, and gathering place at 306 Commerce Street in Old Town Tomball, Texas.
- Current public hours: Monday through Saturday, 7:00 AM–4:00 PM; closed Sunday (client-confirmed September 3, 2026).
- Priority service area: Tomball and nearby communities, including The Woodlands.
- Primary offerings: in-store bakery and cafe, menu, Toast ordering, catering, private rentals, gift cards, and careers.
- Primary conversions: Toast order clicks, catering and rental inquiries, gift-card clicks, contact submissions, calls, and direction clicks.
- Brand: warm, premium, personal, faith-rooted, and distinct from a generic coffee shop.

## Priority public surfaces

1. `/`
2. `/menu`
3. `/catering`
4. `/rentals`
5. `/our-story`
6. `/gift-cards`
7. `/contact`
8. `/careers`

## Constraints and content rules

- Keep business facts consistent with `lib/constants.ts` and approved visible content.
- Christin’s name is spelled **Christin**.
- Toast remains the source for ordering, menu, rewards, and gift cards.
- Preserve the public faith-story guardrails and Manna’s established brand voice.
- Do not fabricate reviews, products, hours, services, claims, locations, awards, pricing, or founder details.
- Do not create thin location pages or keyword-stuffed copy.
- Prefer useful Tomball/local clarity inside real service and visit pages.
- Preserve the existing visual design and inquiry flows unless an approved change requires otherwise.
- SEO-only work must also preserve components, rendered copy, initial presentation, media delivery, and loading/scroll animations. General approval to proceed does not authorize those changes when the user reiterates an under-the-hood-only boundary.

## Known implementation

- Shared metadata utilities live in `lib/seo.ts`.
- `lib/siteUrl.ts` uses the explicit `NEXT_PUBLIC_SITE_URL` HTTP(S) origin or the verified `https://mannabread.com` default. Do not infer public canonical identity from Vercel deployment hostnames. This affects discovery metadata only; preview authentication/indexing controls are separate.
- Verified business constants live in `lib/constants.ts`.
- Site-wide Bakery/LocalBusiness and WebSite structured data lives in `lib/structuredData.ts`.
- Crawl and discovery surfaces include `app/robots.ts`, `app/sitemap.ts`, and `public/llms.txt`.
- Durable business and measurement context lives in `docs/client-growth-profile.md`.
- Analytics and discovery implementation notes live in `docs/analytics-search-and-discoverability.md`.

## Recurring run protocol

1. Read this file, the growth profile, business constants, and the latest optimization review.
2. Recheck the public live site before treating an old finding as current.
3. Prioritize local intent, factual business consistency, crawlability, conversion paths, and priority service pages.
4. Keep improvements local until deployment is explicitly approved.
5. Run the production build, lint, and rendered route checks for changed files.
6. Record only verified reusable guidance and material implementation changes in this file’s update log.

## Update log

- **2026-09-03, business-hours release:** The client confirmed new public hours of 7:00 AM–4:00 PM Monday through Saturday, with Sunday remaining closed. Updated the shared visible hours, rental-page hours, Bakery JSON-LD, and `llms.txt` for exact site-wide and machine-readable parity. The user explicitly authorized committing and pushing this change to `main` for publication.
- **2026-08-31, subsequent release authorization:** The user explicitly approved adding, committing, pushing, and publishing the reviewed under-the-hood changes. Release scope is canonical-origin normalization, explicit Sunday closure in JSON-LD, the missing Open Graph website type, and the three associated audit/workflow documents. The existing committed careers entry in `llms.txt` will also reach production. All presentation/content recommendations below remain deferred, and unrelated untracked work is excluded. Earlier local-only/no-publication statements record the authorization and production state at the time of those audits, not this subsequent release instruction. Verify the exact released commit and live responses after publication; do not submit URLs or change analytics/crawler policy.
- **2026-08-31, constrained follow-up:** The user reiterated a purely under-the-hood scope after discussing guest-facing additions. Rental counter/copy fixes, video captions/transcript, gift-card explanations, privacy disclosure/links, and testimonial attribution remain deferred because they affect presentation/behavior and/or need verified client facts. Added the missing `og:type=website` through `lib/seo.ts` for the eight existing pages; this does not complete any of those guest-facing additions or authorize publication.
- **2026-08-31, restricted full audit:** Verified live HTTP statuses, metadata, discovery files, redirects, and a true 404. `/gift-cards` is a local Manna page returning 200, resolving the prior reader ambiguity. Local-only changes harden the canonical origin helper and explicitly encode the already-visible Sunday closure in Bakery JSON-LD. Presentation, components, copy, loading, animation, crawler policy, analytics, and live settings remain unchanged. Production `llms.txt` still lacks the existing local `/careers` entry; publication remains a separate action. See the dated audit for validation and approval-only findings.
- **2026-08-25, full audit:** Reconfirmed the current eight-route SEO/entity/conversion architecture and rechecked current primary Google, OpenAI, Perplexity, Bing, and Schema.org guidance. The existing `public/llms.txt` change adding `/careers` is factually supported and preserved. Search discovery remains allowed by the wildcard robots rule except for `/api/`; model-training crawler policy remains an owner decision, and no crawler-policy change was made. No unsupported copy, metadata, schema, or performance change was introduced; current production transport and mobile checks require a network/browser-enabled follow-up because this audit environment could not access them reliably.
- **2026-08-18, production verification:** GA4 Favorites exposes `Manna Bread` and is receiving data (visible last-seven-day cards: 699 active users, 25 key events, and 5.6K events). Production emits measurement ID `G-TM9DZFLC2P`; the exact `https://mannabread.com/` Search Console property is accessible; the sitemap returns HTTP 200. Commit `1a97a13` was pushed to `main`, its ready Vercel deployment was promoted, `mannabread.com` and `www.mannabread.com` were assigned to that exact deployment, and the live menu metadata updated while visible page content remained unchanged.
- **2026-08-18, v2.1 audit:** Reconfirmed healthy public crawl, sitemap, canonical, H1, and structured-data foundations. Updated priority metadata titles to express verified Tomball/local intent for menu, catering, rentals, contact, careers, and bakery gift cards. Visible page copy and conversion flows remain unchanged.
- **2026-08-18:** Baseline file created under the updated Optimization Workflow. No new audit finding or production change is implied by file creation.
