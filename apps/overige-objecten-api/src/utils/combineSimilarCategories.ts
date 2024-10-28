export interface CombineSimilarCategoriesProps {
  [key: string]: string;
}
export const combineSimilarCategories = (data: CombineSimilarCategoriesProps[]) =>
  data.reduce(
    (acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (curr[key]) {
          // Concatenate values directly as strings
          acc[key] = acc[key] ? `${acc[key]}${curr[key]}` : `${curr[key]}`;
        }
      });
      return acc;
    },
    {} as { [key: string]: string },
  );
