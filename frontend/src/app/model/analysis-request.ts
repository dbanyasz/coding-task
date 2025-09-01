export enum AnalysisMode {
    Vowels = "VOWELS",
    Consonants = "CONSONANTS"
}

export interface AnalysisRequest {
    mode: AnalysisMode;
    input: string;
}