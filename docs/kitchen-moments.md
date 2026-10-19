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

The page follows the existing `Motion.tsx` and `ScrollVine.tsx` approach: the same organic easing, viewport reveals, SVG path drawing, scroll motion values and restrained drift. `useMediaParallax` and `useMobilePerformanceMode` are reused directly. New motion components live entirely under `components/kitchen-moments/`.

Gold stems draw around the hero on load; section vines grow with scroll and sway slowly. Every section reveals, cards stagger, and image masks and parallax add depth. A visible Pause motion control makes the page static. System reduced motion overrides all new motion in both CSS and JavaScript, with fully visible content before hydration. Mobile/coarse-pointer mode disables continuous sway, image parallax and animated grid layout, halves vine leaf detail, shortens reveals and removes the glow blur.

The page includes semantic headings, labeled button groups, pressed states, native ingredient checkboxes and journal disclosures, visible focus rings, a skip link, and live announcements for batch size, guided steps and filter results. Smaller labels use cream on forest for contrast; gold remains on decorative details and large accent text. The hero uses a priority Next Image with an explicit aspect ratio and responsive sizes; all other images load lazily. No new packages, API calls or storage were added.

## Image provenance

Three original images were generated with the built-in `image_gen` tool, then optimized locally using the repository’s existing Sharp dependency (WebP quality 83, without upscaling). No API keys or CLI generation were used. These are illustrative AI concepts, not photographs of Christin or actual Manna products. Alt text explicitly says **AI concept**. The hero caption and journal note also disclose this visibly.

| Saved file under `public/images/kitchen-moments/` | Dimensions | Bytes | Original generation filename |
| --- | --- | ---: | --- |
| `hands-and-dough.webp` | 1024 × 1536 | 206,050 | `exec-43e20bd6-b55b-4e08-950e-addcbd18432a.png` |
| `cinnamon-rolls.webp` | 1400 × 933 | 227,674 | `exec-b22e7b1a-b431-4d04-a49b-d7fdc34a19e1.png` |
| `bread-and-linen.webp` | 1400 × 933 | 251,684 | `exec-d6946bde-9d86-433e-bd64-25bc509bc838.png` |

Original outputs remain in `/Users/dillanmilosevich/.codex/generated_images/01a1555a-e0de-7740-9868-d16ab907d02d/`. Final images are all saved in this worktree. The three optimized assets total 685,408 bytes. All were visually inspected: no faces, text or logos.

### Final generation prompts

**Hands and dough**

> Use case: photorealistic-natural. Asset type: portrait editorial photograph for Manna Bakery Kitchen Moments hero. Close view of anonymous flour-dusted hands gently folding a rounded ball of bread dough on a timeworn walnut worktable. Only hands and forearms, cream linen apron at upper edge, no faces or identifiable people. Soft morning window light from left, a sprig of olive greenery, blurred deep forest green cabinetry. Warm cream, cognac, walnut, muted forest palette. Intimate, tactile, premium independent food journal photography, subtle natural grain, realistic anatomy, beautifully imperfect flour trails, calm sanctuary mood. Vertical composition, subject centered for an arched crop. No text, logos, lettering, watermark.

**Cinnamon rolls**

> Use case: photorealistic-natural. Asset type: editorial recipe photograph for Manna Bakery Kitchen Moments. Six golden cinnamon rolls cooling in an aged rectangular baking pan on a flour-dusted reclaimed walnut counter, delicate uneven cream glaze, one roll opened slightly showing soft spirals. Rumpled cream linen, small ceramic bowl, soft greenery blurred at far edge. Gentle side window light, deep forest green shadows, warm cognac pastry, quiet handcrafted mood. Landscape composition, premium tactile food journal photography, realistic baking details. No people, faces, text, logos, lettering, watermark.

**Bread and linen**

> Use case: photorealistic-natural. Asset type: editorial still life photograph for Manna Bakery Kitchen Moments journal. A deeply golden rustic round bread loaf, two torn slices with airy crumb on rumpled natural cream linen on a weathered walnut table. A handmade ceramic dish with butter, olive branches near a softly lit window, forest green shadowy background. Calm late afternoon light with subtle grain, warm cognac crust, cream and muted sage, intimate premium independent bakery journal. Landscape composition, close tactile perspective. No people, text, logos, lettering, watermark.

Existing assets reused without alteration: `christin-desert-portrait.jpeg`, `manna-recipe-books.webp` and `manna-entry-doors.webp`.

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

The server page calls `notFound()` unless `NODE_ENV` is exactly `development`; all production builds, including deployment previews, return 404. Page metadata sets `noindex, nofollow` and clears canonical metadata. There are no nav, footer, homepage, sitemap or discovery-file links to the route. No live services or accounts were accessed, and nothing was pushed or deployed.

## Validation and remaining review

- `npm run lint`: passed. A pre-existing lint failure in `scripts/extract-manna-wordmark.cjs` required one targeted annotation allowing its CommonJS `require`; the utility’s behavior is unchanged.
- `npm run build`: passed, including TypeScript compilation.
- Production build output `.next/server/app/kitchen-moments.meta` reports status **404**; its HTML contains the not-found message and `noindex`, and contains no sample recipe content.
- `git diff --check`: passed.
- The requested dev command started successfully at port 3012.
- Browser visual/interaction verification at **1440px and 390px**, with reduced motion on and off, **could not be completed**: the browser origin approval gate denied access to the local preview. No alternate browser or workaround was attempted. Overflow, visual composition, keyboard operation and interactive behavior still need hands-on verification in those four configurations.

Suggested manual pass: inspect every section and image crop; check horizontal overflow at 390px; use keyboard focus through controls; test all batch sizes, ingredient checks, the entire guided sequence, every journal filter/disclosure, and Pause/Resume motion. With reduced motion enabled, all content must remain readable with no drawing, reveals, parallax or sway.
