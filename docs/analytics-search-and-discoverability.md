# Analytics, Search Console, and Discovery Setup

This document covers the account-side steps that remain after the code in this
repository is deployed.

## Google Analytics 4

Create or select a Google Analytics account owned by Manna Bakery or the client.
Recommended property settings:

- Property name: `Manna Bread`
- Reporting time zone: `United States — Central Time`
- Currency: `United States Dollar (USD)`
- Web stream URL: `https://mannabread.com`
- Stream name: `Manna Bread Website`

Copy the resulting `G-...` measurement ID into the Vercel Production environment:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Set this only for Production unless preview traffic should intentionally appear
in the same property. Redeploy after adding the value.

### Events sent by the website

| Event | When it fires | Useful parameters |
|---|---|---|
| `page_view` | Initial load and every Next.js client-side route change | `page_path`, `page_title`, `page_location` |
| `generate_lead` | An inquiry is accepted by the website API | `lead_type`, `form_source` |
| `form_start` | A visitor first focuses an inquiry form | `lead_type`, `form_source` |
| `inquiry_error` | An inquiry attempt returns an error | `lead_type`, `form_source` |
| `order_online_click` | A visitor follows an official Toast ordering link | `link_text`, `page_path` |
| `gift_card_click` | A visitor follows the Toast gift-card link | `link_text`, `page_path` |
| `rewards_click` | A visitor follows the Toast rewards link | `link_text`, `page_path` |
| `toast_sign_in_click` | A visitor follows the header sign-in action | `link_text`, `page_path` |
| `toast_cart_click` | A visitor follows the header cart action | `link_text`, `page_path` |
| `contact_click` | A visitor taps a phone or email link | `contact_method`, `link_text`, `page_path` |
| `get_directions` | A visitor follows the Google Maps directions link | `link_text`, `page_path` |
| `social_click` | A visitor follows Instagram or Facebook | `social_network`, `link_text`, `page_path` |
| `video_start` / `video_complete` | Christin's story video starts or completes | `video_title`, `page_path` |
| `ai_referral_visit` | A session arrives from a recognized AI assistant or its UTM source | `ai_source`, `landing_page` |

No names, email addresses, phone numbers, message text, or other form contents
are sent to Analytics.

After live verification:

1. Mark `generate_lead` as a key event.
2. Create event-scoped custom dimensions for `lead_type`, `form_source`,
   `contact_method`, `social_network`, and `ai_source`.
3. Link the Search Console property under **Admin → Product links → Search
   Console links**.
4. Add client and internal-team IP rules to the GA4 internal traffic filter if
   Manna wants those visits excluded.
5. Review and approve a privacy/cookie disclosure before relying on Analytics
   for ongoing reporting.

Use GA4 Realtime and DebugView after deployment to confirm one page view per
route, one `generate_lead` per successful test inquiry, and the expected CTA
events. The implementation disables GA4's automatic first page view and sends
route-aware page views itself to avoid duplicates.

## Google Search Console

Preferred setup:

1. Create a **Domain property** for `mannabread.com`.
2. Add Google's TXT verification record to the domain's DNS.
3. Submit `https://mannabread.com/sitemap.xml`.
4. Inspect the homepage plus `/our-story`, `/catering`, `/rentals`, and
   `/contact` after the updated code is deployed.

A Domain property covers HTTPS, HTTP, `www`, and other subdomains. If DNS access
is not available, create the exact URL-prefix property
`https://mannabread.com/`, copy the HTML-tag verification token, and set:

```text
GOOGLE_SITE_VERIFICATION=verification-token-only
```

Redeploy before clicking **Verify**. The value should be only the token from the
meta tag, not the surrounding HTML.

## Search and AI discovery behavior

- Canonical URLs, unique route metadata, Open Graph metadata, a crawlable
  sitemap, and robots.txt are generated with Next.js metadata APIs.
- Site-wide JSON-LD describes the real Manna Bakery entity and official website
  using only business details visible on the site.
- `/llms.txt` provides an optional factual index for systems that choose to use
  the emerging convention. Google states that it does not use `llms.txt` for
  Search or generative Search ranking.
- The public site remains open to ordinary search, retrieval, and AI crawlers
  through the existing `User-agent: *` policy; `/api/` is excluded.
- The code does not make a new model-training policy decision. A separate
  business choice is still needed if Manna wants to block training crawlers
  such as GPTBot while continuing to allow search crawlers such as
  OAI-SearchBot.

## Current primary guidance

- [Google: optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: get started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [OpenAI: publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

Guidance checked July 28, 2026.
