import { fetchData } from '@frameless/utils';
import type { RequestHandler } from 'express';
import merge from 'lodash.merge';
import snakeCase from 'lodash.snakecase';
import slugify from 'slugify';

import {
  GET_INTERNAL_FIELD_BY_UUID,
  GET_PRODUCT_MUTATION_BASE,
  GET_VAC_ITEM_BY_UUID,
  UPDATE_INTERNAL_FIELD,
  UPDATE_KENNISARTIKEL,
  UPDATE_VAC,
} from '../../queries';
import type { components } from '../../types/openapi';
import type {
  GetInternalFieldsQuery,
  GetProductByUuidOrDocumentIdQuery,
  GetVacItemByUuidOrDocumentIdQuery,
  UpdateInternalFieldMutation,
  UpdateKennisartikelMutation,
  UpdateVacMutation,
} from '../../../gql/graphql';
import {
  createComponentGuard,
  generateKennisartikelObject,
  getCurrentTypeParam,
  getTheServerURL,
  getVacData,
  mapContentByCategory,
} from '../../utils';
import type { KennisartikelMetadata, PageSection, PriceItem } from '../../shared-types';

type VACData = {
  data: UpdateVacMutation;
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
      const { data: vacData } = await fetchData<{ data: GetVacItemByUuidOrDocumentIdQuery }>({
        url: graphqlURL.href,
        query: GET_VAC_ITEM_BY_UUID,
        variables: { uuid },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const existingVacs = vacData?.vacs ?? [];
      if (existingVacs.length === 0) return res.status(404).json({ message: 'Object not found' });
      const existingVac = existingVacs[0];
      const vacID = existingVac?.id;
      const currentVACObject = {
        publishedAt: existingVac?.createdAt,
        title: existingVac?.title,
        vac: {
          antwoord: existingVac?.vac?.antwoord,
          status: existingVac?.vac?.status,
          doelgroep: existingVac?.vac?.doelgroep,
          uuid: existingVac?.vac?.uuid,
          afdelingen: existingVac?.vac?.afdelingen,
          toelichting: existingVac?.vac?.toelichting,
          keywords: existingVac?.vac?.keywords,
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
      const updatedVacNode = responseData.updateVac;
      const vacResponse = updatedVacNode
        ? getVacData({
            data: {
              vacs_connection: {
                nodes: [
                  {
                    ...updatedVacNode,
                    contact_information_internal: [],
                    relatedVACs: [],
                    relatedProducts: [],
                  },
                ],
                pageInfo: { total: 1, page: 1, pageSize: 1, pageCount: 1 },
              },
            },
            serverURL,
            vacSchemaURL,
          })
        : [];
      response = vacResponse[0];
    } else if (isKennisartikel) {
      const kennisartikel = body?.record?.data as components['schemas']['kennisartikel'];
      const kennisartikelNl = kennisartikel?.vertalingen?.find(({ taal }) => taal === 'nl');
      const kennisartikelenBlocks = Object.entries(kennisartikelNl || {})
        .map(([key, value]) => {
          if (typeof value !== 'string') return null;
          const mappedContent = mapContentByCategory(key, value, categoryToKeyMap);
          if (Object.keys(mappedContent).length === 0) return null;
          const [kennisartikelCategorie, content] = Object.entries(mappedContent)[0];
          return { content, kennisartikelCategorie, __typename: 'ComponentComponentsUtrechtRichText' as const };
        })
        .filter(Boolean);
      const deskMemo = kennisartikelNl?.deskMemo;

      // Fetch product data from GraphQL
      const { data } = await fetchData<{ data: GetProductByUuidOrDocumentIdQuery }>({
        url: graphqlURL.href,
        query: GET_PRODUCT_MUTATION_BASE,
        variables: { locale, uuid },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const existingProduct = (data?.products ?? []).filter(Boolean)[0];
      if (!existingProduct) return res.status(404).json({ message: 'Object not found' });

      const isInternalBlock = createComponentGuard('ComponentComponentsInternalBlockContent');
      const internalFieldSection = (existingProduct.sections ?? [])
        .filter((section): section is PageSection => Boolean(section))
        .find(isInternalBlock);
      const internalFieldContent = internalFieldSection?.internal_field?.content;

      const existingKennisartikel = {
        title: existingProduct.title,
        slug: existingProduct.slug,
        uuid: existingProduct.uuid,
        metaTags: existingProduct.metaTags,
        sections: (existingProduct.sections ?? [])
          .filter((section): section is PageSection => !!section)
          .filter((s) => !isInternalBlock(s)),
        kennisartikelMetadata: existingProduct.kennisartikelMetadata,
      };
      const kennisartikelBody = {
        title: kennisartikelNl?.titel,
        slug: kennisartikelNl?.titel ? slugify(kennisartikelNl.titel, { lower: true }) : undefined,
        uuid: existingProduct.uuid,
        metaTags: {
          keymatch: kennisartikelNl?.trefwoorden?.map((trefwoord) => trefwoord.trefwoord).join(','),
          title: kennisartikelNl?.titel,
          description: ' ',
        },
        sections: kennisartikelenBlocks,
        kennisartikelMetadata: {
          uuid: existingProduct.kennisartikelMetadata?.uuid,
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
        const { data: existingInternalFieldData } = await fetchData<{ data: GetInternalFieldsQuery }>({
          url: graphqlURL.href,
          query: GET_INTERNAL_FIELD_BY_UUID,
          variables: { locale, uuid: internalFieldContent.uuid },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
        const existingInternalField = (existingInternalFieldData?.internalFields ?? []).filter(Boolean)[0];
        const existingInternalFieldContentBlock = existingInternalField?.content?.contentBlock;
        const internalFieldPayload = {
          title: existingInternalField?.title,
          content: {
            uuid: existingInternalField?.content?.uuid,
            contentBlock: deskMemo ? [{ content: deskMemo }] : existingInternalFieldContentBlock,
          },
        };
        (kennisartikelPayload.sections as unknown[]).push({
          __typename: 'ComponentComponentsInternalBlockContent',
          internal_field: existingInternalField?.id,
          __component: 'components.internal-block-content',
        });
        await fetchData<{ data: UpdateInternalFieldMutation }>({
          url: graphqlURL.href,
          query: UPDATE_INTERNAL_FIELD,
          variables: { locale, data: internalFieldPayload, id: existingInternalField?.id },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
      }
      const { data: updatedKennisartikel } = await fetchData<{ data: UpdateKennisartikelMutation }>({
        url: graphqlURL.href,
        query: UPDATE_KENNISARTIKEL,
        variables: { locale, data: kennisartikelPayload, id: existingProduct?.id },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const kennisartikelResponse = updatedKennisartikel.updateProduct;

      const results = updatedKennisartikel?.updateProduct
        ? generateKennisartikelObject({
            sections: (kennisartikelResponse?.sections?.filter(Boolean) ?? []) as PageSection[],
            title: kennisartikelResponse?.title,
            uuid: kennisartikelResponse?.uuid,
            locale: kennisartikelResponse?.locale ?? 'nl',
            updatedAt: kennisartikelResponse?.updatedAt,
            createdAt: kennisartikelResponse?.createdAt,
            metaTags: kennisartikelResponse?.metaTags ?? null,
            kennisartikelMetadata: (kennisartikelResponse?.kennisartikelMetadata as KennisartikelMetadata) ?? null,
            price: kennisartikelResponse?.price
              ? {
                  price: (kennisartikelResponse.price.price?.filter(Boolean) ?? []) as PriceItem[],
                }
              : null,
            additional_information: {
              content: {
                uuid: kennisartikelResponse?.additional_information?.content?.uuid ?? '',
                // Map the content blocks to match your ContentBlock interface exactly
                contentBlock: (kennisartikelResponse?.additional_information?.content?.contentBlock ?? [])
                  .filter((block): block is NonNullable<typeof block> => block !== null)
                  .map((block) => ({
                    id: block.id,
                    content: block.content,
                    // Map the GraphQL 'categorie10' to the required 'kennisartikelCategorie'
                    kennisartikelCategorie: block.categorie10 ?? 'onbekend',
                    categorie10: block.categorie10,
                    component: 'ComponentComponentsUtrechtRichText' as const,
                  })),
              },
            },
            id: kennisartikelResponse?.id,
            url: serverURL,
            publicationState: 'PUBLISHED',
          })
        : null;
      response = results;
    }
    return res.status(200).json(response);
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
