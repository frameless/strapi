import type { RequestHandler } from 'express';
import snakeCase from 'lodash.snakecase';
import slugify from 'slugify';
import { v4 } from 'uuid';
import { CREATE_INTERNAL_FIELD, CREATE_KENNISARTIKEL, CREATE_VAC } from '../../queries';
import type { CreateInternalField, CreateProduct, CreateVacResponse } from '../../strapi-product-type';
import type { components } from '../../types/openapi';
import {
  fetchData,
  generateKennisartikelObject,
  getCurrentTypeParam,
  getTheServerURL,
  getVacData,
  mapContentByCategory,
} from '../../utils';

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
          trefwoorden: vac?.trefwoorden,
        },
      };
      const { data: responseData } = await fetchData<CreateVacResponse>({
        url: graphqlURL.href,
        query: CREATE_VAC,
        variables: { locale, data: vacPayload },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      const vacResponse = getVacData({
        data: {
          vacs: { data: [responseData.createVac.data] },
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
      const kennisartikelPayload = {
        title: kennisartikelNl?.titel,
        slug: slugify(kennisartikelNl?.titel as string, { lower: true }),
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
        const { data: internalResponse } = await fetchData<CreateInternalField>({
          url: graphqlURL.href,
          query: CREATE_INTERNAL_FIELD,
          variables: { locale, data: internalFieldPayload },
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
        // check if the internal field was created
        if (internalResponse?.createInternalField?.data?.attributes?.content?.id) {
          kennisartikelPayload.sections.push({
            __typename: 'ComponentComponentsInternalBlockContent',
            internal_field: internalResponse?.createInternalField?.data?.id,
            __component: 'components.internal-block-content',
          } as any);
        }
      }

      const { data: responseData } = await fetchData<{ data: CreateProduct }>({
        url: graphqlURL.href,
        query: CREATE_KENNISARTIKEL,
        variables: { locale, data: kennisartikelPayload },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });

      const results = generateKennisartikelObject({
        attributes: responseData?.createProduct?.data?.attributes,
        url: serverURL,
        id: responseData?.createProduct?.data?.id,
      });
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
