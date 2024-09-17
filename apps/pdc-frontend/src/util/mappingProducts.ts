import { getPathAndSearchParams } from './buildURL';
import { Product as ProductType } from '../../gql/graphql';

export type MappingProductsProps = {
  attributes: ProductType;
};

export const mappingProducts = (
  products: MappingProductsProps[],
  segment: string,
): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ attributes }) => {
    const { pathSegments } = getPathAndSearchParams({
      segments: [segment, attributes.slug],
    });

    return {
      title: attributes.title,
      url: `/${pathSegments}`,
      body: attributes?.metaTags?.description,
    };
  });
};
