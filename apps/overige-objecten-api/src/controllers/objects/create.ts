import { fetchData } from '@frameless/utils';
import type { RequestHandler } from 'express';
import snakeCase from 'lodash.snakecase';
import slugify from 'slugify';
import { v4 } from 'uuid';

import { CREATE_INTERNAL_FIELD, CREATE_KENNISARTIKEL, CREATE_VAC } from '../../queries';
import type { components } from '../../types/openapi';
import type { CreateInternalFieldMutation, CreateKennisartikelMutation, CreateVacMutation } from '../../../gql/graphql';
import {
  generateKennisartikelObject,
  getCurrentTypeParam,
  getTheServerURL,
  getVacData,
  mapContentByCategory,
} from '../../utils';
import type { KennisartikelMetadata, PageSection, PriceItem } from '../../shared-types';

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

export const createVacController: RequestHandler = async (req, res, next) => {
  let response;
  try {
    const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
    const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
    const locale = req.query?.locale || 'nl';
    const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
    const serverURL = getTheServerURL(req);
    const body = req.body as components['schemas']['ObjectData'];
    const { isVac, isKennisartikel } = getCurrentTypeParam(body.type);

    if (isVac) {
      const vac = body?.record?.data as components['schemas']['vac'];
      const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
      const vacPayload = {
        title: vac?.vraag,
        vac: {
          antwoord: {
            content: vac?.antwoord,
          },
          doelgroep: snakeCase(vac?.doelgroep),
          uuid: v4(),
          status: vac?.status,
          afdelingen: vac?.afdelingen?.map(({ afdelingNaam }) => ({
            afdelingId: v4(),
            afdelingNaam,
          })),
          toelichting: vac?.toelichting,
          keywords: vac?.trefwoorden?.map(({ trefwoord }) => trefwoord).join(' ,'),
        },
      };
      const { data: responseData } = await fetchData<{ data: CreateVacMutation }>({
        url: graphqlURL.href,
        query: CREATE_VAC,
        variables: { locale, data: vacPayload },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const vacNode = responseData.createVac;
      const vacResponse = vacNode
        ? getVacData({
            data: {
              vacs_connection: {
                nodes: [
                  {
                    ...vacNode,
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
      if (!body?.record?.data) {
        return res.status(400).json({ message: 'Missing record.data' });
      }
      const kennisartikel = body?.record?.data as components['schemas']['kennisartikel'];
      if (!kennisartikel?.vertalingen?.length) {
        return res.status(400).json({ message: 'Missing vertalingen' });
      }
      const kennisartikelNl = kennisartikel?.vertalingen?.find(({ taal }) => taal === 'nl');
      if (!kennisartikelNl) {
        return res.status(400).json({ message: 'Missing nl translation' });
      }
      const kennisartikelenBlocks = Object.entries(kennisartikelNl || {})
        .map(([key, value]) => {
          if (typeof value !== 'string') return null;
          const mappedContent = mapContentByCategory(key, value, categoryToKeyMap);
          if (Object.keys(mappedContent).length === 0) return null;
          const [kennisartikelCategorie, content] = Object.entries(mappedContent)[0];
          return { content, kennisartikelCategorie, __typename: 'ComponentComponentsUtrechtRichText' };
        })
        .filter(Boolean);
      const deskMemo = kennisartikelNl?.deskMemo;
      if (!kennisartikelNl.titel) {
        return res.status(400).json({ message: 'titel is required' });
      }
      const kennisartikelPayload = {
        title: kennisartikelNl.titel,
        slug: slugify(kennisartikelNl.titel, { lower: true }),
        uuid: v4(),
        metaTags: {
          keymatch: kennisartikelNl?.trefwoorden?.map((trefwoord) => trefwoord.trefwoord).join(','),
          title: kennisartikelNl?.titel,
          description: ' ', // This field is required and essential for the product page but is not used in the Overige-Objecten API.
        },
        sections: kennisartikelenBlocks,
        kennisartikelMetadata: {
          uuid: v4(),
          afdelingen: kennisartikel.afdelingen?.map(({ afdelingNaam }) => ({
            afdelingId: v4(),
            afdelingNaam,
          })),
          doelgroep: snakeCase(kennisartikel.doelgroep),
          productAanwezig: kennisartikel.productAanwezig,
          productValtOnder: kennisartikel.productValtOnder,
          verantwoordelijkeOrganisatie: kennisartikel.verantwoordelijkeOrganisatie,
          upnUri: kennisartikel.upnUri,
        },
      };

      const internalFieldPayload = {
        title: kennisartikelNl?.titel,
        content: {
          uuid: v4(),
          contentBlock: {
            content: deskMemo,
          },
        },
      };
      if (deskMemo) {
        const { data: internalResponse } = await fetchData<{ data: CreateInternalFieldMutation }>({
          url: graphqlURL.href,
          query: CREATE_INTERNAL_FIELD,
          variables: { locale, data: internalFieldPayload },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
        // check if the internal field was created
        if (internalResponse?.createInternalField?.content?.id) {
          kennisartikelPayload.sections.push({
            __typename: 'ComponentComponentsInternalBlockContent',
            internal_field: internalResponse?.createInternalField.id,
            __component: 'components.internal-block-content',
          } as any);
        }
      }

      const { data: responseData } = await fetchData<{ data: CreateKennisartikelMutation }>({
        url: graphqlURL.href,
        query: CREATE_KENNISARTIKEL,
        variables: { locale, data: kennisartikelPayload },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });

      const createdProduct = responseData?.createProduct;
      const results = createdProduct
        ? generateKennisartikelObject({
            url: serverURL,
            sections: (createdProduct.sections?.filter(Boolean) ?? []) as PageSection[],
            title: createdProduct.title,
            uuid: createdProduct?.uuid,
            locale: createdProduct.locale,
            updatedAt: createdProduct.updatedAt,
            createdAt: createdProduct.createdAt,
            metaTags: createdProduct.metaTags ?? null,
            kennisartikelMetadata: (createdProduct.kennisartikelMetadata as KennisartikelMetadata) ?? null,
            price: createdProduct.price
              ? {
                  price: (createdProduct.price.price?.filter(Boolean) ?? []) as PriceItem[],
                }
              : null,
            additional_information: {
              content: {
                uuid: createdProduct.additional_information?.content?.uuid ?? '',
                // Map the content blocks to match your ContentBlock interface exactly
                contentBlock: (createdProduct.additional_information?.content?.contentBlock ?? [])
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
            id: createdProduct?.id,
            publicationState: 'PUBLISHED',
          })
        : null;
      response = results;
    } else {
      return res.status(400).json({ message: 'Type is not allowed' });
    }
    return res.status(201).json(response);
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
