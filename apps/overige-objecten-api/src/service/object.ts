import { fetchData } from '@frameless/utils';

import { GET_PRODUCT_BY_UUID, GET_VAC_ITEM_BY_UUID } from '../queries';
import type { Attributes, Section, StrapiProductType, VACSData } from '../strapi-product-type';
import { KennisartikelObject, ObjectByUUID, VACObject } from '../types';
import { generateKennisartikelObject, getVacData } from '../utils';

interface ModifiedSection extends Section {
  categorie5?: string;
}

interface GetObjectByUUIDProps {
  apiToken?: string;
  serverURL: string;
  uuid?: string;
  locale?: string;
  publicationState?: 'PREVIEW' | 'LIVE';
}

export const getObjectByUUID = async ({
  apiToken,
  serverURL,
  uuid,
  locale,
  publicationState = 'LIVE',
}: GetObjectByUUIDProps): Promise<ObjectByUUID> => {
  if (!uuid) throw new Error('UUID not provided');

  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL).href;
  const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;

  // Fetch product data
  const { data } = await fetchData<StrapiProductType>({
    url: graphqlURL,
    query: GET_PRODUCT_BY_UUID,
    variables: { locale, uuid, publicationState },
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  const kennisartikelPublicationState =
    data?.products?.data[0]?.attributes?.publishedAt === null ? 'DRAFT' : 'PUBLISHED';

  // Fetch VAC data
  const { data: vacData } = await fetchData<{ data: VACSData }>({
    url: graphqlURL,
    query: GET_VAC_ITEM_BY_UUID,
    variables: { uuid, publicationState },
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  const vacPublicationState = vacData?.vacs?.data[0]?.attributes?.publishedAt === null ? 'DRAFT' : 'PUBLISHED';

  const objectPublicationState =
    kennisartikelPublicationState === 'DRAFT' || vacPublicationState === 'DRAFT' ? 'DRAFT' : 'PUBLISHED';
  // Handle kennisartikel
  const products = data?.products?.data || [];
  const kennisartikel = products
    .map(({ attributes, id }: { attributes: Attributes; id: string }) => {
      const modifiedAttributes = {
        ...attributes,
        sections: [
          {
            content: attributes?.content,
            kennisartikelCategorie: 'inleiding',
            component: 'ComponentComponentsUtrechtRichText',
            categorie5: 'inleiding',
          } as ModifiedSection,
          ...attributes.sections,
        ],
      };
      return generateKennisartikelObject({
        attributes: modifiedAttributes,
        url: serverURL,
        id,
        publicationState: objectPublicationState,
      });
    })
    .find((item) => item.uuid === uuid) as KennisartikelObject;

  if (kennisartikel) return kennisartikel;

  // Handle VAC
  if (Array.isArray(vacData?.vacs?.data) && vacData.vacs.data.length > 0) {
    const vac = getVacData({ data: vacData, serverURL, vacSchemaURL, publicationState: objectPublicationState });
    return vac[0] as VACObject;
  }

  throw new Error('Object not found');
};
