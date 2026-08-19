# My Hayat — Product Positioning & Copy Brief

Status: handoff brief for the final MVP pass. This file is intentionally copy-heavy so the implementation agent does not need to re-research or invent marketing language.

## 1. Positioning principle

Borrow the **clarity and product logic** of Ash/talktoash.com, not its wording. Ash positions itself around a purpose-built mental-health model, pattern recognition, progress rather than endless engagement, clinical collaboration, privacy, and a journey that leads back toward real life. My Hayat should use the same *category logic* but own a different wedge:

**Lebanese-first mental-health support: Arabizi fluency + local cultural context + safety-first conversational design.**

The product should sound like a serious prototype with a point of view, not a cute “bestie” app.

### Core one-liner

**My Hayat is a Lebanese-first mental-health support AI built to understand the language people actually use — Arabic, English and Lebanese Arabizi — and help them make sense of what they are feeling without trying to keep them trapped in a chat.**

### Short positioning line

**Understand what’s happening. Find the next step. Get back to your life.**

### Category language

Prefer:
- mental-health support AI
- Lebanese-first mental-health companion
- purpose-built mental-health prototype
- guided reflection
- psychoeducation
- evidence-informed tools
- safety-first conversational system
- Lebanese Arabizi language layer

Avoid unless legally/clinically substantiated:
- AI therapist
- mental-health professional
- treatment
- diagnosis
- clinically proven
- “safer than therapy”
- “94% safer”
- guaranteed outcomes

## 2. Truth / claims gate — non-negotiable

The current remote site contains several claims that are not supported by the repo itself, including “trained on anonymized therapy sessions from Lebanese clinics,” “94% safer,” “thousands of Lebanese users,” fabricated-looking testimonials, and named advisory-board members. Do **not** preserve or strengthen an unverified claim just because it already exists in copy.

### Publish only if documented and true

These may be used as present-tense facts **only if the implementation agent can verify documentary evidence in the repo/local project or the owner explicitly confirms them as real and authorized**:

- collaboration with Dr. Joseph Haddad or any named clinician
- a team of Lebanese mental-health professionals
- training on recordings/transcripts from Lebanese clinics
- consent/rights to use those recordings/transcripts
- anonymization/de-identification protocol
- ethics/IRB or clinic approval where applicable
- exact number of sessions, clinics, users or conversations
- “first” or “only” product claims
- safety percentage claims
- end-to-end encryption
- “we never store X” / “we never train on Y” privacy claims
- production pricing/features not actually live

If the underlying work is planned rather than complete, use **future/pipeline language**:

> “The MVP is being developed toward a clinically reviewed Lebanese training and evaluation pipeline.”

> “The roadmap includes structured review with Lebanese mental-health professionals before production use.”

> “The language layer is being built from native-speaker corrections, Lebanese Arabizi research and carefully filtered public-language data.”

Do not invent clinic names, clinician names, session counts, certifications, affiliations, testimonials or outcome data.

## 3. Source-backed problem framing

Use restrained, sourceable language. Lebanon’s Ministry of Public Health National Mental Health Strategy 2024–2030 explicitly identifies social, economic and political factors as barriers to mental well-being and recovery, and emphasizes awareness, stigma reduction, accessible quality care and culturally relevant support. WHO has described Lebanon’s health system as under pressure from economic crisis, conflict/displacement and repeated shocks. Embrace/WHO literature also documents major personal, social and structural barriers to treatment.

Do not keep the current unsourced homepage/About statistics (74%, 78%, 50%, 8%, $100/session) unless separately verified.

Recommended framing:

> **Lebanon does not have a shortage of reasons to need support. It has a shortage of support that feels reachable.** Years of economic instability, conflict, displacement and daily uncertainty have put enormous pressure on mental health, while cost, stigma, privacy concerns and cultural fit can still make formal care difficult to access.

If a therapy price is desired, either link it to a verifiable current local source or say simply “private therapy can be expensive relative to household income.” Do not publish a guessed national average.

## 4. Home page — proposed information architecture and copy

### Hero badge

`BUILT FOR HOW LEBANON ACTUALLY TALKS`

Alternative shorter badge:

`LEBANESE BY LANGUAGE. MENTAL-HEALTH BY DESIGN.`

### Hero headline

**Talk it through.**  
*Understand what’s underneath.*

Alternative if the design needs a more product-explicit first line:

**Mental-health support, in the language you actually use.**

### Hero subhead

> **My Hayat is a Lebanese-first mental-health support AI built around Arabizi, local context and a safety-first conversation system. Talk in English, Arabic or the messy mix in between. My Hayat helps you understand patterns, learn practical tools and find a useful next step — without pretending to replace a therapist.**

### Hero CTAs

Primary: `Try My Hayat`  
Secondary: `How it works`

Avoid: `See The Vibe`, `Chat in Arabic`, `Is this button made for Lebanon?`, and other novelty CTA copy.

### Three home differentiator cards

#### 1 — Lebanese, not translated

> **Lebanese Arabic is not Modern Standard Arabic with slang sprinkled on top. My Hayat has a dedicated Lebanese Arabizi language layer built from native-speaker corrections, dialect research, contrastive Lebanese-vs-non-Lebanese rules and a generation-quality gate designed to reject obvious Egyptian leakage and invented Arabizi.**

Keep this shorter on the card; move technical details to About/How It Works.

Short card version:

> **A dedicated Lebanese Arabizi layer handles the spelling, code-switching, gender/person agreement and local phrasing generic Arabic models often miss.**

#### 2 — Built to help you move forward

> **My Hayat is not optimized to keep a conversation going forever. It can listen when you need to talk, but its job is to help you understand what is happening, build skills and reconnect with your own decisions and people in your life.**

#### 3 — Safety before fluency

> **High-risk language is handled by a deterministic safety layer before the model gets creative. Ordinary replies are checked before display for language mismatch, reasoning leaks, repetition and known dialect failures, with retry and conservative fallback paths when needed.**

### Optional “What it can help with” strip

Use compact tags rather than another gimmicky card grid:

`anxiety` `overthinking` `sleep` `stress` `grief` `boundaries` `confidence` `family` `relationships` `panic` `mindfulness`

Do not imply diagnosis/treatment.

### Echoes teaser

If Echoes is currently only a concept/unfinished feature, say so.

Headline: **Patterns are easier to see when they stop disappearing.**

Copy:

> **Echoes is the reflection layer in the My Hayat roadmap: a way to notice recurring themes, moods and habits across time without turning your private life into a scoreboard.**

CTA if not live: `Explore the concept` or `See Echoes`.

Do not claim personalized long-term memory is production-ready unless it is.

### Testimonials

Current “community love / thousands of users” cards read as fabricated. For an MVP, use one of these approaches:

A. Replace testimonials with **“What the prototype is designed to feel like”** and 3 short unlabeled experience principles.

B. Use real beta feedback only if it is genuinely sourced and consented.

C. Use clearly labeled synthetic scenarios: `Example scenario — not a user testimonial`.

Preferred MVP replacement section:

**What good support should feel like**

- “It understood what I meant without correcting the way I type.”
- “It asked one useful question instead of giving me a ten-step routine.”
- “It helped me name the pattern, then let me decide what to do.”

These must be labeled as **design goals / prototype principles**, not attributed to fake people.

### FAQ

Standard title: **Frequently asked questions**

Recommended Q&A set:

**Is My Hayat therapy?**  
No. My Hayat is a mental-health support prototype. It can help with reflection, psychoeducation and practical coping tools, but it does not diagnose, treat or replace a licensed professional.

**Why Lebanese Arabizi?**  
Because language is part of the barrier. Many Lebanese conversations naturally move between Arabic, English, French and Arabizi. My Hayat is being built for that reality rather than forcing people into formal Arabic or perfect English.

**What happens if the AI gets the dialect wrong?**  
The language pipeline checks generated replies for known Egyptian leakage, invented or corrupted forms, script mismatches and other quality failures. A failed response is retried on a different model, and repeated failures fall back to conservative wording.

**What happens in a crisis?**  
High-risk messages are handled by deterministic safety logic rather than relying only on a generative model. The product should make clear that it is not an emergency service and should surface current local crisis resources according to the project’s verified safety implementation.

**Is it private?**  
Answer only from the actual current implementation/privacy policy. Do not say end-to-end encrypted, no logging, anonymous, deletable, or never used for training unless those statements are technically true.

### Final home CTA

Do not repeat the hero wording.

Headline: **Try the prototype. Judge the conversation, not the pitch.**

Copy:
> **My Hayat is still an MVP. The useful question is whether a Lebanese person can open it, type naturally, and feel understood enough to keep going.**

Primary CTA: `Open the demo`

If waitlist remains relevant, make it secondary rather than duplicating the same waitlist CTA twice on a page.

## 5. About page — rewrite around “why / how / limits”

### Hero

Badge: `WHY MY HAYAT EXISTS`

Headline:

**Mental-health AI has a language problem.**  
*In Lebanon, that becomes an access problem.*

Lead:

> **My Hayat started with a simple observation: support is less useful when people have to translate themselves before they can ask for it. In Lebanon, that means more than Arabic versus English. Real conversations code-switch, use Arabizi, compress grammar, borrow English and French, and carry family and cultural context that generic assistants routinely flatten.**

### The Lebanon problem

Use an editorial section, not four dubious stat cards.

Suggested copy:

> **Lebanon’s mental-health burden sits on top of years of economic instability, conflict, displacement, political uncertainty and strain on the health system. Formal care also has practical barriers: cost, availability, privacy, stigma and the fear — still real in many families — that asking for psychological help means weakness or illness.**

> **My Hayat is not a substitute for fixing those systems. It is an attempt to make one layer of support easier to reach: private, immediate conversation in familiar language, with a design that points people back toward skills, relationships and professional help when appropriate.**

### “Different by design” — four pillars

1. **Language as infrastructure** — Lebanese Arabizi is a generation system, not a translation toggle.
2. **Clinical structure without pretending to be a clinician** — CBT/DBT/ACT-informed psychoeducation and conversation rules, with explicit boundaries.
3. **Safety outside the model** — deterministic safety classification + model routing + output validation.
4. **Progress over dependency** — listening is allowed; endless engagement is not the objective.

### How the language layer was built

Only assert what is true. Safe baseline copy:

> **The language layer combines native-speaker corrections with Lebanese Arabizi research and deliberately separates “forms we can recognize” from “forms we trust the model to generate.” We use contrastive data to teach the system what *not* to produce — especially common Egyptian and generic-Arabic fallbacks — and a compact Lebanese surface guide for spelling, code-switching, morphology and agreement.**

If the owner can verify the larger corpus claim, add:

> **The research process also filtered tens of thousands of lines of public Lebanese Arabizi from online community corpora and messaging-style data to study recurring spelling and code-switch patterns.**

Do **not** say private WhatsApp conversations were scraped unless that is genuinely true, lawful, consented and documented. Prefer “research corpora / public or consented data.”

### Clinical-development section

Safe current wording unless documentary proof exists:

> **The MVP’s therapeutic behavior is encoded through evidence-informed guidance, safety tests and structured evaluation. The production roadmap is to put that behavior under formal review with Lebanese mental-health professionals before presenting My Hayat as clinically validated.**

If real clinician/clinic collaboration exists, replace this paragraph only after verifying names, permissions, scope and data rights. Never invent the collaboration.

### Architecture — concise, transparent

Use a horizontal/vertical narrative rather than generic tech cards:

`Current message → Safety router → Language analysis → Clinical/context retrieval → LLM router → Lebanese realization guide → Pre-send validator → Retry/fallback → User`

Brief explanation:

- **Safety router:** deterministic recognition of crisis/high-risk language.
- **Language analysis:** current-turn English/Arabic/Arabizi/mixed detection; current turn wins over stale session history.
- **Retrieval:** clinical/context knowledge is retrieved separately from the dialect-realization layer.
- **Model router:** Cloudflare Workers AI model pool with distinct-model retry.
- **Lebanese realization:** compact native surface guide + safe generation vocabulary/contrast rules.
- **Quality gate:** buffers output before display; rejects known dialect contamination, gibberish, script mismatch, prompt/reasoning leakage and repetition.
- **Fallback:** conservative localized response if two model attempts fail.

Do not expose secrets/account IDs or operational credentials.

### Limits

Headline: **What My Hayat still gets wrong**

> **This is a prototype, and Lebanese generation is still the hardest part. Generic foundation models have much stronger training signals for high-resource Arabic varieties than for Lebanese Arabizi. The guardrails catch many failures, but they cannot automatically prove that a sentence sounds native. Native-speaker review remains part of the evaluation loop.**

This honesty is a strength in a hackathon/MVP context.

## 6. How It Works page

Replace “three simple steps to feeling better” with an accurate product flow.

Hero:

**You talk naturally. My Hayat does the translation work internally.**

Steps:

1. **Say it the way you would text it.** Arabic, English, Arabizi, or mixed.
2. **The system figures out what kind of help the moment needs.** Safety, language and context are processed before generation.
3. **The reply is checked before you see it.** Dialect/format/repetition failures trigger another model or a fallback.
4. **The conversation should lead somewhere.** A useful question, clearer pattern, practical tool, or a reason to involve a human.

Replace fake personas with either real consented research personas or clearly label them `Illustrative scenario`.

## 7. Echoes page

Avoid grief-tech gimmicks and especially avoid implying dead-person voice synthesis unless that feature is real, ethically reviewed and intentionally part of the product.

Position Echoes as:

**A reflection layer for patterns over time.**

Copy themes:
- mood/trigger patterns
- journaling
- recurring topics
- behavioral activation / sleep / social connection observations
- user-controlled memory
- privacy controls

If voice cloning of deceased people is not actually an approved feature, remove it from pricing/FAQ.

## 8. Pricing page

For an MVP/hackathon demo, fake-looking $10/$20 production tiers weaken credibility.

Preferred:
- `Prototype — free demo`
- `Planned MVP — core chat + safety + language layer`
- optional `Roadmap` section instead of pricing tiers

If actual pricing strategy is needed, label it **illustrative / planned**, not live.

Do not promise unlimited session history, therapist directory, WhatsApp calls, voice synthesis or community groups if not implemented.

## 9. Chat page

The live chat is now the strongest proof of the product. Keep surrounding copy minimal.

Header: **My Hayat**
Subline: `Lebanese-first mental-health support prototype`

Persistent small disclaimer:
`AI support, not therapy or emergency care.`

Do not bury the product in marketing paragraphs before the chat.

## 10. Education Hub / Blog

User request: keep existing articles/content unless factual corrections are necessary.

Do not rewrite the actual educational articles in this pass. Only unify:
- page titles
- CTA language
- section typography
- cards / hover effects
- navigation and footer

## 11. Contact

Headline: **Talk to the project**

Copy:
`Feedback, clinical collaboration, research, partnerships, or a bug you found — send it here.`

Avoid “we’d love to hear from you!” filler.

## 12. Privacy

Privacy copy must be implementation-led, not aspirational. Audit the actual chat/session storage, Vercel/Cloudflare logging, D1/Vectorize usage and forms before rewriting.

Never claim HIPAA/GDPR compliance merely because the design is “inspired” by those principles.

## 13. Voice / anti-slop rules

Across every non-blog page:

- no “journey” unless there is a concrete reason
- no “safe space” as generic filler
- no “your bestie”
- no “you’ve got this”
- no “made with love and resilience” footer cliché
- no excessive exclamation marks
- no emoji as substitute for copy
- no fake user quotes
- no “revolutionary / game-changing / groundbreaking”
- no “empower / unlock / transform” unless the sentence says what actually changes
- no repeated “private, safe, culturally attuned, always there” phrasing across sections
- prefer short declarative sentences
- use contractions naturally
- allow occasional Lebanese phrasing only when it serves meaning rather than branding cosplay

## 14. Ash-derived product principles worth adapting

Do not copy Ash copy. Adapt these principles:

- purpose-built mental-health behavior is different from a generic assistant
- the model should gather context before jumping to interventions
- it should be able to challenge/clarify rather than reflexively validate
- it should not optimize for endless engagement
- it should strengthen autonomy/competence/real-world connection rather than dependency
- safety is a system property, not one crisis paragraph in a prompt
- privacy claims should be explicit and technically true
- product limitations should be visible

My Hayat’s unique extension is **Lebanese language/culture as an engineering layer**, not just a persona.
