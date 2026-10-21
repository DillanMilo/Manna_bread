# Kitchen Moments with Christin

Local design scaffold, 19 October 2026. Route: `/kitchen-moments`. Branch: `codex/kitchen-moments`.

## Direction and sections

A kitchen notebook in Manna’s business-card forest (`#3D5247`), warm white, linen cream, walnut and brush gold. Playfair Display headlines, Lora italic accents and quotations, and Libre Franklin UI inherit the existing font setup. The forest override is scoped to this page; shared components and site-wide tokens are unchanged.

1. Staged hero: large editorial title, Lora tagline, arched hands-and-dough image, soft gold glow, drawing gold vines, and chapter links.
2. A space reserved for Christin’s introduction, with her existing portrait and explicitly marked sample editorial copy.
3. Featured round-loaf sample recipe: 1×/2×/3× scaling, ingredient checkboxes, the complete method, and an optional five-step guided mode with Back, Next, Finish and Start again. Scaling changes the number of loaves; temperature and bake time per loaf remain fixed.
4. Kitchen notebook: Recipes, Kitchen stories and Seasonal notes filters, staggered image cards, result count announcements, and expandable sample directions.
5. Quiet quotation interlude. The only attributed quotation is already present in `components/sections/FounderInterlude.tsx`: “I love how people pause when they’re eating bread. It’s a time where they just rest.”
6. Visit section using the existing address/hours constants and Manna entrance photo. The order CTA uses `TOAST.orderOnline` only when the existing `FEATURES.onlineOrdering` flag is enabled; its current disabled state shows the local menu link instead.

## Motion, accessibility and performance

The page follows the existing `Motion.tsx` and `ScrollVine.tsx` approach: organic easing, viewport reveals, SVG path drawing, scroll motion values and restrained drift. `useMediaParallax` and `useMobilePerformanceMode` are reused directly. New motion components live under `components/kitchen-moments/`. Reveals use finite native animations over visible HTML, with a 360px observer margin and a fail-open fallback. Image masks animate inside the stationary frame so the arch outline stays aligned.

On page load, both gold hero stems grow from their bases around the arch over 4.8 seconds after a short opening delay. The faint outline grows with them, and leaf pairs unfold as each stem reaches them, finishing in the original arrangement. Compact mode keeps the remaining leaves synchronized to the same positions. Section vines continue to grow with scroll; desktop vines sway slowly. Gold and fern vines remain in narrow margin rails outside journal body text.

Images have spring-smoothed parallax on both desktop and mobile. CSS selects the travel distance before hydration: desktop uses up to 12% of the enlarged image layer height in each direction with 18% vertical overscan; mobile/coarse-pointer mode uses 6% with 10% overscan. The image edges remain covered at both extremes. Only image transforms update on scroll; there is no React state update per scroll frame. Frames and captions remain steady. Mobile mode still disables continuous vine sway, image parallax is now enabled at the gentler strength requested on 21 October, animated journal layout stays disabled, vine detail is halved, reveals are shorter and the glow blur is removed. Journal frames retain a 5:4 ratio and their existing desktop offsets.

The header Pause motion button was removed at the user's request on 21 October. The operating system's reduced-motion setting still stops image drift, growth, reveals, sway and transitions in both CSS and JavaScript, and immediately shows all content and completed vines.
Mobile width constraints include explicit single-column grids, zero minimum widths on grid children, wrapping captions, a contained overlay card, and a full-width page with horizontal clipping. A page-scoped `:has()` selector constrains the Coming soon invitation in this route’s header without changing shared header components or other pages.

The page includes semantic headings, labeled button groups, pressed states, native ingredient checkboxes and journal disclosures, visible focus rings, a skip link, and live announcements for batch size, guided steps and filter results. Smaller labels use cream on forest for contrast; gold remains on decorative details and large accent text. The hero uses a priority Next Image with an explicit aspect ratio and responsive sizes; all other images load lazily. No new packages, API calls or storage were added.

## Image provenance

Four original images were generated with the built-in `image_gen` tool, then optimized locally using the repository’s existing Sharp dependency (WebP quality 83, without upscaling). The fourth replaces the cool cookbook library image following Alfred’s review. No API keys or CLI generation were used. These are illustrative AI concepts, not photographs of Christin or actual Manna products. Alt text explicitly says **AI concept**. The hero caption and journal note also disclose this visibly.

| Saved file under `public/images/kitchen-moments/` | Dimensions | Bytes | Original generation filename |
| --- | --- | ---: | --- |
| `hands-and-dough.webp` | 1024 × 1536 | 206,050 | `exec-43e20bd6-b55b-4e08-950e-addcbd18432a.png` |
| `cinnamon-rolls.webp` | 1400 × 933 | 227,674 | `exec-b22e7b1a-b431-4d04-a49b-d7fdc34a19e1.png` |
| `bread-and-linen.webp` | 1400 × 933 | 251,684 | `exec-d6946bde-9d86-433e-bd64-25bc509bc838.png` |
| `cookbook-and-linen.webp` | 1400 × 1120 | 219,768 | `exec-b5537e5a-9246-451a-98c0-2f9a87899771.png` |

Original outputs remain in `/Users/dillanmilosevich/.codex/generated_images/01a1555a-e0de-7740-9868-d16ab907d02d/`. Final images are all saved in this worktree. The four optimized assets total 905,176 bytes. All were visually inspected: no faces, legible text or logos. The cookbook has indistinct decorative handwriting.


### Woman’s-hands comparison variant — 21 October 2026

The built-in ImageGen tool edited `hands-and-dough.webp`, preserving its lighting, composition, props and mood while changing the anonymous hands and forearms. This is an AI concept, not a photograph or likeness of Christin. The original asset remains unchanged. The initial preview offered **Original** / **Woman’s hands** buttons for comparison. After the woman’s-hands direction was selected, the comparison controls and their React state were removed. The refined version below is now the sole hero image.

- Project asset: `public/images/kitchen-moments/hands-and-dough-womens-hands.webp`.
- Size: 1024 × 1536, 201,286 bytes; optimized with the existing Sharp dependency at WebP quality 85.
- Original generated PNG: `/Users/dillanmilosevich/.codex/generated_images/01a1558f-9c16-7293-83de-d3b6b1cf7006/exec-b86a8763-322c-4f5f-93c1-cd905f27473c.png`.
- Tool mode: built-in ImageGen edit; no API key or CLI generation.

Exact edit prompt:

> Use case: precise-object-edit. Asset type: portrait editorial photograph for Manna Bakery Kitchen Moments hero. Input image: edit target. Make a comparison variant by changing ONLY the baker's hands and visible forearms to an adult woman's hands and forearms: naturally more slender fingers, softer contours, realistic flour-dusted skin, short unpolished working nails, anatomically correct hands actively kneading with the SAME pose and contact points. These are anonymous concept hands, not a likeness of a specific real person. Preserve the original image as closely as possible in every other respect: exact portrait framing and camera angle, dough ball and its shape, weathered walnut counter and flour trails, cream linen apron and sleeve, olive sprig, linen cloth, flour bowl, forest green cabinetry and blurred background. Preserve the SAME soft warm morning window light from the left, highlights and shadows, cream/cognac/walnut/forest colors, depth of field, texture, quiet handcrafted editorial mood. Keep the same 2:3 portrait composition and subject positioning for an arched crop. Do not add a face, jewelry, text, logo, watermark, or new props.


### Selected hero: refined feminine hands — 21 October 2026

The user selected the woman’s-hands direction and requested slightly more feminine fingers. Built-in ImageGen edited the selected concept to give the fingers a slimmer, tapered silhouette, softer knuckles and short natural oval nails while retaining the kneading pose, flour texture, warm window lighting and scene. The revised image is the sole hero, with no comparison controls. Previous assets remain saved as source versions. Desktop and mobile parallax are unchanged.

- Current project asset: `public/images/kitchen-moments/hands-and-dough-womens-hands-refined.webp`.
- Size: 1024 × 1536, 196,776 bytes; optimized with Sharp at WebP quality 85.
- Generated source: `/Users/dillanmilosevich/.codex/generated_images/01a1558f-9c16-7293-83de-d3b6b1cf7006/exec-37a8fe51-b4f5-4311-95db-987cd2a5a9a3.png`.
- Tool mode: built-in ImageGen edit; no API key or CLI generation.

Exact refinement prompt:

> Use case: precise-object-edit. Asset type: portrait editorial hero photograph for Manna Bakery. Input image is the edit target. Make a subtle but clearly visible refinement ONLY to the hands, especially the fingers, so they have a more feminine appearance: slightly slimmer and more delicately tapered fingers, softer rounded knuckle contours, narrower fingertips, and neat short natural softly oval nails, still practical for kneading bread. Keep realistic adult woman's working hands, believable skin and flour texture, natural joint creases and correct anatomy. Preserve the current skin tone. Avoid broad square fingertips or heavy pronounced knuckles, but do not make the hands unnaturally thin, plastic, airbrushed or glamorous. Preserve the exact current kneading pose, hand placement, contact with the dough, wrists and arm alignment. Keep every other aspect unchanged: the dough shape and flour, walnut table, cream linen apron and rolled sleeve, flour bowl, olive greenery, linen cloth, forest green cabinetry, framing, camera angle and 2:3 portrait composition. Preserve the same warm soft window light from the left, shadows, color grading, depth of field and quiet tactile premium bakery mood. No face, jewelry, nail polish, long nails, text, logos or new props. This is an anonymous AI concept, not a likeness of a particular real person.

### Final generation prompts

**Hands and dough**

> Use case: photorealistic-natural. Asset type: portrait editorial photograph for Manna Bakery Kitchen Moments hero. Close view of anonymous flour-dusted hands gently folding a rounded ball of bread dough on a timeworn walnut worktable. Only hands and forearms, cream linen apron at upper edge, no faces or identifiable people. Soft morning window light from left, a sprig of olive greenery, blurred deep forest green cabinetry. Warm cream, cognac, walnut, muted forest palette. Intimate, tactile, premium independent food journal photography, subtle natural grain, realistic anatomy, beautifully imperfect flour trails, calm sanctuary mood. Vertical composition, subject centered for an arched crop. No text, logos, lettering, watermark.

**Cinnamon rolls**

> Use case: photorealistic-natural. Asset type: editorial recipe photograph for Manna Bakery Kitchen Moments. Six golden cinnamon rolls cooling in an aged rectangular baking pan on a flour-dusted reclaimed walnut counter, delicate uneven cream glaze, one roll opened slightly showing soft spirals. Rumpled cream linen, small ceramic bowl, soft greenery blurred at far edge. Gentle side window light, deep forest green shadows, warm cognac pastry, quiet handcrafted mood. Landscape composition, premium tactile food journal photography, realistic baking details. No people, faces, text, logos, lettering, watermark.

**Bread and linen**

> Use case: photorealistic-natural. Asset type: editorial still life photograph for Manna Bakery Kitchen Moments journal. A deeply golden rustic round bread loaf, two torn slices with airy crumb on rumpled natural cream linen on a weathered walnut table. A handmade ceramic dish with butter, olive branches near a softly lit window, forest green shadowy background. Calm late afternoon light with subtle grain, warm cognac crust, cream and muted sage, intimate premium independent bakery journal. Landscape composition, close tactile perspective. No people, text, logos, lettering, watermark.

**Cookbook and linen**

> Use case: photorealistic-natural. Asset type: editorial food-journal still life for Manna Bakery Kitchen Moments. An open, well-used cookbook on a timeworn walnut kitchen counter, a small handwritten margin note that is impressionistic and entirely illegible, no readable letters or words anywhere on the pages. Rumpled natural cream linen, a sprig of fresh olive greenery, subtle flour traces, soft honey-colored window light. Warm cream paper, rich walnut, cognac highlights and deep forest green shadows. Tactile, quiet, premium independent bakery journal photography, natural grain. Landscape 5:4 composition with the open book as the main subject; camera slightly above the counter. No people, faces, logos, watermark or legible text.

Existing assets reused without alteration: `christin-desert-portrait.jpeg` and `manna-entry-doors.webp`. The old `manna-recipe-books.webp` file remains untouched but is no longer used on this page.

## What needs Christin

- Her personal introduction and approval of the series title and editorial direction.
- A tested recipe, ingredient weights, yield, timing, visual cues and allergen notes. The working recipe is generic sample content, not an approved Manna recipe.
- Her own journal stories, recipe notes and seasonal observations. All current journal text is labeled sample content.
- Actual kitchen and finished-product photography to replace AI concepts; optional short videos when supplied. No invented video player or media was added.

## Preview and protection

```sh
npm run dev -- --hostname 127.0.0.1 --port 3012
```

Open `http://127.0.0.1:3012/kitchen-moments`.

The page is available locally in development. Hosted review access requires both `VERCEL_ENV=preview` and the explicit `KITCHEN_MOMENTS_PREVIEW=1` deployment setting. Vercel Production always returns 404 for this route, even if the opt-in flag is accidentally present. Other previews remain blocked by default.

Only the opted-in review deployment redirects `/` to `/kitchen-moments`; links to other pages open `https://mannabread.com` without forwarding share query parameters, and API requests are blocked. Images and Next.js assets remain available. Page metadata and review response headers mark the preview `noindex, nofollow`; canonical metadata is cleared. There are no nav, footer, homepage, sitemap or discovery-file links to the draft route on the live site.

Deploy from `codex/kitchen-moments` using Vercel target **preview**, with `KITCHEN_MOMENTS_PREVIEW=1` at build time and runtime. Use a deployment-specific share link for access without a Vercel account. Do not promote it or assign the live site's production domain. All work stays on `codex/kitchen-moments`; do not merge or push to `main`.

Video decision: keep the photography until actual footage is supplied; add a player and use the chosen image as its poster when the clip is ready. No placeholder player is included.

## Validation and remaining review

- `npm run lint`: passed. A pre-existing lint failure in `scripts/extract-manna-wordmark.cjs` required one targeted annotation allowing its CommonJS `require`; the utility’s behavior is unchanged.
- `npm run build`: passed, including TypeScript compilation.
- `node --test components/kitchen-moments/entrance.test.mjs`: six regression cases passed using local DOM-contract stubs. These cover initial visibility in a 4200px viewport, scroll entry, silent/missing/throwing observers, animation cleanup, reduced motion, and missing/throwing animation APIs. No browser or network is involved in these tests.
- Hosted guard verification: the built server returns **404** for `/kitchen-moments` with `VERCEL_ENV=production`, including when `KITCHEN_MOMENTS_PREVIEW=1`; no sample recipe content is rendered. The route checks this guard on every request.
- Opted-in Preview verification: `/kitchen-moments` returns **200** with the selected refined hero and `noindex`; `/` redirects directly to the page, other page links redirect to the live site without share query parameters, and POST `/api/inquiry` returns **404**.
- `git diff --check`: passed.
- The requested dev command started successfully at port 3012.
- Targeted browser checks on 21 October at **1396px and 390px** confirmed the initial hero comparison buttons, a loaded new image, the removed Pause button, mobile parallax movement while scrolling, covered image edges, no horizontal overflow, unchanged desktop 12% travel and static images with system reduced motion. The new hands, anatomy, lighting and scene were visually inspected. Broader manual checks of the unchanged recipe and journal controls remain recommended below.

Suggested manual pass: inspect every section and image crop; check horizontal overflow at 390px; use keyboard focus through controls; test all batch sizes, ingredient checks, the entire guided sequence, every journal filter/disclosure, and the selected hero image. With reduced motion enabled, all content must remain readable with no drawing, reveals, parallax or sway.
