import type { RequestHandler } from 'express';
import merge from 'lodash.merge';
import snakeCase from 'lodash.snakecase';
import slugify from 'slugify';
import {
  GET_INTERNAL_FIELD_BY_UUID,
  GET_PRODUCT_BY_UUID,
  GET_VAC_ITEM_BY_UUID,
  UPDATE_INTERNAL_FIELD,
  UPDATE_KENNISARTIKEL,
  UPDATE_VAC,
} from '../../queries';
import type { DataVacItem, InternalFieldQuery, StrapiProductType, VACSData } from '../../strapi-product-type';
import type { components } from '../../types/openapi';
import {
  fetchData,
  generateKennisartikelObject,
  getCurrentTypeParam,
  getTheServerURL,
  getVacData,
  mapContentByCategory,
} from '../../utils';

type VACData = {
  data: {
    updateVac: {
      data: DataVacItem;
    };
  };
};

const categoryToKeyMap: { [key: string]: string } = {
  bewijs: 'bewijs',
  bezwaarEnBeroep: 'bezwaar',
  contact: 'contact',
  kostenEnBetaalmethoden: 'kosten',
  notice: 'bijzonderheden',
  procedureBeschrijving: 'aanvraag',
  tekst: 'inleiding',
  uitersteTermijn: 'termijn',
  vereisten: 'voorwaarden',
  wtdBijGeenReactie: 'wat te doen bij geen reactie',
};

export const updateVacController: RequestHandler = async (req, res, next) => {
  const body = req.body as components['schemas']['ObjectData'];
  const vac = body?.record?.data as components['schemas']['vac'];
  const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
  const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
  const locale = req.query?.locale || 'nl';
  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
  const serverURL = getTheServerURL(req);
  const uuid = req.params?.uuid;
  const { isVac, isKennisartikel } = getCurrentTypeParam(body.type);
  let response: any;
  // Check if UUID is provided
  if (!uuid) {
    return res.status(404).json({ message: 'UUID not provided' });
  }
  try {
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;

    if (!isVac && !isKennisartikel) return res.status(400).json({ message: 'Type is not allowed' });
    if (isVac) {
      const { data: vacData } = await fetchData<{ data: VACSData }>({
        url: graphqlURL.href,
        query: GET_VAC_ITEM_BY_UUID,
        variables: { uuid },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      if (vacData?.vacs?.data?.length === 0) return res.status(404).json({ message: 'Object not found' });
      const existingVac = vacData.vacs.data[0];
      const vacID = existingVac.id;
      const currentVACObject = {
        publishedAt: existingVac.attributes.createdAt,
        title: existingVac.attributes?.title,
        vac: {
          antwoord: existingVac.attributes.vac.antwoord,
          status: existingVac.attributes.vac.status,
          doelgroep: existingVac.attributes.vac.doelgroep,
          uuid: existingVac.attributes.vac.uuid,
          afdelingen: existingVac.attributes.vac.afdelingen,
          toelichting: existingVac.attributes.vac.toelichting,
          keywords: existingVac.attributes.vac.keywords,
        },
      };
      const vacBody = {
        title: vac?.vraag,
        vac: {
          antwoord: [
            {
              content: vac?.antwoord,
            },
          ],
          status: vac?.status,
          doelgroep: vac?.doelgroep ? snakeCase(vac.doelgroep) : undefined,
          afdelingen: vac?.afdelingen,
          toelichting: vac?.toelichting,
          keywords: vac?.trefwoorden?.map(({ trefwoord }) => trefwoord).join(' ,'),
        },
      };
      const vacPayload = merge(currentVACObject, vacBody);
      const { data: responseData } = await fetchData<VACData>({
        url: graphqlURL.href,
        query: UPDATE_VAC,
        variables: { locale, data: vacPayload, id: vacID },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const vacResponse = getVacData({
        data: {
          vacs: { data: [responseData.updateVac.data] },
        },
        serverURL,
        vacSchemaURL,
      });
      response = vacResponse[0];
    } else if (isKennisartikel) {
      const kennisartikel = body?.record?.data as components['schemas']['kennisartikel'];
      const kennisartikelNl = kennisartikel?.vertalingen?.find(({ taal }) => taal === 'nl');
      const kennisartikelenBlocks = Object.entries(kennisartikelNl || {})
        .map(([key, value]) => {
          const mappedContent = mapContentByCategory(key, value as any, categoryToKeyMap);
          if (Object.keys(mappedContent).length === 0) return null;
          const [kennisartikelCategorie, content] = Object.entries(mappedContent)[0];
          return { content, kennisartikelCategorie, __typename: 'ComponentComponentsUtrechtRichText' };
        })
        .filter(Boolean);
      const deskMemo = kennisartikelNl?.deskMemo;

      // Fetch product data from GraphQL
      const { data } = await fetchData<StrapiProductType>({
        url: graphqlURL.href,
        query: GET_PRODUCT_BY_UUID,
        variables: { locale, uuid },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const existingKennisartikelData = data?.products?.data[0]?.attributes;
      if (!existingKennisartikelData) return res.status(404).json({ message: 'Object not found' });

      const internalFieldContent = data.products.data[0]?.attributes?.sections?.find(
        ({ component }) => component === 'ComponentComponentsInternalBlockContent',
      )?.internal_field.data?.attributes?.content;

      const existingKennisartikel = {
        title: existingKennisartikelData?.title,
        slug: existingKennisartikelData?.slug,
        uuid: existingKennisartikelData?.uuid,
        metaTags: existingKennisartikelData?.metaTags,
        sections: existingKennisartikelData.sections.filter(
          ({ component }) => component !== 'ComponentComponentsInternalBlockContent',
        ),
        kennisartikelMetadata: existingKennisartikelData.kennisartikelMetadata,
      };
      const kennisartikelBody = {
        title: kennisartikelNl?.titel,
        slug: kennisartikelNl?.titel ? slugify(kennisartikelNl.titel, { lower: true }) : undefined,
        uuid: existingKennisartikelData.uuid,
        metaTags: {
          keymatch: kennisartikelNl?.trefwoorden?.map((trefwoord) => trefwoord.trefwoord).join(','),
          title: kennisartikelNl?.titel,
          description: ' ',
        },
        sections: kennisartikelenBlocks,
        kennisartikelMetadata: {
          uuid: existingKennisartikelData.kennisartikelMetadata.uuid,
          afdelingen: kennisartikel.afdelingen?.map(({ afdelingNaam, afdelingId }) => ({
            afdelingId: afdelingId,
            afdelingNaam,
          })),
          doelgroep: snakeCase(kennisartikel.doelgroep),
          productAanwezig: kennisartikel.productAanwezig,
          productValtOnder: kennisartikel.productValtOnder,
          verantwoordelijkeOrganisatie: kennisartikel.verantwoordelijkeOrganisatie,
          upnUri: kennisartikel.upnUri,
        },
      };
      const kennisartikelPayload = merge(existingKennisartikel, kennisartikelBody);
      if (internalFieldContent?.uuid) {
        const { data: existingInternalFieldData } = await fetchData<{ data: InternalFieldQuery }>({
          url: graphqlURL.href,
          query: GET_INTERNAL_FIELD_BY_UUID,
          variables: { locale, uuid: internalFieldContent.uuid },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
        const existingInternalFieldContentBlock =
          existingInternalFieldData?.internalFields?.data[0]?.attributes?.content?.contentBlock;
        const internalFieldPayload = {
          title: kennisartikelPayload?.title,
          content: {
            uuid: existingInternalFieldData?.internalFields?.data[0]?.attributes?.content?.uuid,
            contentBlock: deskMemo ? [{ content: deskMemo }] : existingInternalFieldContentBlock,
          },
        };
        kennisartikelPayload.sections.push({
          __typename: 'ComponentComponentsInternalBlockContent',
          internal_field: existingInternalFieldData?.internalFields?.data[0]?.id,
          __component: 'components.internal-block-content',
        } as any);
        await fetchData<any>({
          url: graphqlURL.href,
          query: UPDATE_INTERNAL_FIELD,
          variables: { locale, data: internalFieldPayload, id: existingInternalFieldData?.internalFields?.data[0]?.id },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
      }
      const { data: updatedKennisartikel } = await fetchData<{ data: any }>({
        url: graphqlURL.href,
        query: UPDATE_KENNISARTIKEL,
        variables: { locale, data: kennisartikelPayload, id: data?.products?.data[0]?.id },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const results = generateKennisartikelObject({
        attributes: updatedKennisartikel?.updateProduct?.data?.attributes,
        url: serverURL,
        id: updatedKennisartikel?.updateProduct?.data?.id,
      });
      response = results;
    }
    return res.status(200).json(response);
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
