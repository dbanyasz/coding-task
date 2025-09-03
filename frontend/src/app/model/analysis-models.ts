/** behaviour shared by the two analysis modes */
export interface ModeBehaviour {
    /** returns the filtered string based on the specific behaviour implementation */
    filter(input: string): string;
    /** the alphabetic symbols this mode tracks */
    letters: readonly string[];
}

export type AnalysisModeId = 'VOWELS' | 'CONSONANTS';

/** papping from the identifier to the behavioural object used locally. */
export const ANALYSIS_MODE_MAP: Record<AnalysisModeId, ModeBehaviour> = {
  VOWELS: {
    filter: (input) => input.replace(/[^AEIOU]/g, ''),
    letters: ['A', 'E', 'I', 'O', 'U'] as const,
  },
  CONSONANTS: {
    filter: (input) => input.replace(/[AEIOU]/g, ''),
    letters: [
      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K',
      'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
      'V', 'W', 'X', 'Y', 'Z',
    ] as const,
  },
};

/** Public shape of the request the UI builds. */
export interface AnalysisRequest {
  /** Raw text the user entered. */
  input: string;
  /** Identifier that will be sent to the server. */
  mode: AnalysisModeId;
}
