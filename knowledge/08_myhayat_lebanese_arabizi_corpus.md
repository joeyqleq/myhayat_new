# MyHayat Lebanese Arabizi Conversation Corpus

**Version:** 1.0  
**Curated:** 2026-07-27  
**Purpose:** Retrieval corpus for understanding Lebanese Arabizi, English–Arabizi code-switching, and producing warm everyday Lebanese responses in a mental-health support context.

> This is a language and response-style resource, not a diagnostic glossary. A phrase may signal distress without proving a condition. MyHayat must understand a wider register than it speaks: profanity, insults, fatalistic jokes, and risky expressions are often **recognize-only**.

---

## 1. Assistant behavior contract

1. **Understand first.** Normalize spelling variants internally, but do not correct the user's Arabizi.
2. **Match lightly.** Reply in a readable version of the user's language mix. If the user writes mostly English with a few Arabizi words, do the same. If they write dense Arabizi, increase Arabizi gradually.
3. **Keep Lebanese warmth, not caricature.** Natural particles such as `ya3ne`, `bas`, `shway`, and `yalla` can help. Do not stuff every sentence with slang.
4. **Preserve the user's chosen clinical word.** If they say `panic`, `anxiety`, `burnout`, or `therapy`, do not force an Arabic translation.
5. **Do not diagnose.** `ze3len`, `mdayya2`, `ma5nou2`, or `ta3ban` describe broad states and do not by themselves mean depression, anxiety, or another disorder.
6. **Do not mirror abuse.** Understand strong profanity and slurs, but answer without repeating them.
7. **Treat ambiguity safely.** Chest pain, trouble breathing, self-harm language, and death language require contextual clarification. Do not assume they are only metaphors or only medical symptoms.
8. **Use consent-based support.** Acknowledge → normalize without minimizing → offer one small step → ask consent → guide → check in.
9. **Use religion only when invited.** Phrases such as `inshallah`, `ya rab`, or prayer-based reassurance may fit when the user uses that frame. Never presume belief.
10. **No fake intimacy.** Warmth is welcome; repeated `habibi/habibti`, pet names, or romantic language can feel patronizing or boundary-crossing.

### Recommended response length

- High distress: 1–4 short sentences, one step at a time.
- Everyday check-in: 2–6 sentences.
- Exercise: ask permission first, then give one instruction per line.
- Crisis or possible imminent danger: direct, calm, non-euphemistic safety questions and the current crisis-policy path.

---

## 2. Evidence and confidence labels

| Label | Meaning |
|---|---|
| `BASE` | Preserved or corrected from MyHayat's existing Lebanese language guides and proposal. |
| `LD` | Cherry-picked from LebaneseDictionary.com's public 2,884-entry TSV and converted from academic transliteration to everyday Arabizi. |
| `RL` | Observed as an aggregate token or phrase in the local r/lebanon corpus. No usernames or quotations were retained. |
| `CURATED` | A deliberately written MyHayat response form; naturalness should be reviewed by Lebanese speakers and clinicians. |
| `A` | Strong: supported by multiple sources or substantial corpus evidence. |
| `B` | Useful: linguistically sound but lower-frequency, spelling-variable, or primarily source-derived. |
| `R` | Recognize-only: understand the intent/register; do not normally generate it. |

The `RL` counts in this document are raw occurrences, not unique speakers and not endorsements of a phrase.

---

## 3. Corpus evidence snapshot

### Local Reddit archive

| Source | Records | UTC coverage | Notes |
|---|---:|---|---|
| r/lebanon comments | 846,448 | 2022-10-18 to 2024-10-22 | 45,201 removed/deleted records detected. |
| r/lebanon posts | 85,463 | 2022-10-18 to 2026-07-27 | 21,140 removed/deleted records detected. |
| **Combined** | **931,911** | **2022-10-18 to 2026-07-27** | Zero malformed JSON lines. |

- 101,552 records met the broad Arabizi-candidate rule.
- 27,241 records met the English–Arabizi code-switch candidate rule.
- Direct SHA-256 verification found that `r_lebanon_comments.jsonl` and `r_lebanon_comments.jsonl.crswap` both hash to `f971b45f6534bebb4ca138b922b5a8e0e1ace5c11514383e11127a85eab64f9f`; the `.crswap` copy was excluded to prevent double counting.
- Extraction emitted aggregate counts only. It retained no author, ID, permalink, or raw message.
- A spelling absent from the counts is not necessarily invalid; no-digit Arabizi is harder to identify automatically.

### High-signal Reddit spelling anchors

| Cluster | Observed variants and raw occurrences | Preferred readable form |
|---|---|---|
| what | `shu` 3,594; `shou` 1,688; `chou` 864; `sho` 761 | Mirror the user; default `shu` or `shou`. |
| not | `mesh` 1,948; `mish` 1,192; `mech` 399 | Mirror; default `mish` or `mesh`. |
| very/a lot | `ktir` 1,709; `kteer` 317 | `ktir` or `kteer`. |
| how | `kif` 1,216; `keef` 218 | `kif`. |
| where | `wen` 1,173; `wein` 175; `wayn` 51 | `wen` or `wein`. |
| now | `hala2` 820; `halla2` 645; `hl2` 235; `hal2` 29 | `hala2` or mirror. |
| I want | `bade` 516; `badde` 354; `baddi` 74; `bedde` 49 | Mirror; default `baddi`/`badde`. |
| with | `ma3` 1,666; `ma3ak` 580; `ma3ik` 26 | `ma3`, with gendered suffix only when known. |
| I mean | `ya3ne` 1,343; `y3ne` 193; `ya3ni` 184; `ye3ne` 158 | `ya3ne`. |
| progressive aspect | `3am` 4,203 | `3am`. |
| future | `7a` 1,022; `ra7` 624 | `ra7` is especially readable. |
| because/no | `la2an` 600; `la2` 963 | Keep `2` for the glottal stop. |
| if | `eza` 2,819; `iza` 1,951 | Mirror; default `eza`. |
| but/only | `bas` 8,164; `bass` 1,829 | `bas`. |
| like this | `hek` 3,504; `heik` 308 | `hek`. |
| good/well | `mni7` 187; `mnih` 177; `mne7` 44 | Mirror; default `mnih` or `mni7`. |

False positives such as ordinal numbers, product models, decade labels, and encoding fragments were rejected during curation.

---

## 4. Arabizi sound and spelling system

Arabizi has no single official spelling. The same speaker may change spellings within one message.

### 4.1 Number and digraph map

| Arabizi | Arabic sound | Common alternatives | Examples |
|---|---|---|---|
| `2` | ء and Lebanese ق pronounced as a glottal stop | apostrophe, omitted | `la2` (no), `wa2et` (time), `2albe` (my heart) |
| `3` | ع | `aa`, apostrophe, omitted | `3am`, `ma3`, `ta3ban` |
| `3'` | غ | `gh`, sometimes `8` | `ghayr/8er` (other/except) |
| `5` | خ | `kh`, `7'` | `5aye/khayye` (my brother), `5of/khof` (fear) |
| `6` | ط | plain `t` | `6aleb/taleb` |
| `6'` | ظ | `z`, `dh` | uncommon in casual Lebanese typing |
| `7` | ح | plain `h` | `7ada` (someone), `7ake/7eke` (talk) |
| `8` | غ or ق in some personal/regional systems | `gh`, `2` | Treat as user-specific; infer from known words. |
| `9` | ص | plain `s` | less frequent in Lebanese casual typing |
| `9'` | ض | plain `d` | less frequent in Lebanese casual typing |
| `sh` | ش | `ch` in French-influenced spelling | `shu/shou/chou` |
| `kh` | خ | `5` | `khof/5of` |
| `gh` | غ | `8`, `3'` | `ghayran/8ayran` |

### 4.2 Academic transliteration from LebaneseDictionary.com

Convert source pronunciation for internal normalization:

| Source symbol | Everyday Arabizi |
|---|---|
| `ʕ` | `3` |
| `ʔ` | `2` |
| `ḥ` | `7` |
| `š` | `sh` |
| `ẖ` or `ḫ` | `kh` or `5` |
| `ġ` | `gh` or user-specific `8` |
| `ǧ` | `j` |
| `ṭ`, `ṣ`, `ḍ`, `ẓ` | usually plain `t`, `s`, `d`, `z` in casual output |
| `ā`, `ē`, `ī`, `ō`, `ū` | `a/aa`, `e/ay`, `i/ee`, `o`, `u/oo`; mirror the user |

Do not expose academic symbols such as `ʕ`, `ḥ`, or `š` in a normal chat reply unless the user asks about pronunciation.

### 4.3 Normalization rules

- Treat repeated vowels as stylistic: `kteer`, `ktir`, and `kter` share a lemma.
- Treat doubled consonants as optional: `bas/bass`, `halla2/hala2`.
- Treat French-influenced `ch` and English-influenced `sh` as equivalents where context supports it.
- Allow attached articles and prepositions: `bel/bil/b el`, `3al/3a el`, `lal/la el`.
- Allow clitic attachment: `ma3ak`, `3andak`, `2eltellak`, `b7ebbak`.
- Do not normalize ordinary numbers or model names into Arabic sounds without lexical context.
- Preserve the user's casing and punctuation only loosely; emotional capitalization is a signal, not a spelling rule.

### 4.4 Accent, region, generation, and diaspora variation

- **Urban/coastal glottal stop:** Lebanese ق is often pronounced as a glottal stop and written `2`, as in `wa2et`, `2albe`, and `tari2`. Some speakers keep `q`, omit the consonant, or use another spelling. Mirror rather than “fix.”
- **French-influenced spelling:** `chou/shou`, `merci`, `pardon`, and vowel-heavy spellings are common for some speakers. `ch` and `sh` can represent the same sound.
- **English-influenced spelling:** `shu`, English mental-health terms, abbreviations, and fewer diacritics/numerals are common in English-heavy and diaspora messages.
- **Vowel movement:** `kif/keef`, `wen/wein/wayn`, `mnih/mne7`, and `shu/shou` often differ without changing the lemma.
- **Number preference:** Some users write `3am`, `ma3ak`, and `ra7`; others write mostly letters and use numbers only for a few sounds. Match density lightly.
- **Age and platform:** Reddit is not a proxy for every age group. Older speakers, Arabic-script-first users, rural speakers, and people with less English/French exposure may use different forms.
- **Regional labels are sparse:** Of the 2,884 LebaneseDictionary.com rows, only 89 had a Lebanese regional label (coastal, Beiruti, southern, northern, or Mount Lebanon). Do not build a regional persona from this thin field.
- **Never infer sect, politics, class, or exact location from spelling.** Accent adaptation should improve comprehension, not profile the user.

---

## 5. Lebanese grammar building blocks

### 5.1 Pronouns

| English | Canonical Arabizi | Common variants | Arabic |
|---|---|---|---|
| I | `ana` | `ene` | أنا |
| you, masculine | `enta` | `inta` | إنتَ |
| you, feminine | `ente` | `inti` | إنتِ |
| he | `huwwe` | `howwe`, `huwi` | هوّي |
| she | `hiyye` | `hiyyi` | هيّي |
| we | `ne7na` | `nehna`, `ni7na` | نحنا |
| you, plural | `ento` | `entou` | إنتو |
| they | `henne` | `hinne` | هنّي |

When gender is unknown, avoid forcing `enta/ente`. Prefer a neutral construction such as `mbayyan 2addesh hal shi mta3bak` (“it shows how exhausting this is for you”).

### 5.2 Question words

| English | Arabizi cluster | Arabic | Example intent |
|---|---|---|---|
| what | `shu/shou/sho/chou` | شو | `shu sar?` — what happened? |
| how | `kif/keef` | كيف | `kif 7essak hala2?` — how do you feel now? |
| why | `leh/leish` | ليه/ليش | Ask gently; repeated “why” can sound blaming. |
| where | `wen/wein/wayn` | وين | `wen 7essit hal waja3?` |
| when | `emta/imta` | إمتى | `emta ballash?` |
| who | `meen/min` | مين | Infer `min` carefully because it can also mean “from.” |
| how much | `adde/2adde` | قدّي | intensity, quantity, or price |
| which | `ayya` | أيّا | choice |
| what is wrong/what is there | `shu fi?` | شو في؟ | Can be caring or abrupt; soften with context. |

### 5.3 Demonstratives

| English | Arabizi cluster | Arabic | Evidence / note |
|---|---|---|---|
| this, masculine | `hayda` | هيدا | 1,338 verified occurrences; A |
| this, feminine | `hayde/haydi` | هيدي | `hayde` had 426 verified occurrences; A |
| these | `hol/hawde` | هول/هودي | Mirror the user's form; B |
| that, masculine | `haydak` | هيداك | B |
| that, feminine | `haydik` | هيديك | B |

### 5.4 Core operators

| Function | Arabizi | Meaning and use |
|---|---|---|
| present/progressive | `3am + verb` | `3am 7ess...` — I am feeling… |
| future | `ra7/7a + verb` | `ra7 njarrib` — we will try |
| past “was” | `ken/kenet` | gender/context sensitive |
| become/happen | `sar` | `shu sar?`; `sar fi...` |
| still/yet/after | `ba3d/ba3ed` | `ba3dak ta3ban?` |
| no longer/enough transition | `ba2a` | `ma ba2 2der` — I cannot anymore |
| want | `baddi/badde/bade/bedde` | suffix changes by person: `baddak`, `baddik`, `baddo` |
| can | `fiyye/fik/fina` | `fina njarrib?` — can we try? |
| must/need to | `lezem/lazem` | Avoid sounding commanding in support replies. |
| possible/maybe | `mumkin/momken`, `barke`, `yimkin` | Keep uncertainty explicit. |
| because | `la2an/la2ano` | `la2an` + clause |
| if | `eza/iza` | Useful for consent: `eza baddak...` |
| but/only | `bas/bass` | Context determines “but” versus “only.” |

### 5.5 Negation

| Pattern | Meaning | Example |
|---|---|---|
| `ma + verb` | verbal negation | `ma ba3ref` — I do not know |
| `mish/mesh + noun/adjective` | “is not” | `mish mnih` — not okay/well |
| `ma fi` | there is no / cannot | context decides |
| `wala` | not even / nor | often intensifies negation |
| `ma... ba2a` | no longer / cannot anymore | may mark exhaustion or risk |

Do not erase double negatives mechanically. They can carry emphasis in colloquial speech.

### 5.6 Attached pronouns and prepositions

| Form | Meaning |
|---|---|
| `ma3e / ma3ak / ma3ik / ma3o / ma3a / ma3na / ma3on` | with me/you/him/her/us/them |
| `3ande / 3andak / 3andik / 3ando / 3anda` | I/you/he/she has; at my/your/his/her place |
| `2elle / 2ellak / 2ellik / 2ello / 2ella` | tell me/you/him/her, depending structure |
| `7ale / 7alak / 7alik / 7alo / 7ala` | myself/yourself/himself/herself |
| `-ne/-ni, -ak/-ik, -o/-a, -na, -on` | object or possessive suffixes |

### 5.7 Gender and number

Common emotional adjectives change:

| Masculine | Feminine | Meaning |
|---|---|---|
| `ta3ban/te3ban` | `ta3bene/te3bene` | tired |
| `ze3len` | `ze3lene` | upset/sad |
| `khayef` | `khayfe` | afraid |
| `mabsout` | `mabsouta` | happy/comfortable |
| `m3assab` | `m3assbe` | angry |
| `daye3` | `day3a` | lost/confused |

If the user's gender is not known, restructure instead of guessing: `hal shi mta3eb` rather than `enta ta3ban`.

---

## 6. Everyday conversation dictionary

### 6.1 Greetings, politeness, and discourse

| English intent | Canonical Arabizi | Variants | Arabic | Evidence / usage |
|---|---|---|---|---|
| hello | `mar7aba` | `marhaba`, `ahla` | مرحبا/أهلا | `LD+RL`, A |
| good morning | `saba7 el kheir` | `saba7o` | صباح الخير | `LD`, B |
| good evening | `masa el kheir` | `masa l kheir` | مسا الخير | `LD`, B |
| how are you? m/f/pl | `kifak? / kifik? / kifkon?` | `keefak` | كيفك؟ | `RL`, A |
| welcome | `ahla w sahla` | `ahlein` | أهلا وسهلا | `BASE`, A |
| yes | `eh` | `ee`, `2e` | إيه | `LD+RL`, A |
| no | `la2` | `laa` | لأ | `LD+RL`, A |
| okay | `okay` | `ok`, `tayyib` | أوكي/طيّب | `LD+RL`, A |
| please | `please` | `plz`, `dakhlak/dakhlik`, `3moul ma3rouf` | دخلك/اعمل معروف | Match register; do not overuse gendered forms. |
| thank you | `merci` | `mersi`, `shukran` | مرسي/شكرا | Trilingual, A |
| you're welcome | `tekram/tekrami` | `ahlan` | تكرم/تكرمي | `RL`, B; gender-sensitive |
| sorry | `sorry` | `asef/asfe` | آسف/آسفة | Code-switching is natural. |
| excuse me | `law sama7t` | `pardon` | لو سمحت | B |
| I mean | `ya3ne` | `ya3ni`, `y3ne` | يعني | `RL`, A |
| honestly | `sara7a` | `bi sara7a` | صراحة | `RL`, A |
| really | `3anjad` | `3an jad` | عنجد | `RL`, A |
| of course | `akid` | `akeed` | أكيد | `RL`, A |
| maybe | `barke` | `yimkin`, `mumkin` | بركي/يمكن | `LD+RL`, A |
| enough | `khalas` | `kafeye` | خلص/كفاية | Can mark a boundary or severe exhaustion. |
| come on/let's | `yalla` | — | يلا | Warm prompt; avoid when user feels pressured. |
| well/so | `tayyib` | `tab` | طيّب | Conversation organizer. |
| look/listen | `shouf/shoufe` | `sma3/sma3e` | شوف/اسمع | Can sound directive; soften in support. |
| man/bro | `ya zalame` | `ya khayye`, `bro` | يا زلمة/يا خيي | Familiar; do not assume every user likes it. |
| dear/darling | `habibi/habibti` | `hbb` | حبيبي/حبيبتي | Often warm or sarcastic; use sparingly. |
| no problem | `ma fi meshkle` | `wala yhemmak/yhemmik` | ما في مشكلة | B |
| take your time | `khod/khde wa2tak` | `3a mahlak/mahlik` | خد وقتك/ع مهلك | `CURATED`, B |

### 6.2 People and relationships

| English | Arabizi | Variants | Arabic | Evidence / note |
|---|---|---|---|---|
| family | `3ayle` | `3ayleh` | عيلة | `LD`, A |
| mother | `emm` | `immi` (my mother) | إم | `LD`, A |
| father | `bayy` | `bayye` (my father) | بيّ | `LD`, A |
| parents/family household | `ahle` | `el ahl` | أهلي/الأهل | Context-sensitive. |
| brother | `khayy` | `5aye`, `khayye` | خيّ | `LD+RL`, A |
| sister | `ekht` | `2ekht`, `okht` | أخت | `LD`, B |
| child/boy | `walad` | — | ولد | `LD`, A |
| girl/daughter | `bint` | — | بنت | A |
| friend | `rfi2` | `rfiq`, `sadi2` | رفيق | `LD`, A |
| partner | `shrik/shrike` | — | شريك/شريكة | `LD`, B |
| husband | `jawz` | `zawj` | جوز/زوج | B |
| wife | `marte` (my wife) | `zawje` | مرتي/زوجة | B |
| people | `3alam` | `nes` | عالم/ناس | `RL`, A |
| someone | `7ada` | `7adan` | حدا | `RL`, A |
| nobody | `ma 7ada` | `wala 7ada` | ما حدا | A |
| myself/alone | `la7ale` | `la7ali`, `la 7ale` | لحالي | Do not equate automatically with loneliness. |

### 6.3 Time, place, and quantity

| English | Arabizi | Variants | Arabic | Evidence |
|---|---|---|---|---|
| now | `hala2` | `halla2`, `hal2` | هلّق | `LD+RL`, A |
| today | `el yom` | `lyom` | اليوم | `LD`, A |
| tomorrow | `bokra` | `bukra` | بكرا | `LD`, A |
| yesterday | `mbere7` | `mbare7` | مبارح | `LD`, A |
| morning | `sobe7` | `sobo7` | صبح | `LD`, B |
| night | `lel` | `leil` | ليل | `LD`, A |
| time | `wa2et` | `wa2t` | وقت | `LD+RL`, A |
| hour | `se3a` | `sa3a` | ساعة | `RL`, A |
| a little | `shway` | `chway`, `shwe` | شوي | `LD`, A |
| little by little | `shway shway` | — | شوي شوي | `LD+BASE`, A |
| a lot/very | `ktir` | `kteer`, `kter` | كتير | `RL`, A |
| here | `hon` | `hawn` | هون | `LD`, A |
| there | `honik` | `hnik` | هونيك | `LD`, B |
| inside | `jowwa` | `juwwa` | جوّا | `LD`, A |
| outside | `barra` | — | برّا | `LD`, A |
| home/house | `beit` | `bet` | بيت | `LD`, A |
| above | `fo2` | — | فوق | `RL`, A |
| before | `2abel` | `abl` | قبل | `RL`, A |
| after/later | `ba3den` | `ba3d`, `ba3ed` | بعدين/بعد | `RL`, A |
| again | `marra tenye` | — | مرة تانية | `LD`, A |

### 6.4 Core actions and needs

| English intent | Arabizi | Variants | Arabic | Note |
|---|---|---|---|---|
| want | `baddi` | `badde`, `bade`, `bedde` | بدّي | `LD+RL`, A |
| need | `b7tej` | `lezemne` (“I need”) | بحتاج/لازمني | Prefer `b7tej` when the meaning must be unambiguous. |
| can | `fiyye/fik/fina` | — | فيّي/فيك/فينا | A |
| cannot | `ma fiyye`, `ma b2dar` | `mish 2ader` | ما فيّي/ما بقدر | Distress intensity depends on context. |
| know | `ba3ref` | `ba3rif` | بعرف | `LD+RL`, A |
| understand | `befham` | `fehem/fhem` | بفهم/فهم | `LD+RL`, A |
| think | `bfakker` | `fakker` | بفكّر | `LD`, A |
| feel | `b7ess` | `7ess`, `3am 7ess` | بحسّ | `LD`, A |
| say | `2oul` | `oul`, `2al` | قول/قال | A |
| talk | `e7ke` | `ehke`, `7ke`, `7eke` | إحكي/حكي | `LD+RL`, A |
| listen | `esma3` | `sma3` | إسمع | `LD+RL`, A |
| help | `se3ed` | `sa3ed`, `sa3ad` | ساعد | `LD+RL`, B |
| try | `jarrib` | `jarreb` | جرّب | `LD`, A |
| start | `ballish` | `ballesh` | بلّش | `LD`, A |
| continue | `kammil` | `kaffe` | كمّل/كفّي | A |
| stop | `wa22ef` | `wa2ef` | وقّف | `LD`, A |
| wait | `ntor` | `ntor shway` | نطر | `LD`, A |
| go | `rou7` | `ra7` (went/future can differ) | روح | `LD+RL`, A |
| come | `ta3a/ta3e` | `eja` (came) | تعا/تعي | Gender-sensitive. |
| stay | `dall` | `ba2e` | ضلّ/بقي | A |
| sit | `2o3od` | `o2od` | اقعد | `LD`, B |
| eat | `kol` | `akal` (ate) | كول/أكل | A |
| drink | `eshrab` | `sherib` (drank) | إشرب/شرب | A |
| sleep | `nem` | `nom` (sleep, noun) | نام/نوم | `LD`, A |
| wake up | `fi2` | `fe2` | فيق | `LD`, B |
| rest | `rte7` | `erte7` | ارتاح | `LD+RL`, A |
| breathe | `tnaffas` | `ntaffas` | تنفّس | `LD`, A |

---

## 7. Emotions, distress, and somatic language

### 7.1 Core emotional vocabulary

| State | Canonical Arabizi | Variants | Arabic | Nuance and response guidance |
|---|---|---|---|---|
| happy/comfortable | `mabsout` | `mabsouta` | مبسوط/ة | Broad positive state; `LD`, A |
| excited/enjoying it | `mkayyaf` | `mkayaf` | مكيّف | Informal; context can change meaning. |
| sad/upset | `ze3len` | `za3len`, `ze3lene` | زعلان/ة | Often situational hurt, not clinical depression. |
| sad, formal | `7azin` | `7azine` | حزين/ة | More formal/literary than `ze3len`. |
| distressed/upset | `mdayya2` | `mdaye2`, `daye2` | مضايق/ضايق | Broad distress; ask what it means for this user. |
| angry | `m3assab` | `m3asab`, `m3assbe` | معصّب/ة | Can also imply agitation. |
| irritated | `mnakraz` | — | منكرز | Informal, situational. |
| afraid | `khayef` | `kheyfen`, `khayfe` | خايف/ة | `LD+RL`, A |
| fear | `khof` | `5of` | خوف | `LD+RL`, A |
| worried/anxious | `2al2an` | `ala2an`, `hal2an` | قلقان | Do not label a disorder from the adjective. |
| carrying worry | `3etel hamm` | `sheyel hamm` | عتل/شايل همّ | Idiomatic worry; `LD`, B |
| tired | `ta3ban` | `te3ban`, feminine `ta3bene` | تعبان/ة | Physical, emotional, or both. |
| exhausted/burned out | `mdahdak` | `mestwe`, `burnout` | مدهدك/مستوي | `LD`, B |
| bored/fed up | `zeh2an` | `zah2an` | زهقان | Can range from boredom to frustration. |
| confused/lost | `daye3` | `dai3`, feminine `day3a` | ضايع/ة | `LD+RL`, A |
| alone | `la7ale` | `la7ali` | لحالي | Physical aloneness; ask before inferring loneliness. |
| lonely | `wa7dan` | `7ases 7ale wa7id` | وحدان | English `lonely` is common in code-switching. |
| ashamed | `mest7e` | `3aybene` | مستحي/عيبانة | Distinguish shyness, shame, and guilt. |
| guilty | `7ases bil zanb` | `7ases 7ale ghaltan` | حاسس بالذنب | English `guilty` may be more natural. |
| jealous | `ghayran` | `8ayran` | غيران | `LD`, B |
| hopeful | `3ande 2amal` | `fi 2amal` | عندي أمل | `LD`, A |
| hopeless | `ma fi 2amal` | English `hopeless` | ما في أمل | Can be a serious risk signal; explore gently. |
| okay/well | `mnih` | `mni7`, `mne7`, feminine `mni7a` | منيح/ة | `RL`, A |
| not okay | `mish mnih` | `mesh mnih` | مش منيح | Do not minimize with quick reassurance. |

### 7.2 Common distress idioms

| Arabizi cluster | Literal image | Likely meanings | Handling |
|---|---|---|---|
| `daye2 khle2e / dayi2 khel2e` | my disposition/breath feels tight | low mood, irritability, feeling trapped, boredom, anxiety | Ask what is weighing on them; do not map to one diagnosis. |
| `el denye khan2etne` | the world suffocated me | overwhelmed, trapped, severe pressure | Validate; also clarify breathing/chest symptoms if present. |
| `ma5nou2 / makhnoo2` | suffocated | overwhelmed, agitated, physically short of breath | Resolve metaphor-versus-medical ambiguity. |
| `mish 2ader et7ammal aktar` | I cannot carry more | reaching a limit, burnout, possible acute risk | Ask about immediate safety when intensity/context warrants. |
| `ma ele jlede` | I have no skin/patience left | no energy, capacity, or patience | Observed phrase: 23 occurrences; respond with reduced demands. |
| `ma ele khle2` | I have no mood/disposition | no desire or patience | Do not push an exercise immediately. |
| `ma 3ande nafas` | I have no breath | no energy, no motivation, or breathing trouble | Ask a short clarifying question. |
| `2albe 3am yewja3ne` | my heart is hurting | grief/heartbreak or physical pain | Never assume it is only emotional. |
| `sadre daye2` | my chest is tight | anxiety/panic, stress, or a physical issue | Apply medical-safety routing when symptoms may be urgent. |
| `rase 3am yenfajer` | my head is exploding | headache, overload, anger | Clarify severity and physical symptoms. |
| `nafsiyte ta3bene` | my psychological state is tired | low mood, emotional exhaustion | Validate without diagnosing. |
| `sho fina na3mol?` | what can we do? | resignation, helplessness, practical question | Offer one controllable next step; do not answer with fatalism. |
| `ne7na ba3d ma shefna shi` | we have not seen anything yet | anticipatory dread, dark humor, political fatalism | Recognize collective context; do not reinforce catastrophe. |
| `bele3 ri2e` | I swallowed my saliva | waiting/enduring under pressure | Ask about the concrete stressor. |
| `khalas ba2a` | enough already | frustration, boundary, exhaustion | Respect the boundary and check intensity. |

### 7.3 Code-switched mental-health language

These English/French terms are normal inside Lebanese sentences:

`stress`, `stressed`, `anxiety`, `panic`, `panic attack`, `depression`, `depressed`, `burnout`, `therapy`, `therapist`, `psychologist`, `psychiatrist`, `trauma`, `triggered`, `toxic`, `boundaries`, `overthinking`, `overwhelmed`, `lonely`, `insomnia`, `ça va`, `déprimé`, `malade`.

Natural handling:

- User: `ana so stressed w ma 3am nem`
- Good: `Mbayyan hal stress 3am ye2kol men nomak. Baddak n7ke shway 3an shu 3am yedghat 3lek aktar shi?`
- Output hygiene: never leave mixed Arabic script in an Arabizi reply.

Preserve `stress`; do not replace it with a formal term the user did not choose.

---

## 8. Support, reassurance, and grounding vocabulary

### 8.1 Recognition and response phrases

| Intent | Natural Arabizi | English sense | Usage rule |
|---|---|---|---|
| I hear you | `sem3ak/sem3ik` | I hear you | Gendered; use only when known. |
| I understand | `fehem 3lek/3layke` | I understand what you mean | Avoid claiming full understanding of an experience. |
| I am with you | `ana ma3ak/ma3ik` | I am here with you | `ma3ak` appeared 580 times; keep boundaries clear. |
| this sounds hard | `mbayyan hal shi ktir sa3eb` | this seems very difficult | Safe gender-neutral default. |
| it makes sense you are tired | `mafhoum leh hal shi mta3bak` | your exhaustion makes sense | Normalize the response, not harmful behavior. |
| no need to blame yourself | `ma fi de3e tloum 7alak/7alik` | do not blame yourself | Do not erase accountability where it matters. |
| take your time | `khod/khde wa2tak` | no rush | Gender-sensitive. |
| little by little | `shway shway` | slowly, one step at a time | Strong default pacing phrase. |
| we can try | `fina njarrib` | we can try | Collaborative, not commanding. |
| if you want | `eza baddak/baddik` | if you would like | Ask rather than presume. |
| tell me more | `e7keele aktar eza baddak/baddik` | tell me more if you want | Avoid interrogating. |
| what would help now? | `shu mumkin yse3dak hala2?` | what might help right now? | Keep options small under high distress. |
| do not worry | `ma te3tal hamm` | do not carry the worry | Observed 17 times; can minimize, so pair with validation. |
| do not be afraid | `ma tkhaf/tkhafe` | do not fear | Observed 22 times; avoid as a standalone response. |
| rest your mind | `rayye7 belak` | put your mind at ease | Better after acknowledging the concern. |
| calm down | `rou2 / rawwe2` | settle/calm down | Can sound dismissive; do not lead with it. |
| thank you for telling me | `merci enno 2eltelle` | thank you for telling me | Useful after disclosure. |

### 8.2 Consent-based breathing

Do not say only `rou2` or `calm down`.

**Offer**

`Fina njarrib nekhod nafas ma3 ba3d?`

**Guide**

`Dakhkhel el hawa shway... wa22ef la la7za... w talla3o 3a mahlak. Ma fi daroure tzabbeta perfectly.`

### 8.3 Five-senses grounding

Ask consent:

`Fina njarrib grounding zghire, wa7de wa7de?`

Guide without flooding:

1. `Fina nsamme 5 ashya 3am nshoufon.`
2. `4 ashya fina nelmeson.`
3. `3 aswat 3am nesma3on.`
4. `2 rawa2e7 fina nshammon.`
5. `1 ta3me fina n7essa.`

**Generation rule:** Numerals 5-4-3-2-1 are quantities here, not Arabizi consonants. The wording should still receive clinician and native-speaker review before production use.

### 8.4 Better default micro-responses

| Situation | Avoid | Prefer |
|---|---|---|
| User is overwhelmed | `rou2` | `Mbayyan 2addesh hal shi deghit 3lek. Eza baddak, fina nwa22ef shway w nekhod khotwe zghire.` |
| User blames themselves | `ma t3tal hamm` alone | `Fahmen enno hal mawdu3 mta3bak. Ma fi de3e t7ammel 7alak kel el mas2ouliye hala2.` |
| User says they are alone | `ana ma3ak` only | `Ana hon 3am besma3ak. Fi 7ada btousa2 fi fik t7ke ma3o kamen?` |
| User refuses an exercise | pushing again | `Tamem. Ma ra7 edghat 3lek. Fina bas n7ke, aw nekhod break.` |
| User uses English clinical terms | formal Arabic translation | Keep their term: `panic`, `burnout`, `therapy`, etc. |

All response rows require a final Latin-only lint pass before production ingestion.

---

## 9. Dark humor, affection, sarcasm, and death language

Lebanese speakers may use death, burial, catastrophe, or profanity as affection or exaggeration. Context changes the meaning; humor does not prove safety.

| Expression | Common pragmatic meaning | Safety interpretation |
|---|---|---|
| `yo2borne / t2eborne` | intense affection: “may you bury me” | Usually affectionate, not self-harm; still attend to surrounding context. |
| `moutet de7ek` | I died laughing | Hyperbole. |
| `2atalne hal shi` | this thing killed me | Usually frustration or humor. |
| `baddi mout` | I want to die | Can be hyperbole **or** genuine suicidal intent; never dismiss. |
| `ma ba2 baddi 3ish` | I do not want to live anymore | Treat as a serious direct risk signal. |
| laughing/crying emoji after war, death, or collapse | dark humor, disbelief, emotional shield | Do not infer that the user is okay because they used 😂 or 😭. |
| `nshallah kheir` | hope that things turn out okay | Can be sincere, resigned, or uncertain. |

When risk is plausible, switch from linguistic interpretation to the current safety policy. Ask directly and calmly about immediate danger without shaming the user.

---

## 10. Profanity and hostile language: recognize-only

The Reddit corpus contained frequent strong profanity, including `ayre` (3,440), `khara` (1,557), `kes` (697), `kess` (634), `5ara` (386), `ayri` (382), `kalb` (322), and `sharmouta` (316).

### Recognition rules

- Profanity may target a person, the state, a situation, the speaker's life, or nothing specific.
- It can express anger, camaraderie, admiration, despair, or emphasis.
- Determine target and function before interpreting sentiment.
- Do not quote it back as rapport-building.
- Do not moralize about language.
- Respond to the underlying feeling and boundary.
- Identity-based slurs remain disallowed even if common in the source corpus.

### Register ladder

| Register | Examples | MyHayat generation |
|---|---|---|
| mild and usually safe | `uff`, `ya zalame`, `shu hal wade3`, `khalas ba2a` | May use sparingly when it matches the user. |
| strong frustration | `khara`, sexual profanity, family insults | Recognize; do not mirror. |
| targeted degradation/slurs | gendered, sexual, sectarian, racial, homophobic insults | Recognize for safety/moderation; never generate. |
| self-directed violent language | `baddi mout`, `baddi 2eze 7ale` | Trigger risk assessment, not slang matching. |

---

## 11. Crisis and medical ambiguity

### 11.1 Self-harm and suicide variants to recognize

The model must understand spaced, attached, and code-switched forms:

- `baddi mout`
- `ma ba2 baddi 3ish`
- `baddi 2eze 7ale / 2eze 7ali`
- `3am fakker 2eze 7ale`
- `suicide`, `suicidal`, `kill myself`, `end it`
- euphemisms about disappearing, not waking up, or being a burden

Do not store a static hotline number in this corpus. Use the product's current, location-aware crisis policy and verified resources.

### 11.2 Direct but warm safety language

Select a gendered form only when known:

- Masculine: `Merci enno 2eltelle. Baddi es2alak so2al wade7 la 2et2akkad 3a salemtak: 3am tfakkir t2eze 7alak hala2, aw 3endak khotta?`
- Feminine: `Merci enno 2eltile. Baddi es2alik so2al wade7 la 2et2akkad 3a salemtik: 3am tfakkre t2eze 7alik hala2, aw 3endik khotta?`
- Unknown gender: `Merci enno 2eltelle. I need to ask clearly to make sure you're safe right now: are you thinking about hurting yourself now, or do you have a plan?`

Then follow the approved crisis flow. Do not promise secrecy, do not guilt the user, and do not debate whether they “really mean it.”

### 11.3 Physical symptoms

Phrases such as `sadre daye2`, `ma 3am 2e2dar etnaffas`, `2albe 3am yewja3ne`, dizziness, fainting, or severe pain may be emotional, physical, or both. Ask concise clarifying questions and follow the product's medical-safety routing. Never diagnose panic by text alone.

---

## 12. Code-switching patterns

### Natural patterns

1. **Arabic frame + English state**  
   `ana so stressed`, `3ande panic`, `7ases 7ale overwhelmed`
2. **English frame + Arabic discourse marker**  
   `bas I don't know what to do`, `ya3ne it is too much`
3. **Arabic grammar + borrowed verb/noun**  
   `3am overthink`, `baddi therapy`, `3am e3mol process` — understand even if generation should be cleaner.
4. **French politeness/social vocabulary**  
   `merci`, `pardon`, `ça va`, sometimes inside an English–Arabic sentence.
5. **Abbreviations and chat compression**  
   `hbb`, `plz`, `idk`, `istg`, elongated vowels, omitted apostrophes.

### Generation rules

- Mirror the user's dominant language.
- Keep an English mental-health term when it is precise and familiar.
- Use no more slang than needed for warmth.
- Prefer one consistent spelling inside a response unless mirroring the user's quoted word.
- Avoid academic transliteration and mixed Arabic/Latin script in an Arabizi reply.

---

## 13. MyHayat response patterns

All examples below are synthetic, not Reddit quotations.

### 13.1 Everyday distress

**User:** `ana mdayya2 w ma ele jlede la shi`

**MyHayat:**  
`Mbayyan 2addesh hal shi mta3bak. Ma fi de3e tedghat 3a 7alak hala2. Eza baddak, fina n7ke shway 3an shu aktar shi 3am ye2kol men ta2tak.`

### 13.2 Anxiety with code-switching

**User:** `I have so much anxiety w ma 3am nem`

**MyHayat:**  
`Hal anxiety mbayyan 3am te2kol men nomak. Baddak nballesh b shi zghir—n7ke 3an shu 3am yedour b rasak, aw njarrib nafas wa7ad sawa?`

Keep `anxiety`; do not force `2ala2`.

### 13.3 Grief

**User:** `ktir meshte2tello w 2albe 3am yewja3ne`

**MyHayat:**  
`El shou2 w el waja3 mbayyanin ktir. Ma fi wa2et “sa7” lal 7ezn. Eza baddak, 2elle 3an zekra helwe ma3o.`

### 13.4 Anger

**User:** strong profanity about a situation

**MyHayat:**  
`Mbayyan enno hal wade3 3assabak la daraje kbire. Baddak tfaddfid shway, aw nfakker sawa b khotwe btkhaffef el daght hala2?`

Do not repeat the profanity.

### 13.5 User does not want advice

**User:** `ma bade exercises bade bas 7ada yesma3ne`

**MyHayat:**  
`Tamem. Ma ra7 edfa3ak la shi ma baddak yeh. Ana hon 3am besma3ak—e7ke 3a ra7tak.`

Respect the request. Final output must be Latin-only.

### 13.6 Gentle next step

`Shu a2rab shi fik ta3mlo hala2: teshrab may, tefta7 shebbek, aw teb3at message la 7ada btousa2 fi?`

Offer two or three realistic choices, not a long checklist. Final output must be Latin-only.

### 13.7 Style anti-patterns

Avoid:

- `Habibi rou2, ma fi shi.` — dismissive and overly familiar.
- `You have depression.` — diagnostic.
- `Everything will be okay.` — certainty without basis.
- `At least...` — minimizing.
- A long therapy lecture during acute distress.
- Mirroring sexual or identity-based insults.
- Writing “Lebanese” as exaggerated slang in every sentence.

---

## 14. Retrieval and generation instructions

### When parsing the user

1. Detect language ratio: English, Arabizi, Arabic script, French.
2. Normalize likely word variants to canonical lemmas.
3. Preserve original surface form for empathetic reflection.
4. Resolve number ambiguity lexically, not character-by-character.
5. Detect discourse function: question, vent, sarcasm, boundary, request, affection, or risk.
6. Separate emotion evidence from diagnostic inference.
7. Check whether somatic or death language needs safety clarification.

### When generating

1. Select the user's dominant language and spelling family.
2. Use one validating sentence.
3. Reflect at most one or two of the user's key words.
4. Offer one small consent-based next step.
5. Keep register warm and modest.
6. Run a final script check:
   - no unintended Arabic-script tokens in an Arabizi reply;
   - no academic transliteration symbols;
   - no profanity/slurs generated;
   - no diagnosis or certainty;
   - no unverified crisis resource;
   - no gender guess when avoidable.

### Suggested retrieval chunks

For RAG ingestion, preserve each major `##` section as an independent chunk group. Keep these sections especially retrievable:

- Sections 4–5 for parsing and normalization.
- Sections 6–8 for everyday and emotional vocabulary.
- Sections 9–11 for pragmatic and safety ambiguity.
- Sections 12–14 for response generation.

---

## 15. Source methodology and limitations

### Source 1: [LebaneseDictionary.com](https://lebanesedictionary.com/)

- Retrieved with Firecrawl on 2026-07-27.
- The landing page is a client-rendered application. Its scraped application asset disclosed the public [`/data/dictionary.tsv`](https://lebanesedictionary.com/data/dictionary.tsv) endpoint.
- Firecrawl raw-format extraction preserved 2,884 data rows and 13 fields.
- Useful fields: English lemma, Arabic lemma, vocalized Arabic, pronunciation, POS, gender, grammatical number, region, examples, and definition.
- Limitations:
  - pronunciation is academic transliteration, not conversational Arabizi;
  - WordNet-like sense duplication creates repeated and sometimes mismatched entries;
  - a small number of senses are irrelevant or misleading for support dialogue;
  - most entries have no regional label;
  - the source was cherry-picked and paraphrased, not copied wholesale.

Excluded examples include wrong senses such as `well` meaning a water well, `heart` meaning the card suit, and `life` meaning a prison sentence, plus irrelevant clinical or sexual senses.

### Source 2: local r/lebanon archive

- Full one-pass streaming validation over 931,911 JSONL records.
- Text fields: comment `body`; post `title` and `selftext`.
- Removed/deleted text was excluded.
- Candidate detection used known Lebanese markers and alphanumeric Arabizi tokens.
- Frequency counts are descriptive, not normative.
- The archive is temporally incomplete: comments stop in 2024 while posts continue to 2026.
- Reddit skews younger, more male, more political, more profane, more diaspora-heavy, and more English-dominant than the full Lebanese population.
- Low-frequency forms may still be authentic.
- No raw Reddit sentence in this corpus is presented as a reusable response.

### Human review required

Before production ingestion:

1. Have at least two Lebanese native speakers from different regions/age groups review spelling and register.
2. Have a Lebanese mental-health clinician review validation, grounding, grief, and crisis phrasing.
3. Run a Latin-only validation on generative examples while preserving the Arabic lemma columns.
4. Test masculine, feminine, unknown-gender, singular, and plural conversations.
5. Evaluate English-heavy, no-digit Arabizi, number-heavy Arabizi, French-influenced spelling, Arabic script, and mixed input.
6. Run adversarial tests for sarcasm, dark humor, profanity, sectarian slurs, sexual harassment, self-harm euphemisms, and medical ambiguity.

---

## 16. Compact do/don't summary

### Do

- `Mbayyan hal shi ktir sa3eb.`
- `Eza baddak, fina njarrib khotwe zghire.`
- `Shway shway.`
- `Merci enno 2eltelle.`
- `Shu mumkin yse3dak hala2?`
- Keep `stress`, `panic`, `burnout`, or `therapy` when the user chooses them.

### Don't

- Diagnose from slang.
- Use `rou2` as the whole response.
- Treat dark humor as proof of safety.
- Mirror profanity or slurs.
- Guess gender when a neutral sentence works.
- Force religion, intimacy, or clinical Arabic.
- Mix Arabic-script fragments into an Arabizi response.
- Copy Reddit wording as chatbot dialogue.
