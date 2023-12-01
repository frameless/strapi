import { Product as ProductType } from '../../gql/graphql';

export type MappingProductsProps = {
  attributes: ProductType;
};

export const mappingProducts = (products: MappingProductsProps[]): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ attributes }) => ({
    title: attributes.title,
    url: `/products/${attributes.slug}`,
    body: attributes?.metaTags?.description,
  }));
};
