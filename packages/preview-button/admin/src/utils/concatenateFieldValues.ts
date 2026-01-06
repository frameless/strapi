interface ConcatenateFieldValuesProps {
  content: string;
}
export const concatenateFieldValues = (data: ConcatenateFieldValuesProps[]) =>
  data?.reduce((result, item) => {
    return `${result}${item.content}`;
  }, '');
