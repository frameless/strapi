interface CategoryItem {
  kennisartikelCategorie?: string;
  content: string;
  id: string;
}

export const combineSimilarCategories = (data: CategoryItem[] = []) => {
  const groupedData = data.reduce((acc: Record<string, CategoryItem>, curr) => {
    const category = curr?.kennisartikelCategorie;
    if (category) {
      if (!acc[category]) {
        acc[category] = { ...curr, content: curr.content };
      } else {
        acc[category].content += curr.content;
      }
    }
    return acc;
  }, {});

  // Convert object back to array
  return Object.values(groupedData);
};
