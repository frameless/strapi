interface CombineSimilarCategoriesProps {
    kennisartikelCategorie?: string;
    content: string;
    [key: string]: any;
}

export const combineSimilarCategories = (data: CombineSimilarCategoriesProps[]): CombineSimilarCategoriesProps[] => {
  const groupedData = data?.reduce((acc, curr) => {
    const category = curr?.kennisartikelCategorie;
    if (category) {
      if (!acc[category]) {
        acc[category] = { ...curr, content: curr.content };
      } else {
        acc[category].content += curr.content;
      }
    }
    return acc;
  }, {} as Record<string, CombineSimilarCategoriesProps>);

  return Object.values(groupedData);
};
