export interface ProcessToDeskMemoData {
  content: string;
  kennisartikelCategorie: string;
}
export const processToDeskMemo = (data: ProcessToDeskMemoData[]): { deskMemo: string } => ({
  deskMemo: data?.reduce((memo, item) => {
    return `${memo}${item.content}`;
  }, ''),
});
