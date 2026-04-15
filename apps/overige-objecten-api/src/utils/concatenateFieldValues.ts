export interface ConcatenateFieldValuesDataTypes {
  content: string;
  kennisartikelCategorie?: string | null;
}
export const concatenateFieldValues = (data: ConcatenateFieldValuesDataTypes[]): string =>
  data?.reduce((result, item) => {
    return `${result}${item.content}`;
  }, '');
