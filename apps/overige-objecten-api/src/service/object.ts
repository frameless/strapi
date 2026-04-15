import { fetchData } from '@frameless/utils';

import { GET_PRODUCT_BY_UUID, GET_VAC_ITEM_BY_UUID } from '../queries';
import { KennisartikelObject, ObjectByUUID, VACObject } from '../types';
import { generateKennisartikelObject, getVacData } from '../utils';
import type { GetProductByUuidOrDocumentIdQuery, GetVacItemByUuidOrDocumentIdQuery } from '../../gql/graphql';
import { KennisartikelMetadata, PageSection, PriceItem } from '../shared-types';

type GQLProduct = NonNullable<NonNullable<GetProductByUuidOrDocumentIdQuery['products']>[number]>;
type GQLVac = NonNullable<NonNullable<GetVacItemByUuidOrDocumentIdQuery['vacs']>[number]>;

interface GetObjectByUUIDProps {
  apiToken?: string;
  serverURL: string;
  uuid?: string;
  documentId?: string;
  locale?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

const isDefined = <T>(argument: T | undefined | null): argument is T => argument !== null && argument !== undefined;

const getStatus = (items: (GQLProduct | GQLVac | null | undefined)[]): 'DRAFT' | 'PUBLISHED' =>
  items.filter(isDefined)[0]?.publishedAt === null ? 'DRAFT' : 'PUBLISHED';

const formatKennisartikel = (
  product: GQLProduct,
  serverURL: string,
  publicationState: 'DRAFT' | 'PUBLISHED',
): KennisartikelObject => {
  // Ensure we have fallback strings to satisfy template literal types
  const safeId = product.id ?? 'unknown-id';
  const safeUuid = product.uuid ?? '';

  const sections: PageSection[] = [
    {
      component: 'ComponentComponentsUtrechtRichText' as const,
      id: `${safeId}-intro`,
      content: product.content,
      kennisartikelCategorie: 'inleiding',
      categorie5: 'inleiding',
    },
    ...((product.sections?.filter(isDefined) ?? []) as PageSection[]),
  ];

  // We cast the result to KennisartikelObject because generateKennisartikelObject
  // might return a generic 'string' for its 'type' property internally.
  return generateKennisartikelObject({
    id: safeId,
    url: serverURL,
    uuid: safeUuid,
    locale: product.locale ?? 'nl',
    title: product.title ?? '',
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
    publicationState,
    sections,
    metaTags: product.metaTags ?? null,
    kennisartikelMetadata: (product.kennisartikelMetadata as KennisartikelMetadata) ?? null,
    price: product.price ? { price: (product.price.price?.filter(isDefined) ?? []) as PriceItem[] } : null,
    additional_information: {
      content: {
        uuid: product.additional_information?.content?.uuid ?? '',
        contentBlock: (product.additional_information?.content?.contentBlock ?? []).filter(isDefined).map((block) => ({
          id: block.id,
          content: block.content,
          kennisartikelCategorie: block.categorie10 ?? 'onbekend',
          categorie10: block.categorie10,
          component: 'ComponentComponentsUtrechtRichText' as const,
        })),
      },
    },
  }) as KennisartikelObject;
};

export const getObjectByUUID = async ({
  apiToken,
  documentId,
  serverURL,
  uuid,
  locale,
  status = 'PUBLISHED',
}: GetObjectByUUIDProps): Promise<ObjectByUUID> => {
  if (!uuid) throw new Error('UUID not provided');

  // Ensure base URL is a valid string for the URL constructor
  const baseUrl = process.env.STRAPI_PRIVATE_URL || 'http://localhost:1337';
  const graphqlURL = new URL('/graphql', baseUrl).href;
  const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
  const headers = { Authorization: `Bearer ${apiToken}` };

  const [productRes, vacRes] = await Promise.all([
    fetchData<{ data: GetProductByUuidOrDocumentIdQuery }>({
      url: graphqlURL,
      query: GET_PRODUCT_BY_UUID,
      variables: { documentId, locale, uuid, status },
      headers,
    }),
    fetchData<{ data: GetVacItemByUuidOrDocumentIdQuery }>({
      url: graphqlURL,
      query: GET_VAC_ITEM_BY_UUID,
      variables: { documentId, uuid, status },
      headers,
    }),
  ]);

  const products = productRes.data?.products?.filter(isDefined) ?? [];
  const vacNodes = vacRes.data?.vacs?.filter(isDefined) ?? [];

  const objectPublicationState =
    getStatus(products) === 'DRAFT' || getStatus(vacNodes) === 'DRAFT' ? 'DRAFT' : 'PUBLISHED';

  const foundProduct = products.find((p) => p.uuid === uuid || p.id === uuid);
  if (foundProduct) {
    return formatKennisartikel(foundProduct, serverURL, objectPublicationState);
  }

  if (vacNodes.length > 0) {
    const vacItems = getVacData({
      data: {
        vacs_connection: {
          nodes: vacNodes,
          pageInfo: { total: vacNodes.length, page: 1, pageSize: vacNodes.length, pageCount: 1 },
        },
      },
      serverURL,
      vacSchemaURL,
      publicationState: objectPublicationState,
    });
    return vacItems[0] as VACObject;
  }

  throw new Error('Object not found');
};
