import { getPathAndSearchParams } from '@frameless/utils';

import { Product as ProductType } from '../../gql/graphql';

export const mappingProducts = (products: ProductType[], segment: string): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ slug, title, metaTags }) => {
    const { pathSegments } = getPathAndSearchParams({
      segments: [segment, slug],
    });

    return {
      title: title,
      url: `/${pathSegments}`,
      body: metaTags?.description,
    };
  });
};
