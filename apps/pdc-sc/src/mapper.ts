import type { ScProduct } from '@frameless/samenwerkende-catalogi';

import { SC_DEFAULTS } from './defaults';
import type { GetSamenwerkendeCatalogiFetchQuery } from './gql/graphql';

type StrapiProduct = NonNullable<NonNullable<GetSamenwerkendeCatalogiFetchQuery['products']>[number]>;

export const mapProductToScProduct = (product: StrapiProduct): ScProduct => ({
  id: product.documentId,
  title: product.title,
  slug: product.slug,
  language: product.locale ?? SC_DEFAULTS.locale,
  abstract: product.metaTags?.description,
  modifiedAt: product.updatedAt,
  onlineRequest: product.catalogiMeta?.onlineRequest?.type,
  spatial: {
    scheme: product.catalogiMeta?.spatial?.scheme ?? SC_DEFAULTS.spatial.scheme,
    resourceIdentifier: product.catalogiMeta?.spatial?.resourceIdentifier ?? SC_DEFAULTS.spatial.resourceIdentifier,
  },
  authority: {
    scheme: product.catalogiMeta?.authority?.scheme ?? SC_DEFAULTS.authority.scheme,
    resourceIdentifier: product.catalogiMeta?.authority?.resourceIdentifier ?? SC_DEFAULTS.authority.resourceIdentifier,
  },
  audiences: (product.catalogiMeta?.audience ?? [])
    .filter((a): a is NonNullable<typeof a> => a !== null)
    .map(({ id, type }) => ({ id, type })),
  uplProductNaam: product.pdc_metadata?.uplProductNaam,
});
