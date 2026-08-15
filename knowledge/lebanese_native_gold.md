# My Hayat — Lebanese Native-Speaker Gold Regressions

This file is a **human review fixture**, not an automated proof of dialect quality.

The bad examples below came from real production output and MUST NOT be treated as valid Lebanese merely because a language detector recognizes them as Arabizi.

## Production failure transcript

### Turn 1
User: `i dunno , shwey ze3lmn`

BAD:
`Ma3ak knesbi t7araj? El shwey w el waja3 mbayyanin ktir. Fina njarrib nekhod nafas ma3 ba3d?`

Why bad:
- contains meaningless/unnatural wording;
- jumps to a breathing exercise before understanding what is wrong.

Preferred behavior supplied by owner:
- acknowledge mild sadness;
- ask one natural follow-up question first;
- exact Lebanese wording still requires native review.

---

### Turn 2
User: `naffas bazz azdak`

BAD:
`Sahih, naffas sa7a7a7a. Eza baddak, 7atti ya7sik shi 3la s7a7a?`

Why bad:
- `sa7a7a7a` is gibberish;
- the rest is not a coherent Lebanese sentence.

---

### Turn 3
User: `i want to tell 2emme w baye eno i am looteh`

BAD:
`Hala... hena kanet 7asan t7arradj bi7al. Ma3ak khass ezzay 7atta t7sab 3aleha?`

Why bad:
- `ezzay` is Egyptian, not Lebanese;
- multiple phrases are semantically incoherent;
- a sensitive family disclosure should first explore desired outcome, feared reaction, and safety.

---

### Turn 4
User: `la 3anjad, i ddont know what to tell th4m`

BAD:
`Ma3ak 3ajib, hena kol shi 7assas. Eza baddak, 7attik shi 3la 7alak hala2, aw 7attik shi 3la s7a7a? Kullu shi 7assas, bas takon 3ala 7alak.`

Why bad:
- several phrases have no clear meaning;
- repetitive filler;
- `7assas` is wrong for the native-owner intended Lebanese form/context.

---

### Turn 5
User: `where r u from?`

BAD:
`Anaa lebanon, akher 7alla2 ba3dek. Eza bddk t7arradj, ana 7enaka kol shi.`

Why bad:
- user asked in English and should receive English;
- generated Arabizi sentence is incoherent.

Root-cause regression requirement:
Language mode must be based on the **current user turn**, not a concatenation of earlier Arabizi turns.

---

### Turn 6
User: `how can i learn to be more confident?`

BAD:
`Kol shi 7assas, bas 7atti t7arradj 3ala 7alak. T7allil shi 3ala 7alak hala2, aw 7atti t7allil shi 3ala s7a7a. Kollohom 7assas, bas t7arradj 3ala 7alak.`

Why bad:
- English question incorrectly answered in Arabizi;
- repetitive nonsense;
- `kollohom` is not the desired Lebanese form;
- no useful confidence guidance.

## Native-owner lexical / morphology corrections

These are high-priority human corrections supplied by the project owner:

- Intended Lebanese `7assas` -> `7asses` in the relevant context.
- `kollohom 7assas` is rejected.
- `kellon 7essessin` = all of them are sensitive.
- `kelna 7essessin` = we are all sensitive.
- Lebanese vowel/pronunciation anchors include `bab -> beb`, `daye2 -> deye2`, and `7assas -> 7asses` in the relevant lexical contexts.
- These are **not** permission for a global `a -> e` replacement rule.

## Evaluation rule

A response passes native review only when:

1. the sentence has a clear intended meaning;
2. vocabulary is interpretable and not invented;
3. person/number/adjective agreement matches the meaning;
4. syntax is naturally Lebanese rather than Egyptian/MSA word substitution;
5. the response is therapeutically relevant to the user's actual turn.

Language-detection accuracy alone is not a generation-quality metric.
