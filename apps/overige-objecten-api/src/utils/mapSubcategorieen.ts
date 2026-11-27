import type { StrapiCategory, StrapiSubcategory } from '../shared-types';
import type { components } from '../types/openapi';

type Subcategorie = components['schemas']['subcategorie'];
type Categorie = components['schemas']['categorie'];

const mapCategorie = ({ documentId, title, createdAt, updatedAt, publishedAt }: StrapiCategory): Categorie => ({
  documentId,
  titel: title ?? '',
  createdAt: createdAt ?? undefined,
  updatedAt: updatedAt ?? undefined,
  publishedAt: publishedAt ?? null,
});

export const mapSubcategorieen = (subcategories?: (StrapiSubcategory | null)[] | null): Subcategorie[] =>
  (subcategories ?? [])
    .filter((subcategory): subcategory is StrapiSubcategory => Boolean(subcategory))
    .map(({ pdc_category, ...subcategory }) => ({
      ...mapCategorie(subcategory),
      categorie: pdc_category ? mapCategorie(pdc_category) : null,
    }));
