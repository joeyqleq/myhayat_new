# My Hayat — UI, Motion & Visual Cohesion Brief

This is a concrete implementation handoff based on the current remote code plus the owner’s latest visual direction. The local working tree may be ahead; always inspect the local code and capture screenshots before editing.

## 1. Visual objective

Keep the existing neo-brutalist/Y2K personality, but make it feel **intentional rather than noisy**.

Target mood:
- warm Lebanese-night-sky / sunrise palette
- bold brutalist outlines and curved shadows
- editorial typography with occasional script/italic accents
- real spatial motion rather than endless pulsing-in-place
- decorative assets used as a visual language, not scattered stickers
- hover effects that live on the **edge** of components, not across their content

The current brand tokens are strong and should remain the base:
- pink `#F85BAA`
- yellow `#FEC810`
- salmon `#F98181`
- off-white `#FFF9FC`
- teal `#5BB8A6`
- lavender `#C4A6E8`
- warm deep-plum dark mode

## 2. Before changing anything

Required workflow:

1. Run the current local app.
2. Capture full-page desktop screenshots at approximately 1440px width of every major page:
   - `/`
   - `/about`
   - `/how-it-works`
   - `/echoes`
   - `/pricing`
   - `/chat`
   - `/education-hub`
   - `/contact` or modal state
   - `/privacy`
3. Capture responsive screenshots around 1024px, 768px, 430px and 390px for Home + Navbar + at least one long content page.
4. Capture hover states for feature cards, FAQ, testimonials, buttons and nav pills.
5. Store before/after screenshots outside production source or in a clearly named local audit directory; do not bloat Git unless existing project workflow expects screenshots.
6. Compare after every major visual phase.

Use Chrome DevTools/Playwright/browser MCP if available. If Impeccable exists locally, use it as a visual critique aid. If an “Unslop”/anti-AI writing skill exists locally, use it after the structural copy rewrite rather than allowing it to invent new facts.

## 3. Known current code problems from remote audit

### MyHayatCard is doing too much

Current `src/components/ui/MyHayatCard.tsx` combines:
- `border-glow-card` on every card
- a mouse-follow radial interior glow
- a second masked border glow
- `MagicCard` gradient
- default `hover:-translate-y-1`
- optional Japanese cube pattern

This stacking is the likely cause of the “thick moving color square/interior” effect the owner dislikes.

### FAQ compounds the problem

Current Home FAQ adds both:
- `animate-tilt`
- `border-glow-card`

on top of `MyHayatCard`-style visual language. This makes the cards animate even when idle and causes the moving color effect to dominate the copy.

### Feature cards move vertically on hover

Current Home feature cards use `hover:-translate-y-2`; owner explicitly wants this removed.

### Clouds barely move

Current `animate-drift` only moves a few pixels in place. The owner wants clouds to **cross the viewport**, at different speeds and scales, like weather layers.

### Shooting star is the wrong asset / wrong motion

Current Home uses `/decor_shoot_star_2.svg` with a tiny `animate-drift` movement. Owner wants `/decor_shooting_star.svg`, whose artwork already implies a meteor head leading toward the lower-left with a tail extending toward the upper-right.

## 4. Unified edge-glow system

Create one reusable hover-edge treatment and use it consistently across cards/buttons/nav where appropriate.

Desired behavior:
- no animation at rest
- 1–2px outer ring, not a 4–12px interior band
- brand-colored conic highlight travels around the perimeter on hover/focus only
- interior remains visually stable
- no mouse-follow “spotlight” unless a specific hero element needs it
- focus-visible should get a stable accessible ring rather than relying on moving color

Implementation direction:
- parent `position: relative; isolation: isolate; overflow: hidden`
- pseudo-element with `inset: -1px` or `-2px`
- `padding: 1px` or `2px`
- conic gradient using pink → yellow → salmon → transparent
- mask to keep only the border ring
- opacity 0 at rest, 1 on `:hover` / `:focus-within`
- rotate via CSS custom angle property or transform on pseudo-element
- do NOT animate the card background

Refactor `MyHayatCard` so the base component does not automatically apply multiple competing glows. Consider props such as:
- `interactive?: boolean`
- `edgeGlow?: boolean`
- `pattern?: ...`

Default card should be stable.

Remove `MagicCard` from ordinary cards if it is the source of interior color motion and provides no unique value after edge-glow refactor.

## 5. Buttons

Buttons should feel physical/brutalist, but restrained.

At rest:
- strong solid fill or off-white fill
- bold 2–3px outline
- curved shadow using brand colors

Hover:
- edge-light sweep or 1–2px perimeter beam
- shadow shifts by 1–2px
- no large scale-up

Active:
- button settles toward its shadow by 1–2px

Do not apply the exact same animation to every CTA. Primary buttons can use edge glow; tertiary text links can use animated underline / arrow shift.

Avoid repeated identical CTA labels on one page.

## 6. Navbar

Current desktop nav hides entirely below `lg`, which explains the owner’s concern when narrowing the browser. The mobile hamburger itself is fine, but the transition point should be deliberate.

Audit real widths with the current number of nav items.

Preferred behavior:
- full nav while it fits comfortably
- compact nav variant before mobile if needed
- hamburger only when actual width requires it
- never allow text to silently disappear while the rest of the desktop navbar remains awkwardly empty

Consider:
- reduce horizontal pill padding at intermediate widths
- move lower-priority items (Pricing/Education/Contact) into a `More` popover before full mobile if needed
- or move breakpoint earlier and make the mobile menu visually intentional

Hover redesign:
- current `PixelHoverPill` slides a full pink panel under the text and adds an arrow, which is visually busy when repeated 8 times
- simplify to an outlined pill with a small directional border sweep / underline / accent dot
- active state should remain obvious without constantly moving

Mobile menu:
- retain hamburger
- use staggered but subtle entry motion
- large readable tap targets
- close on route change and Escape
- maintain correct focus behavior

## 7. Hero shooting star — physical motion spec

Asset: `/decor_shooting_star.svg`

First inspect the SVG visually and determine the meteor head/tail. Remote SVG geometry suggests the star/head is toward the left/lower region while long colored trails extend to the right/upper region, which matches the desired 2-o’clock → 8-o’clock travel direction.

### Clean the asset

The SVG appears to include an additional standalone twinkle/star element. Create a cleaned derivative such as:

`/decor_shooting_star_clean.svg`

Remove only the unrelated static twinkle after confirming it visually. Preserve the meteor head and colored trail art. Do not destructively modify the original asset unless there is a reason.

### Motion path

Hero meteor should:
- originate beyond upper-right edge (~2 o’clock)
- travel diagonally through the hero toward lower-left (~8 o’clock)
- follow a slightly curved ballistic path rather than a perfectly straight line
- use transform + opacity for performance
- start smaller/fainter as if farther away
- become modestly larger/brighter near mid/late path
- fade as it exits
- rotate only if necessary to keep the artwork aligned with the path
- run infrequently, with a long quiet interval rather than looping every few seconds

Suggested timing:
- visible flight 2.2–3.2s
- total loop 12–20s with the star invisible most of the time
- random-looking delay can be approximated with two keyed pauses; true randomness is unnecessary

### Tail / afterimage

The SVG already contains a tail. Add only a subtle motion afterimage if useful:
- 2–3 translucent streak copies or a pseudo-element behind it
- blur increases toward the far tail
- colored from pink/yellow/salmon with low alpha
- must remain behind the meteor head

Do not create a huge laser beam.

### Reduced motion

Under `prefers-reduced-motion: reduce`, remove the cross-screen travel. Either show the cleaned meteor as a static low-opacity decoration or omit it entirely.

## 8. Cloud system — actual traversal

Replace tiny `animate-drift` loops with layered cloud lanes.

Use all three existing clouds and any suitable additional cloud-like SVGs.

Create at least three motion lanes:

1. `cloud-cross-slow` — 70–100s, large, low opacity, farther background
2. `cloud-cross-mid` — 45–70s, medium size
3. `cloud-cross-near` — 30–50s, smaller but slightly more opaque

Alternate directions so not every cloud moves identically, but keep physical logic: most clouds within a section should share the same prevailing wind direction; a different page/section can reverse.

Use `translate3d()` and opacity. Avoid animating `left/right/top` continuously.

Clouds should enter beyond viewport edges and fully exit; they should not visibly snap back.

Use different vertical positions and scales.

Avoid putting moving clouds directly behind dense body text at high opacity.

## 9. Illustration change requested by owner

Search the CURRENT LOCAL tree for:

`mom and her daughter are painting a picture.svg`

Remote main currently uses that asset in Education Hub, while Home currently uses `mom and daughter are going on a trip.svg`; local code may differ.

Where the owner-intended illustration occurs, replace it with:

`/Illustrations/couple lying in a hammock under the stars.svg`

The owner describes the target as the globe-like/hammock illustration beneath the three feature cards.

Spacing requirement:
- increase the illustration itself rather than recursively moving surrounding sections
- visually close the empty gap above and below it
- preserve the current hero/section viewport height and the downstream document flow as much as possible
- do not “fix” one gap by applying negative margins that cause mobile overlap

Use responsive `clamp()` sizing or width constraints and inspect at 1440 / 1024 / 768 / 430.

## 10. Feature cards

For the three Home differentiator cards:
- remove idle/hover vertical translation
- remove full interior moving gradient
- use stable white/warm dark surface
- keep strong brutalist outline/shadow
- edge glow appears only on hover/focus
- icon/illustration can make a very small 2–4° rotation or 3–5px directional movement if it adds personality, but card itself should not bob
- consider alternating shadow colors from the brand palette rather than interior animated effects

Content should come from `docs/myhayat-product-positioning-copy.md`.

## 11. FAQ

- title should simply be `Frequently asked questions`
- use the same sparkle-title grammar as other major section headings, not a bespoke typo-prone title
- remove `animate-tilt`
- remove always-on border rotation
- no Japanese cube pattern spinning/rotating behind answer text
- use an accordion if it improves density, but do not hide all answers if the current design reads better expanded
- hover can brighten a thin edge and shift Q/A marker color
- maintain good keyboard accessibility

## 12. Testimonials / social proof

Current testimonial marquee with avatar/name/location appears fabricated. Content brief recommends replacing it with design principles or verified beta quotes only.

Visual options:
- slow horizontal strip of `design goals` cards without fake identities
- 3 editorial quote blocks with no headshots
- a staggered non-grid composition where one quote is larger and others tuck around it

If marquee remains:
- no interior animated color
- no full-card hover jump
- pause on hover is fine
- obey reduced motion

## 13. Section-title system

Create one reusable section-title language rather than manually varying every page.

Suggested primitives:
- eyebrow / small uppercase label
- primary brutalist heading font
- one italic/script word per major section maximum
- SparklesText or static sparkle SVG around the emphasized word
- optional colored underline/scribble

Not every word needs animation.

Use typography hierarchy, not animation quantity, to create interest.

## 14. Typography

Current project uses heading/body/script fonts already. Keep the brand recognizable but make typography more editorial.

Rules:
- body copy stays highly readable
- Barriecito/Titan-style display font for large punchy words, not long paragraphs
- script font only as an accent (1–4 words), never essential text
- italics for conceptual contrast or humane emphasis
- bold for technical/structural emphasis
- one or two individual letters can use brand-color variation in hero/section display copy, but avoid rainbow text across long sentences
- use `clamp()` typography for responsive sizing
- avoid tiny nav/body text

Do not add random external fonts without checking licensing/performance. Prefer the fonts already bundled/configured unless a clearly superior installed option exists.

## 15. Background cohesion

Current pages use off-white, warm gradients, pink panels, cube patterns, and decorative SVGs somewhat independently. Create a page rhythm:

### Background families

A. **Daylight** — off-white + faint pink/yellow wash
B. **Sunset** — salmon/pink section with high-contrast text
C. **Night** — warm plum + sparse stars/cosmic wireframe
D. **Calm teal** — very pale teal wash for technical/safety content

Move between these deliberately across a page instead of random card-by-card colors.

Use cloud transitions between Daylight/Sunset sections, stars/cosmic assets in Night sections, nature/growth assets around behavioral-growth content, and wireframes around architecture/technology sections.

## 16. Asset choreography

Use the public asset library more broadly, but give each family a role.

- **Clouds:** slow cross-page depth layers
- **Asterisks/twinkles:** title punctuation / hover micro-accent
- **Flowers/cherry blossoms:** growth/support sections; slow sway tied to direction of “wind,” not pulse
- **Planets/globe/wireframes:** architecture, language-system, “built for Lebanon” sections
- **Eye-in-hand/hamsa:** use sparingly; cultural motif, not decoration on every page
- **Flame:** stress/activation or crisis content, but avoid cute treatment of serious crisis copy
- **Cubes/wireframes:** technology/system diagrams
- **Illustrations:** human connection / recovery / daily life

Avoid reusing the exact same SVG three times on one page unless it is a deliberate pattern.

## 17. Additional motion ideas

Use physical movement rather than pulse/fade loops:

### Orbiting annotation labels
For architecture diagrams, small labels can travel a short guided path between pipeline stages and settle, once on scroll into view.

### Sliding underline / marker stroke
Section headings can receive a hand-drawn-looking underline that draws left→right once when entering viewport.

### Parallax-lite asset lanes
Decorative asterisks/wireframes can move 8–20px relative to scroll, but keep amplitude small and disable under reduced motion.

### Constellation connection
On a Night section, 3–5 twinkle SVGs can be connected by a line that draws once, representing “connecting the dots.” This fits the product idea better than generic pulsing.

### Border beam handoff
On a 3-step “How it works” sequence, the edge beam can travel from card 1 → 2 → 3 once on section entry, then stop. This makes the motion tell the process.

### Floating clouds with depth
Different cloud lanes cross the viewport while the content stays fixed; this creates real world-like movement without making the interface itself unstable.

Do not add all of these everywhere. Pick 2–4 signature motifs across the site.

## 18. Contact/form treatment

Owner specifically noted forms/buttons can become repetitive.

- one primary CTA per section
- contact form should be a stable editorial panel, not another glowing gimmick card
- edge glow only on focused input, thin and brand-colored
- submit button can use primary brutalist treatment
- no duplicate “Join Waitlist” immediately above and below the form

## 19. Responsive behavior

Test all long headings, cards and decorations at:
- 1440
- 1280
- 1024
- 768
- 430
- 390

Requirements:
- no decorative SVG should create horizontal overflow
- no moving cloud/star should produce a horizontal scrollbar
- navbar should never partially disappear
- hero remains legible without decoration
- card edge glow remains outside but not clipped incorrectly
- section illustrations should resize without forcing huge empty gaps
- typography accents must not break line-height

## 20. Accessibility & performance

- respect `prefers-reduced-motion`
- animation should primarily use `transform` and `opacity`
- avoid continuously animating expensive blur/filter on dozens of elements
- avoid flashing
- maintain focus-visible states
- decorative images have empty alt text
- meaningful illustrations get concise alt text
- preserve contrast in yellow/pink sections
- test keyboard nav and mobile menu focus

## 21. Definition of done

The redesign should feel cohesive if all animation is paused. Motion is enhancement, not the design itself.

A successful pass should eliminate:
- bobbing/tilting cards
- spinning interior rainbow backgrounds
- tiny in-place cloud drift
- repetitive pulsing
- duplicate CTAs
- fake-looking testimonials
- random SVG repetition
- inconsistent section headings
- breakpoint where desktop nav text vanishes awkwardly

And establish:
- one edge-glow language
- one typography language
- one brand palette system
- 2–4 signature motion motifs with real trajectories
- deliberate asset families per content type
- clear responsive states
- motion-reduced fallback
