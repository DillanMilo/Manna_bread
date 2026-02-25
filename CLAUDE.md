# CLAUDE.md - Manna Bakery Project Context

> This file provides context for Claude Code to understand the project vision, design system, and technical decisions. Reference this before making recommendations or generating code.

---

## Project Overview

**Client:** Manna Bakery
**Location:** Tomball / The Woodlands, TX
**Business Type:** Curated bakery & café (NOT a generic coffee shop)
**Website Goal:** Create a warm, premium, emotionally engaging website that feels like an extension of the in-store experience

**Developer:** Creative Currents LLC (Dillan)
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel
**Backend Integration:** Toast (headless - we build frontend only, Toast handles ordering, menu, rewards, gift cards)

---

## The Vibe

Manna Bakery is **more than a bakery—it's a sanctuary**. The physical space is Jerusalem-inspired with:
- Reclaimed timber beam structures
- Arched alcoves with soft lighting
- Abundant greenery and living walls
- Warm cognac lher seating
- High ceilings with white-painted industrial elements
- A compass rose motif on the exterior

The website must capture this feeling: **warm, intentional, organic, and experiential**. Users should feel like they're stepping into the space, not just browsing a menu.

### Design Principles
1. **Sanctuary** — A place of rest & refuge. Calm, not chaotic.
2. **Organic** — Natural textures, living elements, warmth.
3. **Gathering** — Community & connection. Breaking bread together.
4. **Intentional** — Every detail has meaning & purpose.

### What to Avoid
- Generic bakery/coffee shop aesthetics
- Sterile, corporate, or overly minimal designs
- Heavy-handed religious imagery (faith is woven subtly, not shoved)
- Cheap-looking free fonts or stock photography vibes
- Cluttered layouts or aggressive CTAs

---

## Brand Story Context

The founder, **Christin**, has an incredible personal journey—leaving the Mormon church, becoming a born-again Christian, and building Manna Bakery with her familyignificant hardship. This resilience and faith are core to the brand identity.

The name "Manna" references the biblical bread from heaven—nourishment for the journey, provided with love. The tagline **"Bread from Heaven"** appears on the storefront.

**How to incorporate faith:**
- Subtle scripture references or quotes (not preachy)
- Themes of gathering, breaking bread, community
- Personal quotes from Christin woven throughout
- The journey/story should feel present but not overwhelming

---

## Typography System

Christin is **font-sensitive** and believes free fonts signal cheap quality. We're using premium, intentional typography:

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Display / Headlines** | Playfair Display | 400, 500, 600 | Hero headlines, section titles, page titles |
| **Accent / Quotes** | Cormorant Garamond | 400 italic, 500, 600 | Scripture quotes, testimonials, taglines, elegant accents |
| **Body / UI** | Libre Franklin | 300, 400, 500, 600 | Body text, navition, buttons, labels, form elements |

### Typography Rules
- Headlines should feel elegant and warm, never cold or corporate
- Quotes always use Cormorant Garamond in italic
- Body text should be highly readable with generous line height (1.7+)
- Use uppercase tracking (2-3px letter-spacing) sparingly for labels/eyebrows
- Never use Inter, Roboto, Arial, or system fonts

### Tailwind Font Classes
```
font-display  → Playfair Display (headlines)
font-accent   → Cormorant Garamond (quotes)
font-body     → Libre Franklin (everything else)
```

---

## Color Palette

Extracted directly from the Manna Bakery storefront photos:

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Warm White** | `#FAF9F6` | `brand-warm-white` | Primary backgrounds |
| **Soft Cream** | `#F5F2ED` | `brand-soft-cream` | Section backgrounds, cards |
| **Muted Sage** | `#8A9A8E` | `brand-sage` | Accents, borders, secondary elements |
| **Sage Light** | `#B8C4B8` | `brand-sage-light` | Hover statetle backgrounds |
| **Deep Walnut** | `#3E2723` | `brand-walnut` | Primary text, buttons, headers |
| **Walnut Medium** | `#5D4037` | `brand-walnut-medium` | Hover states for walnut |
| **Cognac** | `#C4956A` | `brand-cognac` | CTAs, highlights, accents |
| **Cognac Light** | `#D4A574` | `brand-cognac-light` | Hover states for cognac |
| **Fern Green** | `#4A7C59` | `brand-fern` | Life, growth, botanical accents |
| **Soft Olive** | `#6B705C` | `brand-olive` | Secondary text, captions |
| **Warm Charcoal** | `#2D2A26` | `brand-charcoal` | Primary body text |

### Color Usage Guidelines
- **Backgrounds:** Warm white for primary, soft cream for alternating sections
- **Text:** Charcoal for body, walnut for headlines, olive for secondary
- **CTAs:** Cognac for primary actions, walnut for secondary
- **Accents:** Sage for borders/dividers, fern for botanical touches
- **Dark sections:** Walnut background with white/cream text

---

## Visual Motifs

These architectural elements from the physical space should inform the digital design:

### Arched Alcoves
- Soft, rounded shapes inspired by Jerusalem architecture
- Use for: hero containers, image frames, card treatments
- CSS: `border-radius: 9999px 9999px 0 0` for arch tops

### Timber Beams
- Reclaimed wood structures that define space
- Use for: section dividers, visual weight, horizontal rules
- Consider: subtle wood grain textures as backgrounds

### Compass Rose
- Wayfinding symbol from the exterior signage
- Use for: navigation elements, icon design, subtle branding touches

### Living Elements
- Abundant greenery throughout the space
- Use for: organic shapes, asymmetrical layouts, botanical photography

---

## Component Patterns

### Buttons
- **Primary:** Walnut background, warm white text, subtle lift on hover
- **Secondary:** Transparent with walnut border, fills on hover
- **Accent:** Cognac background, white text (for primary CTAs like "Order Online")
- **Ghost:** Transparent with white border (for use on dark/image backgrounds)
- **Border radius:** 8px (rounded-lg)
- **Padding:** 14px 28px default

### Cards
- White background on cream sections, cream on white sections
- Rounded corners (16px / rounded-2xl)
- Subtle shadow that increases on hover
- Slight lift transform on hover (-translate-y-1.5)

### Section Headers
- Eyebrow label: uppercase, cognac, 11px, 2px letter-spacing
- Title: Playfair Display, 36-42px, walnut
- Description: Libre Franklin, 15-16px, olive

### Quote Blocks
- Cormorant Garamond italic
- Left border accent (3px cognac)
- Or: full card treatment with large decorative quotation mark

---

## Toast Integration

Manna uses **Toast** for their backend. We're building a headless frontend that links/embeds Toast for:
- **Online Ordering** → Link to Toast ordering page
- **Menu** → Embed or link to Toast menu
- **Gift Cards** → Link to Toast gift card purchase
- **Rewards** → Link to Toast rewards/loyalty

**Do NOT build:**
- Custom checkout or cart logic
- Custom menu management
- Payment processing
- Inventory systems

All Ts are stored in `lib/constants.ts` and clearly marked as placeholders until we get real URLs from the client.

---

## Page Structure

Per the contract, we're building 6 pages:

1. **Home** — Hero, about snippet, featured menu, experience, testimonials, services teaser, contact
2. **Menu** — Links to / embeds Toast menu
3. **Our Story** — Full narrative of Christin's journey and Manna's founding
4. **Catering** — Catering packages, inquiry form
5. **Gift Cards** — Toast gift card integration
6. **Rentals** — Private event space info, inquiry form
7. **Contact** — (Can be section on homepage or standalone)

---

## Content Awaiting from Client

These items are placeholders until Christin provides:
- [ ] Hero image (bakery interior with customers)
- [ ] Christin personal photo (for Story section)
- [ ] Product photos (from food photographer)
- [ ] Catering/event photos
- [ ] Customer testimonials
- [ ] Personal quotes/one-liners from Christin
- [ ] Full story narrative
- [ ] Actual Toast URLs
- ss, phone, email, hours
- [ ] Social media links

---

## Code Style Preferences

- **TypeScript:** Strict mode, explicit types
- **Components:** Functional components with explicit prop interfaces
- **Styling:** Tailwind utility classes, avoid custom CSS unless necessary
- **File naming:** PascalCase for components, kebab-case for routes
- **Imports:** Use `@/` alias for absolute imports
- **State:** React hooks, avoid external state management unless needed
- **Animation:** CSS transitions preferred, Framer Motion for complex animations

---

## Quick Reference

```typescript
// Brand constants
import { BRAND, CONTACT, TOAST, NAV_LINKS, SOCIAL } from '@/lib/constants';

// UI Components
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { MenuCard } from '@/components/ui/MenuCard';
import { ServiceCard } from '@/components/ui/ServiceCard';

// Layout
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
```

---

## When Making Recommendations

Always consider:
1. **Does this feel like Manna?** — Warm, intentional, sanctuary-like
2. **Is the typography correct?** — Display for headlines, accent for quotes, body for UI
3. **Are colors on-brand?** — Reference the palette above
4. **Is it premium?** — Christin is detail-oriented and quality-focused
5. **Does it serve the story?** — Every element should subtly reinforce the brand narrative

---

*Last updated: February 2026*
*Project by Creative Currents LLC*
