export const normalizeCategories = (data: any) => {
  return data.map((item: any) => {
    // Find the key that starts with 'categorie'
    const categorieKey = Object.keys(item).find((key) => key.startsWith('categorie'));
    if (categorieKey) {
      const { [categorieKey]: categorieValue, ...rest } = item;
      return { ...rest, categorie: categorieValue };
    }

    // Return the item unchanged if no 'categorieX' field is found
    return item;
  });
};
