# Manna Bakery SEO and AI Optimization Workflow

## Purpose

Durable project-specific guidance for recurring SEO, AEO, GEO, local discovery, content-quality, conversion-path, and technical-search work on `https://mannabread.com/`.

## Verified project context

- Repository: `/Users/dillanmilosevich/Desktop/IDE/Manna_bread`
- Framework: Next.js App Router.
- Business: Manna Bakery is a handcrafted bakery, cafe, and gathering place at 306 Commerce Street in Old Town Tomball, Texas.
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

## Known implementation

- Shared metadata utilities live in `lib/seo.ts`.
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

- **2026-08-25, full audit:** Reconfirmed the current eight-route SEO/entity/conversion architecture and rechecked current primary Google, OpenAI, Perplexity, Bing, and Schema.org guidance. The existing `public/llms.txt` change adding `/careers` is factually supported and preserved. Search discovery remains allowed by the wildcard robots rule except for `/api/`; model-training crawler policy remains an owner decision, and no crawler-policy change was made. No unsupported copy, metadata, schema, or performance change was introduced; current production transport and mobile checks require a network/browser-enabled follow-up because this audit environment could not access them reliably.
- **2026-08-18, production verification:** GA4 Favorites exposes `Manna Bread` and is receiving data (visible last-seven-day cards: 699 active users, 25 key events, and 5.6K events). Production emits measurement ID `G-TM9DZFLC2P`; the exact `https://mannabread.com/` Search Console property is accessible; the sitemap returns HTTP 200. Commit `1a97a13` was pushed to `main`, its ready Vercel deployment was promoted, `mannabread.com` and `www.mannabread.com` were assigned to that exact deployment, and the live menu metadata updated while visible page content remained unchanged.
- **2026-08-18, v2.1 audit:** Reconfirmed healthy public crawl, sitemap, canonical, H1, and structured-data foundations. Updated priority metadata titles to express verified Tomball/local intent for menu, catering, rentals, contact, careers, and bakery gift cards. Visible page copy and conversion flows remain unchanged.
- **2026-08-18:** Baseline file created under the updated Optimization Workflow. No new audit finding or production change is implied by file creation.
