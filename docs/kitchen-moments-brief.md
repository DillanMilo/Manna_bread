# Brief: "Kitchen Moments with Christin" — local scaffold (Codex)

Owner: Codex (build), Alfred (coordination), Dillan (approval). Date: 2026-10-19.
Worktree: `/Users/dillanmilosevich/Desktop/IDE/Manna_bread-kitchen-moments`
Branch: `codex/kitchen-moments` (from `origin/main` a99520c). Dillan will continue this chat with Codex in the terminal.

## Goal
A stunning, on-brand new page for the Manna Bakery website: **Kitchen Moments with Christin**, a home for Christin's recipes, kitchen stories and short moments from the bakery. This is a first scaffold to wow Dillan, not final content. Route: `/kitchen-moments`.

Dillan's words: "real beautiful", "stunning", "as much dynamic movement as possible", "scrolling animations, beautiful load-in animations", "beautiful background vines that move in, like the animations Codex already did".

## Read first
- `AGENTS.md` (brand system, palette, fonts, motifs, story guardrail) — follow it exactly. Accent font is **Lora** (not Cormorant).
- Existing motion: `components/ui/ScrollVine.tsx`, `components/ui/Motion.tsx`, `components/ui/useMediaParallax.ts`, `components/ui/useMobilePerformanceMode.ts`, and how `app/our-story`, `app/catering`, `components/sections/WelcomeInterlude.tsx` use vines. Reuse these patterns rather than inventing a different animation language.
- Earlier explorations (ideas only, do not merge them): branches `codex/in-the-kitchen-draft` (`app/in-the-kitchen/page.tsx`, `lib/kitchenDraft.ts`, `docs/in-the-kitchen-draft.md`) and `Kitchen_claude` ("Cooking with Christin", `lib/kitchen-recipes.ts`). Use `git show <branch>:<path>` to read them. Take the best ideas (interactive recipe scaling, journal filters, guards) and make this version far more visual and alive.

## Must have
1. **Load-in**: elegant staged hero entrance (headline, Lora tagline, arched hero image with soft brush-gold glow, gold vines drawing themselves in around the arch).
2. **Background vines**: animated SVG vines/leaves that grow in on load and keep growing/swaying as the user scrolls, framing sections, in the same spirit as ScrollVine. Subtle, organic, never cluttered.
3. **Scroll animations** on every section: reveals, staggered cards, gentle parallax on images, image mask/arch reveals, a slow drift on botanical accents.
4. **Sections (suggested, improve freely)**: hero; a short "from Christin" intro (placeholder copy marked as such); featured recipe with interactive scaling + step-by-step mode; a "moments" gallery/journal (recipes, kitchen stories, seasonal notes) with filters; a quiet scripture/quote interlude (use only a quote already on the site); closing CTA to visit the bakery / order via existing Toast links in `lib/constants.ts`.
5. **Images**: generate 3–5 warm, editorial bakery/kitchen images with your built-in image generation (hands kneading dough, flour-dusted wood counter, cinnamon rolls cooling, bread on linen, soft window light, greenery, cognac/forest/cream tones, no faces or identifiable people, no text). Save as optimised `.webp` under `public/images/kitchen-moments/`, label them "AI concept" in alt text, and note provenance in the doc. Existing Manna photos in `public/images` may also be used.
6. **Accessibility/performance**: honour `prefers-reduced-motion` (static, fully readable), respect the mobile performance mode, no horizontal overflow at 390px, keyboard accessible controls, good LCP (hero image priority, sized).

## Constraints
- Local only. Keep the route dev-only (404 in production, `noindex`), not linked from nav, footer, homepage or sitemap, like the earlier draft.
- Do not change shared components' behaviour for other pages; add new components under `components/kitchen-moments/` if needed. Tailwind first; Framer Motion is fine if already a dependency (check package.json), otherwise CSS/IntersectionObserver.
- Copy: warm, handcrafted, no clichés, no "whether", no sales language. Placeholder recipe and story text must be clearly marked as sample content, not attributed to Christin. Follow the public story guardrail in AGENTS.md.
- No push, deploy, merge, sign-in or live data. You may commit locally on this branch.

## Done when
- `npm run lint` and `npm run build` pass.
- Dev server preview works at `http://127.0.0.1:3012/kitchen-moments` (`npm run dev -- --hostname 127.0.0.1 --port 3012`); checked at 1440px and 390px with reduced motion on and off.
- `docs/kitchen-moments.md` summarises the direction, sections, image provenance, what needs Christin, and how to preview.
- Work committed locally on `codex/kitchen-moments`. End with a plain-English summary.
