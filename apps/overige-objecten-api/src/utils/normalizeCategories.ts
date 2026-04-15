import { PageData, PageSection } from '../shared-types';

export const normalizeCategories = (data: PageData): PageData => {
  return data.map((item): PageSection => {
    // Cast locally just for dynamic key access — outer types remain strict
    const record = item as unknown as Record<string, unknown>;
    const categorieKey = Object.keys(record).find((key) => key.startsWith('categorie'));

    if (categorieKey) {
      const { [categorieKey]: categorieValue, ...rest } = record;
      return { ...rest, categorie: categorieValue } as PageSection;
    }

    return item;
  });
};
