# My Hayat — Final MVP Integration Master Task

This is the execution spec for the final broad My Hayat pass. It deliberately separates research/specification from implementation so the lead coding agent spends its effort on the local working tree, visual execution, integration and verification.

Read these companion briefs first:

1. `docs/myhayat-product-positioning-copy.md`
2. `docs/myhayat-ui-motion-brief.md`
3. `docs/myhayat-lebanese-rosetta-handoff.md`

Those briefs already contain the product/copy research, visual audit direction, and Lebanese Arabizi synthesis. Do not repeat that research unless a concrete implementation question remains unresolved.

---

## 0. Non-negotiable repository safety

The owner’s local `main` is ahead of remote `main` with completed, unpushed Codex/Claude language work. Treat the **local working tree and local commit history as source of truth**.

Before touching code:

```bash
git status --short
git log --oneline --decorate -20
git remote -v
git fetch origin
```

Do NOT:
- reset --hard
- force-push
- overwrite local commits with remote main
- discard unrelated dirty files
- rebase destructively
- reveal secret values

The documentation handoff branch was created from an older remote main and contains **documentation only**. Import only the four docs, not its source tree:

```bash
git fetch origin chatgpt/myhayat-final-handoff-2026-08-20
git checkout origin/chatgpt/myhayat-final-handoff-2026-08-20 -- \
  docs/myhayat-product-positioning-copy.md \
  docs/myhayat-ui-motion-brief.md \
  docs/myhayat-lebanese-rosetta-handoff.md \
  docs/myhayat-final-master-task.md
```

Then inspect the actual local implementation before deciding exact edits.

Known completed local language commits from the owner’s prior run include approximately:

- `c3043a7` — classify Lebanese generation vocabulary
- `bb7d445` — gate all chat responses before display
- `e71542a` — separate Lebanese generation-quality eval
- `5bb51f2` — align language fixtures with current types
- `0073cf0` — route retries across distinct chat models
- `cc7d387` — close safety and validation edge cases
- `9f39fdf` — deterministic RAG boundary eval
- `e2ddb29` — focused Lebanese microgrammar/retry/unknown-form pass

Do not redo these from scratch; verify they are present locally and build on them.

---

## 1. Lead-agent / delegation strategy

The lead agent owns architecture, integration, tricky UI/motion code, conflict resolution, final testing and push.

Delegate token-heavy/read-heavy work aggressively to Antigravity/AG, but avoid edit collisions. Prefer **at most two concurrent subagents**.

Recommended read-only delegation:

### AG worker A — page/content/claims audit

Inspect every non-blog page and produce a compact file at `/tmp/myhayat-final/content-audit.md` containing:
- current page purpose
- current headings/CTAs
- unsupported or gimmicky claims
- which copy from `myhayat-product-positioning-copy.md` maps to each section
- duplicates/repetitive CTAs
- factual/privacy claims requiring verification

Do not rewrite blog/education article bodies.

### AG worker B — visual/responsive audit

Run the local site and use an available browser/DevTools/Playwright path to capture and inspect desktop/mobile states. Produce `/tmp/myhayat-final/visual-audit.md` containing:
- screenshots/paths
- spacing problems
- card/glow problems
- nav breakpoint behavior
- duplicated assets
- animation problems
- specific page-by-page recommendations consistent with `myhayat-ui-motion-brief.md`

If the local **Impeccable** skill exists, use it for critique. If a local **Unslop**/anti-AI writing skill exists, use it for final copy QA only after factual content has been established.

### One CLI availability for AG

The owner has an already-configured `one` CLI that may expose connected services such as GitHub, Vercel, Cloudflare, search/Exa/Firecrawl, Firebase and related tools. If an AG worker needs fresh external state, it may use the existing One CLI.

Do not guess One CLI syntax. Inspect local help/config (`one --help` or existing project configuration) first.

Do not use connectors merely because they exist. Do not make production infrastructure changes from a delegated audit. Never reveal secrets.

Use external search only to verify a concrete factual claim not already covered by the handoff docs.

After implementation, use AG again for a concise read-only adversarial QA pass if useful.

---

## 2. Phase A — truth-aware site-wide content repositioning

Read `docs/myhayat-product-positioning-copy.md` as the primary copy/positioning spec.

Goal: make My Hayat read like a credible serious MVP / hackathon product with a clear thesis, not a gimmicky “bestie” wellness app.

### Product narrative

Borrow Ash’s **product logic**, not its wording:
- purpose-built mental-health behavior differs from a generic assistant
- context/pattern understanding before reflexive advice
- progress and autonomy rather than endless engagement
- safety as a system property
- professional/human support remains part of the real-world ecosystem

My Hayat’s unique wedge is:

**Lebanese-first mental-health support: Arabizi fluency + local cultural context + safety-first conversational design.**

### Claims gate

Do not publish a claim just because the old site already says it.

Before publishing present-tense claims about any of the following, verify evidence in the actual project or owner-provided documentation:
- Dr. Joseph Haddad or any named clinician
- a team of Lebanese mental-health professionals
- clinic-recorded/transcribed therapy sessions
- rights/consent/anonymization for clinical transcripts
- number of clinics/sessions/users
- “first” / “only”
- “94% safer” or any numeric safety outcome
- thousands of users
- end-to-end encryption
- no storage/no training/privacy guarantees
- named advisory board members/affiliations
- exact national therapy price
- production features/pricing not actually live

If not verified, convert to accurate **MVP / roadmap / intended-production** language rather than inventing evidence.

Do not create fake names, fake testimonials, fake clinician affiliations, fake usage statistics or fake clinical data provenance.

### Pages

Rewrite/reshape non-blog site copy across:
- Home
- About
- How It Works
- Echoes
- Pricing / roadmap
- Chat framing
- Contact
- Privacy (only after implementation audit)
- Navbar/footer/CTAs
- Education Hub shell/section framing only; preserve educational article bodies

Use the handoff brief’s proposed hero, differentiators, FAQ, About architecture explanation and anti-slop rules as a starting point, adapting to the actual local layout.

### Lebanon problem framing

Use careful sourceable language: economic instability, conflict/displacement, stigma, accessibility and cultural/language fit are legitimate problem framing. Remove old unverified stat cards if the underlying figures cannot be sourced.

### Testimonials

Do not present synthetic quote cards as real users. Prefer:
- verified consented beta feedback, if it genuinely exists; OR
- clearly labeled design goals / prototype experience principles.

### Pricing

If the $10/$20 tiers and premium capabilities are not actual launch commitments, turn the page into honest MVP/roadmap framing instead of pretending they are live products.

### Clinical terminology

Do not market My Hayat as a licensed mental-health professional, therapist, diagnostic system or treatment provider. “Mental-health support AI / companion / prototype” is acceptable.

---

## 3. Phase B — final Lebanese Arabizi integration

Read `docs/myhayat-lebanese-rosetta-handoff.md`.

Do not re-run a giant linguistic research project.

Integrate the owner-native seed and researched rules conservatively into the **current local language architecture**:
- positive generation patterns
- owner spelling preferences (`shoo`, `mesh`, owner `2/3/7` conventions, `kh` style)
- person/gender consistency
- pragmatic/nonliteral Lebanese realization
- natural English clinical code-switching
- e-like Lebanese vowel tendency only where lexical/phonological evidence supports it; absolutely no global `a -> e`
- small Lebanese-vs-Egyptian negative contrast layer
- simplify when uncertain

If useful and not already represented, add/update a structured Rosetta resource such as `knowledge/lebanese_native_rosetta.md` using statuses:
- OWNER_GOLD
- LEBANESE_CORPUS_VERIFIED
- DERIVED_HIGH_CONFIDENCE
- INPUT_RECOGNITION_ONLY
- NON_LEBANESE
- UNKNOWN_REVIEW

Keep the always-on runtime guide compact. Do not inject the full research file into every turn.

Preserve the current distinct-model retry and pre-send validator. Retry must regenerate from original user intent, not word-replace a broken sentence.

Do not endlessly blacklist every hallucinated token.

---

## 4. Phase C — design-system cleanup before page-specific polish

Read `docs/myhayat-ui-motion-brief.md`.

First capture BEFORE screenshots. This is mandatory.

Then fix the shared system before hand-tuning pages.

### Card/glow system

Refactor the current stacked card effects into one coherent system:
- stable interior at rest
- no bob/tilt on ordinary cards
- no full-card moving rainbow/gradient
- 1–2px edge-only brand glow on hover/focus where appropriate
- no automatic `border-glow-card` animation at rest
- remove/restrict `MagicCard`/mouse-follow spotlight if they cause interior color motion
- maintain brutalist outline + curved brand shadow

Apply consistently to feature cards, FAQ, social-proof/design-goal cards and other generic card primitives.

### Buttons

Physical brutalist interaction:
- small shadow displacement
- thin edge light/sweep on hover where appropriate
- no repeated scale-up gimmick
- stable focus-visible state

### Navbar

Audit intermediate widths, not just desktop/mobile.
- no awkward state where desktop text disappears unexpectedly
- choose deliberate compact/full/hamburger breakpoints based on fit
- simplify overly busy nav-pill fill/arrow interaction
- preserve large mobile tap targets and accessibility

### Section title grammar

Create/reuse one consistent pattern:
- optional eyebrow
- strong display heading
- at most one italic/script accent phrase
- sparkle asset/effect or underline used consistently
- no random one-off title treatments

---

## 5. Phase D — signature motion system

Motion must communicate **space, direction or process** rather than endless pulsing.

Use `transform`/`opacity` primarily and respect `prefers-reduced-motion`.

### Hero shooting star

Owner specifically requested replacing the current hero star with:

`public/decor_shooting_star.svg`

Visually inspect the SVG first. It appears to have a meteor head toward the left/lower side and trails extending right/up, matching movement from ~2 o’clock toward ~8 o’clock.

Create a cleaned derivative if necessary:

`public/decor_shooting_star_clean.svg`

Remove the unrelated standalone X/twinkle only after confirming which path/group it is. Preserve the meteor artwork.

Animate:
- enter from beyond upper-right
- travel on a slight curved diagonal path toward lower-left
- small/faint when far away
- grow/brighter moderately as it approaches
- fade while exiting
- maintain correct artwork orientation
- visible flight ~2–3s with a much longer quiet interval
- subtle trail/afterimage behind/right/up; do not create a laser beam
- reduced-motion fallback static/hidden

### Clouds

Replace tiny in-place drift/pulse with actual viewport traversal.

Use 2–3+ cloud lanes with different scale/depth/speeds:
- far/large/low opacity ~70–100s
- mid ~45–70s
- near ~30–50s

Clouds enter beyond one viewport edge and fully leave the other. Use a coherent prevailing wind per section rather than random directions.

### Additional motion

Select only a few additional site-wide signature motifs from the handoff brief, such as:
- process border-beam handoff through How It Works
- one-time underline/marker draw on section entry
- subtle constellation line connecting twinkles in a dark/night section
- restrained scroll-relative motion of wireframes/asterisks

Do not animate every decoration.

---

## 6. Phase E — asset choreography / requested illustration

Search the CURRENT LOCAL tree for the owner-mentioned illustration; remote main may not match local.

Where the intended content currently uses:

`mom and her daughter are painting a picture.svg`

replace it with:

`/Illustrations/couple lying in a hammock under the stars.svg`

The owner describes the intended location as the globe/hammock illustration near the three early Home cards. If local code differs, use screenshots and context to resolve the intended location rather than blindly replacing every occurrence.

Spacing goal:
- make the illustration larger enough to close the visual gap above/below
- avoid recursively shifting the whole page
- preserve hero viewport dimensions
- no fragile negative-margin overlap on mobile

Across the site, use the existing public SVG/PNG library more intentionally:
- clouds → atmospheric transitions
- twinkles/asterisks → titles/micro-accents
- flowers/cherry blossoms → growth/support sections
- wireframes/cubes → architecture/technology
- human illustrations → connection/daily life
- cosmic/planet assets → language/architecture/vision

Avoid repetitive placement of the same SVG unless deliberately patterned.

---

## 7. Phase F — editorial typography / cohesion

Audit actual locally configured fonts before changing anything.

Keep body typography highly readable. Use display/script typography as accents, not paragraph fonts.

Use:
- display font for large brutalist statements
- italic/script for one key phrase or word
- bold for structural/technical emphasis
- occasional individual brand-colored letters in display text only
- text wrapping around an illustration where it genuinely improves composition
- asymmetric/editorial composition where appropriate instead of turning every section into a 3-column grid

Do not add random fonts/dependencies without licensing/performance justification.

Create deliberate page-background families rather than arbitrary colors:
- Daylight: off-white + pink/yellow wash
- Sunset: salmon/pink high-contrast panel
- Night: warm plum + sparse stars/cosmic graphics
- Calm teal: pale teal technical/safety sections

The design should still look coherent with all animations paused.

---

## 8. Phase G — actual end-to-end chat evaluation

Previous Claude run reported **3/15 raw pass** and only **estimated** ~8–10/15 after validator/retry. Do not estimate this time.

Run ~12 representative prompts through the exact real application path:

`input → language analysis → context → primary model → validator → distinct-model retry if needed → second validation → fallback → final user-visible reply`

Include:
- vague sadness
- university/social anxiety
- work stress + explicit “no breathing exercise”
- loneliness
- family disclosure
- breakup/rumination
- panic attack explanation
- CBT/cognitive distortion explanation
- unknown gender
- mixed English/Arabizi
- Egyptian-attractor prompt
- `ma fhemet shoo 3am t2oul, 7ke absa6`

Do not hardcode test responses.

Report actual final counts:
- FINAL ACCEPTABLE
- EGYPTIAN FINAL LEAKS
- GIBBERISH/INVENTED FINAL
- AGREEMENT ERRORS
- RETRY RECOVERIES
- FALLBACKS

Automation cannot prove native naturalness. Say so.

If remaining failures are clearly the base-model ceiling, stop prompt engineering. Do not build a giant grammar engine.

---

## 9. Phase H — before/after visual QA

Capture AFTER screenshots matching the BEFORE matrix.

Compare:
- Home hero
- feature cards
- hammock illustration spacing
- FAQ
- social-proof/design-goal section
- final CTA
- About
- How It Works
- Echoes
- pricing/roadmap
- chat
- education hub shell
- navbar at all widths
- dark mode

Check 1440 / 1280 / 1024 / 768 / 430 / 390 as appropriate.

Verify:
- no horizontal overflow from moving SVGs
- no card interior rainbow motion
- edge glow is actually edge-only
- clouds traverse rather than pulse
- shooting star crosses correctly
- no repeated/gimmicky CTA language
- no fake testimonials/claims
- nav transition is deliberate
- reduced-motion mode works
- keyboard focus is visible

Use Impeccable locally if present for a final critique; apply only recommendations consistent with the product brief and accessibility.

Use Unslop locally if present for a final copy pass; it must not invent facts or erase the Lebanese/product-specific technical content.

---

## 10. Verification

Run the project’s actual available commands, including at minimum:

```bash
npm test
npx tsc --noEmit
npm run build
git diff --check
```

Also run existing language/generation/safety/RAG eval scripts if present.

Run the project’s existing secret-pattern scan.

Do not expose secret values in logs/chat.

Do not alter deterministic crisis behavior casually.

Do not touch unrelated Cloudflare/Vercel resources.

---

## 11. Commit / push strategy

This is broad enough for logical milestone commits. Suggested boundaries:

1. `feat(language): integrate native Lebanese Rosetta guidance`
2. `content: reposition My Hayat as Lebanese-first mental-health MVP`
3. `feat(ui): unify brutalist cards, navigation and motion system`
4. `fix(ui): responsive and accessibility polish`

Exact commit boundaries may change based on the local tree.

At the end:

```bash
git status
git fetch origin
```

Confirm local `main` contains the owner’s prior completed local commits plus this final work and that origin/main can be updated safely.

Push with a normal fast-forward push only:

```bash
git push origin main
```

NO force push.

If origin/main changed and safe integration is not obvious, STOP and report instead of risking work.

The user authorized the push. The user did **not** authorize manually promoting a Vercel deployment or making unrelated production-infrastructure changes.

If Git integration automatically builds after the push, verify/report the new deployment status if available. Do not manually promote it unless explicitly asked.

---

## 12. Final report — concise only

Return:

```text
LOCAL STARTING HEAD:
IMPORTED HANDOFF DOCS:
DELEGATED AG WORK:

LANGUAGE:
ROSETTA INTEGRATED:
FINAL ACCEPTABLE: X/12
EGYPTIAN FINAL LEAKS:
GIBBERISH FINAL:
AGREEMENT ERRORS:
RETRY RECOVERIES:
FALLBACKS:

CONTENT:
PAGES REWRITTEN:
UNVERIFIED CLAIMS REMOVED/REFRAMED:

UI:
CARD/GLOW SYSTEM:
NAV RESPONSIVE:
SHOOTING STAR:
CLOUD SYSTEM:
ILLUSTRATION SWAP:
TYPOGRAPHY/ASSET SYSTEM:
BEFORE/AFTER SCREENSHOTS:

TESTS:
TYPECHECK:
BUILD:
DIFF CHECK:
SECRET SCAN:

COMMITS:
PUSH:
REMOTE HEAD:
AUTO VERCEL STATUS:
REMAINING MVP LIMITATIONS:
```

Do the work rather than returning another plan.
