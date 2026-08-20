# My Hayat — Lebanese Arabizi Rosetta Handoff

Purpose: reduce the final implementation agent’s research burden. This is a compact, evidence-aware guide for integrating the owner’s native data into the existing language layer without creating another giant brittle dictionary.

## 1. Core conclusion

The remaining quality problem is no longer primarily architecture. The current pipeline already separates recognition/generation, validates output, retries on a distinct model and rejects known Egyptian/hallucinated forms. The remaining failures are mostly a **base-model prior + insufficient positive Lebanese generation structure** problem.

The final pass should strengthen positive generation using:
- owner-native examples as highest authority
- Lebanese-specific morphology / Arabizi research as corroboration
- Beirut-vs-Cairo contrast as negative evidence
- natural code-switching
- conservative derivation rules
- a compact always-on surface guide

Do not build a full Arabic grammar engine.

## 2. Evidence hierarchy

1. `OWNER_GOLD` — forms and constructions manually supplied by the Lebanese owner in this task.
2. `LEBANESE_CORPUS_VERIFIED` — supported by trusted Lebanese-specific research/corpora already reviewed by the project.
3. `DERIVED_HIGH_CONFIDENCE` — inferred from stable owner patterns **and** corroborated by Lebanese morphology/phonology evidence.
4. `INPUT_RECOGNITION_ONLY` — useful to understand user text but unsafe to encourage in generation.
5. `NON_LEBANESE` — high-confidence Egyptian/Gulf/MSA/etc. generation exclusions.
6. `UNKNOWN_REVIEW` — plausible-looking but unverified forms; generated occurrence should remain rejectable.

Never promote a model guess to native gold.

## 3. Research references already selected

Lebanese-specific first:
- Project RBZ: https://tahatobaili.github.io/project-rbz/
- Lebanese Arabizi lexical induction / spelling and morphological variants: https://aclanthology.org/2020.msr-1.5/
- SenZi: https://aclanthology.org/R19-1138/
- Baladi Lebanese morphology: https://aclanthology.org/2022.lrec-1.82/
- Currasat/Baladi portal: https://sina.birzeit.edu/currasat/about-en.html
- MADAR parallel corpus: https://camel.abudhabi.nyu.edu/madar-parallel-corpus/
- Beirut-vs-Cairo MADAR comparison: https://aclanthology.org/2020.lrec-1.508/
- Lebanese LLM / culturally authentic + contrastive data work: https://arxiv.org/abs/2505.00114

Owner-supplied practical references:
- https://spokenarabiconline.com/the-complete-guide-to-the-lebanese-alphabet/
- https://static1.squarespace.com/static/609da268fc15944587c3db3e/t/64519735887ff377126237cb/1683068725693/Lebanese+Arabic+free+sheet+1+-+intro+to+arabizi.pdf

General Arabizi references — use primarily for shared number conventions / negative contrast, not Lebanese gold:
- https://cudoo.com/blog/the-ultimate-guide-to-the-arabizi-language/
- https://kalimah-center.com/arabic-letters-in-numbers/

Important research conclusions:
- Lebanese Arabizi is highly variable in spelling and morphology; recognition should therefore be broader than generation.
- `2`, `3`, `7` are part of the owner’s natural Arabizi system. Do **not** classify `2` for urban-Lebanese historical qaf/glottal realization as Egyptian-only.
- owner prefers `kh` in forms such as `khayif`, `khayfe`, `khaleene`, `khoosooseye`; generic Arabizi `5` mapping does not override owner style.
- Beirut/metropolitan Lebanese has a real conditioned e-like raising tendency in some /aː/ environments. This is **not** permission for a global `a -> e` transformation.
- Lebanese Arabizi naturally code-switches with English/French; keeping common English clinical terms is often more natural than inventing an Arabizi translation.
- contrastive good-vs-bad examples are especially valuable; smaller culturally authentic data can outperform larger non-native/synthetic data.

## 4. Owner annotation semantics

A slash indicates alternatives, often gender/person:

`mta3abak/mta3abik`

This is annotation only. **Slash alternatives must never appear in a user-visible reply.**

Multiple dependent forms may need to change together.

Text in parentheses in the owner’s notes is normally an English gloss/semantic explanation, not output text.

Lines beginning `NOTE` are pragmatic/semantic guidance.

## 5. Owner-native seed

### Work stress

User:

`stress el sheghel 3amye2telne, bas plz ma terja3/terja3e ta3teene temreen el tanafos marra tenye.`

Assistant:

`Meshe. Ma ra7 nam3nol temreen el tanafos. 2elle/2elleele shoo howe el shi li mta3abak/mta3abik bel sheghel?`

User:

`modeere/modeerte bedal/betdal yeb3at/teb3a messaget kel el leil w 3al weekends. Ma be/bet khaleene erte7.`

Owner semantic note: `ma ... khaleene erte7` maps literally toward “doesn’t let me rest” but pragmatically communicates “I feel like I can never switch off.”

Assistant:

`ya3ne ka2ano el 2ossa heye meshklet takhate 7dood mesh meshklet tannafos. Matloob mennak/mennek tred/tredde baraat wa2et el sheghel, aw bet7ess/bet7esse bel zanb iza ma raddet/raddayte?`

### Loneliness

User:

`Sarle fatra b7ess ktir bel we7de, 7atta wa2et ma koon 7awel el 3alam.`

Assistant:

`El shoo3oor bel we7de fi ykoon aswa2 men ma wa7ad/we7de ykoon jasadiyan la7alo. Betkoon/betkoone 7awalen el 3alam bas mafi ayy tawasol ma3 7ada. Hek asdak/asdik?`

Owner note: `Hek asdak/asdik?` is deliberately more compact/informal than a literal translation of “Is that close to what you mean?”

User:

`Meyye bel meyye. Be7ke ma3 el 3alam kel el nhaar, bas ma 7ada bya3rif shi 3anne.`

Owner note: `Meyye bel meyye` literally means “100%” but pragmatically means “Exactly / absolutely.”

Assistant:

`Ya3ne 7atta wa2et ma betkoon/betkoone ma3 3alam, ma bet7ess/bet7esse bel tawasol. 3andak/3andik 7addan btetmanna/btetmanne te7ke ma3o aktar b sara7a?`

### Family disclosure

User:

`Badde 2ool shi mhem la ahle, bas khayif/khayfe men raddet fe3lon.`

Assistant:

`2abel ma tfaker/tfakre shoo baddak/baddik t2ool/t2oole, 2ayya raddet fe3el khayif/khayfe menna 2aktar shi?`

User:

`Aktar shi khayef/khayfe 2enno y3assbo w ykhabro kel el 3ayle.`

Assistant:

`Ya3ne fi mashekel ma3 el khoosooseye. Mesh daroore t2ool/t2oole kel 7ada bnafs el wa2et.`

## 6. High-confidence owner patterns to extract

### Orthography / style

- preferred `shoo`
- preferred `mesh`
- definite article typically `el`
- preposition contractions/frames: `bel`, `3al`, `ma3`, `men`
- owner naturally uses `2` heavily: `2ool`, `2elle`, `2ossa`, `2abel`, `2ayya`, `2enno`, `2aktar`
- owner naturally uses `3` and `7`
- owner uses `kh`, not `5`, for kh sound in generation examples
- code-switch words are not marked as errors

Do not make spelling mirroring higher priority than grammar/meaning.

### Discourse / pragmatic forms

High-value generation anchors:
- `ya3ne`
- `meshe`
- `meyye bel meyye`
- `hek asdak/asdik?`

These demonstrate that the right Lebanese reply is often a pragmatic reformulation rather than literal translation.

### Gender/person pattern evidence

Owner examples include:
- `khayif / khayfe`
- `mta3abak / mta3abik`
- `mennak / mennek`
- `tred / tredde`
- `bet7ess / bet7esse`
- `raddet / raddayte`
- `tfaker / tfakre`
- `baddak / baddik`
- `t2ool / t2oole`
- `asdak / asdik`
- `3andak / 3andik`
- `btetmanna / btetmanne`

These are pattern evidence, not a blind “append e/i” algorithm.

When gender is known, keep dependent forms consistent. When unknown, simplify/rephrase to avoid unnecessary gender marking rather than guessing.

## 7. Positive generation microgrammar priorities

The current surface guide already contains paradigms; audit before adding duplicates.

Keep only high-confidence, heavily useful rules always-on:
- `baddi / baddak / baddik / baddo / badda / baddna / baddkon / baddon`
- `fiyye / fik / fiki / fi / fina / fikon / fiyon` only if already verified by project sources
- progressive `3am + verb`
- future `ra7 / 7a + verb` where verified
- negation frames
- common direct question openers
- person/gender agreement
- possessive/clitic patterns already verified
- one-question-max therapeutic rule where applicable

Never invent broad paradigms from one owner example.

## 8. E-like vowel guidance

Owner explicitly observes an e-like Lebanese tendency and writes many forms accordingly.

Treat it as:
- a phonological/lexical preference when supported
- a clue for evaluating a candidate form
- a source of high-confidence spellings when repeated in owner data or trusted Lebanese sources

Do **not** implement or prompt:

`replace every a with e`

Do not mutate user spelling mechanically.

Prefer a small table of verified forms/examples over a generative phonetic rewrite engine.

## 9. Code-switching policy

Natural Lebanese frame + English technical noun is valid.

Safe common English candidates, context-dependent:
- stress
- anxiety
- panic attack
- depression / depressed
- therapy
- CBT
- DBT
- ACT
- OCD
- ADHD
- PTSD
- burnout
- boundaries
- relationship
- confidence
- presentation
- work
- weekend
- message
- okay
- please / plz

French borrowings like `merci` can remain available if supported by existing language data.

Do not force Arabic equivalents merely to increase “Arabizi percentage.”

Do not allow English to swallow the entire reply on an Arabizi turn.

## 10. Negative contrast layer

Maintain high-confidence non-Lebanese generation exclusions already present, such as:
- `fein / feen`
- `ezzay / ezay`
- `keda`
- `3ayez`
- `e7na`
- `homma`
- `hena`
- `kollohom`

Verify against current lexicon before editing; do not duplicate.

Use MADAR Beirut-vs-Cairo contrast to add only a small number of high-value negative contrasts if they clearly explain recurring model failures.

Do not create a full Egyptian dictionary.

Important: shared Arabizi numeric mappings do not identify dialect by themselves.

## 11. Runtime distillation

The rich Rosetta resource can be larger, but the always-on prompt should contain only:
- owner-preferred orthography anchors
- person/gender consistency rule
- 5–10 microexamples max
- major Egyptian exclusions
- natural code-switch rule
- semantic-not-literal translation rule
- simplify-when-uncertain rule

If uncertain:
1. preserve user meaning
2. shorten sentence
3. use high-confidence Lebanese frame
4. retain English clinical term if safer
5. ask at most one useful question when therapeutic behavior calls for a question

## 12. Retry behavior

A failed generation should be regenerated from the **original user intent**, not repaired by replacing bad tokens in the broken sentence.

Retry instruction should use the actual validator issue category:
- dialect contamination → simpler Lebanese; use verified contrast (e.g. `wen`, not `fein/feen`) where relevant
- unknown form → avoid invented word; use a simpler verified expression or natural English term
- language mismatch → restore current-turn target language
- repetition → rewrite structure, not synonym-swap one phrase
- script mismatch → use the intended script/style

If retry also fails, use existing conservative localized fallback.

## 13. Evaluation

Do not estimate post-gate quality. Run actual end-to-end user path.

Recommended 12-prompt matrix:
1. vague sadness
2. university/social anxiety
3. work stress + “no breathing exercise”
4. loneliness
5. family disclosure
6. breakup/rumination
7. panic attack explanation
8. CBT/cognitive distortion explanation
9. unknown-gender Lebanese turn
10. mixed English/Arabizi
11. prompt likely to attract Egyptian vocabulary
12. `ma fhemet shoo 3am t2oul, 7ke absa6`

Record primary → validation → retry → validation → fallback → final.

Final metrics:
- acceptable final outputs
- Egyptian final leaks
- gibberish/invented final forms
- agreement errors
- retry recoveries
- fallbacks

Automated validation cannot prove “native-sounding Lebanese.” Report that limitation explicitly.

## 14. Stop condition

If the final remaining failures are coherent evidence of the base model’s Lebanese ceiling, stop prompt engineering.

The next serious improvement would require one or more of:
- more native Lebanese conversational examples
- contrastive native bad→good pairs
- fine-tuning / LoRA
- a stronger Lebanese-capable model

That work is outside this final MVP pass.
