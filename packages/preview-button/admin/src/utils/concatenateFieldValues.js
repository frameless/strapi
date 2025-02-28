export const concatenateFieldValues = (data) =>
  data?.reduce((result, item) => {
    return `${result}${item.content}`;
  }, '');
