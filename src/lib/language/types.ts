export type DominantLanguage = "english" | "arabizi" | "arabic" | "mixed";

export interface SpellingPreferences {
  what?: string;    // shu/shou/chou/sho
  not?: string;     // mish/mesh/mech
  now?: string;     // hala2/halla2/hl2
  want?: string;    // bade/badde/baddi/bedde
  very?: string;    // ktir/kteer
  good?: string;    // mni7/mnih/mne7
  [cluster: string]: string | undefined;
}

export interface LanguageProfile {
  dominantLanguage: DominantLanguage;
  englishRatio: number;       // 0-1
  arabiziRatio: number;       // 0-1
  arabicRatio: number;        // 0-1 (Arabic script)
  frenchRatio: number;        // 0-1
  spellingPreferences: SpellingPreferences;
  digitDensity: number;       // proportion of words containing 2/3/5/7/8/9 as phonemes
  uses2: boolean;
  uses3: boolean;
  uses5: boolean;
  uses7: boolean;
  uses8: boolean;
  uses9: boolean;
  preserveTerms: string[];    // English clinical terms the user chose (e.g. "anxiety")
  semanticEnglish: string | null; // English paraphrase for retrieval only
}

export interface SessionLanguageProfile extends LanguageProfile {
  messageCount: number;
  lastUpdated: number;
}
