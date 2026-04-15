export interface ReturnType {
  trefwoord: string;
}

export const generateKeywords = (keywords?: string): ReturnType[] =>
  keywords ? keywords.split(', ').map((keyword: string) => ({ trefwoord: keyword })) : [];
