import { Product as ProductType } from '../../gql/graphql';

export type MappingProductsProps = {
  attributes: ProductType;
};

export const mappingProducts = (
  products: MappingProductsProps[],
  segment: string,
): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ attributes }) => ({
    title: attributes.title,
    url: `/${segment}/${attributes.slug}`,
    body: attributes?.metaTags?.description,
  }));
};
