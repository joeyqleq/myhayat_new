# AGENTS.md — MyHayat Project Instructions

## Project Identity

- **Name**: My Hayat ("My Life" in Arabic)
- **Repo**: `joeyqleq/myhayat_new`
- **Path**: `/home/jq/Desktop/myhayat_new`
- **Type**: AI-powered mental health chatbot platform for the Lebanese community
- **Status**: MVP in active development (landing page exists, building out full site)
- **Mem0 project_id**: `myhayat_new`

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: TailwindCSS 4 + PostCSS
- **Animation**: Framer Motion 12
- **Icons**: lucide-react
- **Email**: Resend
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Fonts**: Urbanist (body), Barriecito (headings), Satisfy (script), + Arabic font TBD (Noto Kufi Arabic or IBM Plex Arabic)
- **Language**: TypeScript

## Brand & Design

- **Palette**: Pink `#F85BAA`, Yellow `#FEC810`, Salmon `#F98181`, Off-white `#FFF9FC`
- **Design Language**: Playful, fun, inviting — NOT clinical. Neo-brutalist/Y2K aesthetic with Japanese cube patterns, curved shadows (`8px 8px 0px`), bold borders (`4px`), large rounded corners (`2rem+`)
- **Design Evolution**: Keep playfulness but add warmth and calm energy for mental health context. Soften animations, add warm gradients, calming accents
- **Typography**: Barriecito for headlines (playful), Urbanist for body (clean), Satisfy for script accents
- **Dark Mode**: Supported with toggle, warm dark (deep plum/navy, not cold gray)

## SVG Asset Library

All decorative SVGs are in `/public/`. There are 36+ assets. **Every asset must be used intentionally with a specific role — no random placement.**

### Currently Used (Home page)
- `decor_sun.svg` — Hero section, spin-slow animation
- `decor_melting_smiley.svg` — Hero headline + CTA section, bounce
- `decor_heart.svg` — Below subheadline, pulse
- `decor_shoot_star_2.svg` — Hero left side + CTA, pulse/spin
- `decor_flower_1.svg` — "Available 24/7" card, spin

### Unused — Place Across New Pages
**Clouds** (section transitions, dreamy backgrounds):
- `decor_cloud_1.svg` (694×264), `decor_cloud_2.svg` (327×182), `decor_cloud_3.svg` (373×180)

**Cosmic** (About page hero, vision sections):
- `decor_hayat_planet.svg` (182KB, large detailed planet), `decor_hayat_planet_2.svg` (small), `decor_planet_1.svg`, `decor_planet_3.svg`, `decor_planet_4.svg`

**Expressive** (Echoes page, emotional sections):
- `decor_lips.svg` (814×548), `decor_eye_in_hand.svg` (hamsa, culturally significant), `decor_flame.svg` (444×654, pink/purple)

**Nature/Growth** (How It Works, progress metaphors):
- `decor_mushroom_1.svg`, `decor_rainbow.svg` (green/yellow arcs)

**Geometric Accents** (section dividers, feature highlights):
- `decor_pink_asterisk.svg`, `decor_salmon_asterisk.svg`, `decor_yellow_asterisk.svg`

**Sparkle/Twinkle** (floating micro-decorations, hover states):
- `decor_twinkle_pink.svg`, `decor_twinkle_salmon.svg`, `decor_twinkle_yellow.svg`

**Abstract Shapes** (subtle section backgrounds):
- `decor_shapes_nuclear_lines.svg`, `decor_shapes_ring_pattern.svg`

**3D Wireframes** (Technology/How It Works, modern/tech feel):
- `decor_wireframes_circle.svg`, `decor_wireframes_diamond.svg` (75KB), `decor_wireframes_donut.svg` (489KB), `decor_wireframes_flower_1.svg`, `decor_wireframes_globe.svg`, `decor_wireframes_pill.svg` (133KB), `decor_wireframes_waves_2.svg`

**Other**:
- `decor_sun2.svg` (alternate sun), `decor_shooting_star.svg` (larger version), `decor_cube_1.svg`, `decor_cube_2.svg`

### Other Public Assets
- `myhayat-logo.png` — Brand logo
- `myhayat_hero.png` — Hero illustration (1MB)
- `myhayat_heart.svg` — Large heart for CTA backgrounds
- `laptop_mockup.png`, `phone_mockup_1.png`, `phone_mockup_2.png` — Device mockups
- `mod1.png` through `mod6.png` — Model/avatar photos for testimonials
- `screen_1/` through `screen_6/` — Screen capture directories
- `My_Hayat_Master_Proposal.md` (99KB) — Full detailed proposal
- `My_Hayat_Master_Proposal_v2.md` (21KB) — Condensed proposal

## Current File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page (276 lines)
│   ├── globals.css         # Design system (212 lines)
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed nav (119 lines)
│   │   └── Footer.tsx      # Footer (110 lines)
│   ├── ui/
│   │   ├── MyHayatButton.tsx   # Button system (50 lines)
│   │   ├── MyHayatCard.tsx     # Card component (42 lines)
│   │   ├── hero-highlight.tsx  # Animated highlight
│   │   └── text-animate.tsx    # Text animations
│   └── visuals/
│       └── DeviceFrame.tsx     # Phone/laptop frames (52 lines)
└── lib/
    └── utils.ts            # cn() utility
```

## Approved MVP Plan (2026-06-12)

### What To Build
1. **Bilingual** (English + Arabic RTL) with language switcher, i18n context + JSON translations
2. **Dark mode** with toggle, persisted to localStorage
3. **10+ Pages**: Home (evolve), About, How It Works, Echoes, Pricing, Blog + articles, Chat Demo, Contact, Privacy Policy
4. **Simulated Chat Demo** — scripted Lebanese Arabic conversations (not real AI), easy to swap for real API later
5. **3-Tier Pricing** — Free / $10 Premium Basic / $20 Premium Plus, framed as "launching soon" with early-bird incentives
6. **Interactive Elements**: Email newsletter (Resend), waitlist signup, social links, WhatsApp group invite, contact form, team/founder section
7. **Primary Audience**: Lebanese people needing mental health support (not investors)

### Execution Order
1. **Phase 1** — Foundation: i18n provider, theme provider, evolve CSS, update layout
2. **Phase 2** — Layout: Navbar (language switcher, dark mode, new links), Footer (newsletter, socials)
3. **Phase 5** (moved up) — Visual assets: catalog SVGs, generate new illustrations
4. **Phase 3** — Pages: Home → About → How It Works → Echoes → Pricing → Chat Demo → Blog → Contact → Privacy
5. **Phase 4** — Interactive: API routes for waitlist, newsletter, contact (all Resend)
6. **Phase 6** — Polish: responsive, RTL, dark mode, build verification

### Files To Create
- `src/lib/i18n.tsx` — Language context provider
- `src/lib/theme.tsx` — Theme context provider
- `src/lib/translations/en.json` — English copy
- `src/lib/translations/ar.json` — Arabic copy
- `src/app/about/page.tsx`
- `src/app/how-it-works/page.tsx`
- `src/app/echoes/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/chat-demo/page.tsx`
- `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/api/waitlist/route.ts`
- `src/app/api/newsletter/route.ts`
- `src/app/api/contact/route.ts`
- Various new UI components (WaitlistForm, ChatBubble, PricingCard, LanguageSwitcher, ThemeToggle, FAQ, TeamCard)

## User Workflow Preferences

1. **Always view in browser BEFORE changes** — capture before screenshots
2. **Compare before/after** with screenshots and recordings after changes
3. **Use ALL SVG assets tastefully** — each must have an intentional role
4. **Don't duplicate** what's already placed
5. **Frequently checkpoint to Mem0** — the user may switch AI models mid-project
6. **Update AGENTS.md** when meaningful state changes happen

## Content Sources

- **Personas**: Aya (22, South Lebanon), Rami (28, Beirut), Samar (35, diaspora) from v2 proposal; Fatima (25), Michel (42), Um Ali (58), Rami (19) from v1
- **Advisory Board**: Dr. Fadi (Psychiatrist, 20yr), Dr. Safia (Psychotherapist, trauma specialist)
- **Chat Scripts**: Panic de-escalation, grief "Echoes" session, grounding exercises — all in Lebanese Arabic in proposals
- **Tone**: Warm, non-judgmental, modest, respectful; uses Lebanese idioms; code-switches Arabic/English
- **System Prompt**: Defined in v2 proposal lines 172-180

## Mem0 Query Guide

To retrieve MyHayat context from Mem0, search with:
- `user_id`: `jq`
- Queries: `"myhayat_new project"`, `"MyHayat checkpoint"`, `"MyHayat SVG assets"`, `"MyHayat approved plan"`
- Filter by `metadata.project_id`: `myhayat_new`

## Progress Tracking

The task tracker is maintained at:
- **Artifact**: `/home/jq/.gemini/antigravity-ide/brain/79caeb89-7955-4a7c-a1b7-f5f07f3abb42/task.md`
- **Implementation Plan**: same directory, `implementation_plan.md`

---

*Last updated: 2026-06-18T00:22Z — Checkpoint 3: Completed Phase D (Education Hub full 30 articles + CBT Worksheets integration) and Phase E (MagicUI Polish: shine-border on cards, animated-gradient-text on Hero H1s, interactive iPhone mockups with Watermelon logo). Ready for next phase of highly creative work.*
