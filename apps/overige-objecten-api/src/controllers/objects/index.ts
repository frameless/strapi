import { fetchData } from '@frameless/utils';
import type { RequestHandler } from 'express';

import { GET_ALL_PRODUCTS, GET_ALL_VAC_ITEMS } from '../../queries';
import { getObjectByUUID } from '../../service/object';
import type { components } from '../../types/openapi';
import { generateKennisartikelObject, getPaginatedResponse, getTheServerURL, getVacData } from '../../utils';
import type { PaginationType } from '../../utils';
import type { GetAllProductsQuery, GetAllVacItemsQuery } from '../../../gql/graphql';
import type { KennisartikelMetadata, PageSection, PriceItem } from '../../shared-types';

type GetKennisartikelReturnData = components['schemas']['ObjectData'];

const sum = (a: number, b: number): number => a + b;
const isFiniteNumber = (arg: unknown): arg is number => typeof arg === 'number' && isFinite(arg);
let results: any = [];
let pagination: PaginationType = {};
export const getAllObjectsController: RequestHandler = async (req, res, next) => {
  try {
    const locale = req.query?.locale || 'nl';
    const type = (req.query?.type as string) || '';
    const typeUrl = req.query?.type ? new URL(req.query?.type as string) : '';
    const isURL = typeof typeUrl === 'object';
    const isVac = isURL && typeUrl.pathname.split('/').includes('vac');
    const isKennisartikel = isURL && typeUrl.pathname.split('/').includes('kennisartikel');
    const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
    const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
    const serverURL = getTheServerURL(req);
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
    const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
    // default pagination prams
    const limit = parseInt(req.query?.limit as string, 10) || -1;
    const start = parseInt(req.query?.start as string, 10) || 0;
    const page = parseInt(req.query?.page as string, 10);
    const pageSize = parseInt(req.query?.pageSize as string, 10) || 100;
    // Validate page and pageSize
    const isValidPage = typeof page === 'number' && page > 0;
    const isValidPageSize = typeof pageSize === 'number' && pageSize > 0;
    const paginationParams = {
      page: isValidPage ? page : undefined,
      pageSize: isValidPageSize ? pageSize : undefined,
      limit: !isValidPage && !isValidPageSize ? limit : undefined,
      start: !isValidPage && !isValidPageSize ? start : undefined,
    };
    const fetchKennisartikelen = async () => {
      // Fetch product data from GraphQL
      const { data } = await fetchData<{ data: GetAllProductsQuery }>({
        url: graphqlURL.href,
        query: GET_ALL_PRODUCTS,
        variables: { locale, ...paginationParams },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      return data;
    };
    const getKennisartikelData = ({
      data,
    }: {
      data: GetAllProductsQuery | undefined;
    }): GetKennisartikelReturnData[] => {
      const products = data?.products_connection?.nodes ?? [];
      if (products.length === 0) return [];
      return products.map((product) => {
        const modifiedProduct = {
          ...product,
          sections: [
            {
              component: 'ComponentComponentsUtrechtRichText',
              content: product?.content,
              kennisartikelCategorie: 'inleiding',
              categorie5: 'inleiding',
            },
            ...(product.sections ?? []),
          ],
        };
        return generateKennisartikelObject({
          sections: (modifiedProduct.sections?.filter(Boolean) ?? []) as PageSection[],
          title: modifiedProduct.title,
          uuid: modifiedProduct?.uuid,
          locale: modifiedProduct.locale,
          updatedAt: modifiedProduct.updatedAt,
          createdAt: modifiedProduct.createdAt,
          metaTags: modifiedProduct.metaTags ?? null,
          kennisartikelMetadata: (modifiedProduct.kennisartikelMetadata as KennisartikelMetadata) ?? null,
          price: modifiedProduct.price
            ? {
                price: (modifiedProduct.price.price?.filter(Boolean) ?? []) as PriceItem[],
              }
            : null,
          additional_information: {
            content: {
              uuid: modifiedProduct.additional_information?.content?.uuid ?? '',
              // Map the content blocks to match your ContentBlock interface exactly
              contentBlock: (modifiedProduct.additional_information?.content?.contentBlock ?? [])
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
          id: modifiedProduct.id,
          url: serverURL,
          publicationState: 'PUBLISHED',
        });
      });
    };
    const fetchVac = async () => {
      // Fetch VACs data from GraphQL
      const { data } = await fetchData<{ data: GetAllVacItemsQuery }>({
        url: graphqlURL.href,
        query: GET_ALL_VAC_ITEMS,
        variables: { ...paginationParams },
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      return data;
    };
    // Set response content type
    res.set('Content-Type', 'application/json');
    // Send results based on the requested type
    if (isKennisartikel) {
      const data = await fetchKennisartikelen();
      pagination = await getPaginatedResponse(req, data?.products_connection?.pageInfo ?? undefined);
      const kennisartikelData = getKennisartikelData({ data });
      results = kennisartikelData;
    } else if (isVac) {
      const data = await fetchVac();
      const vac = getVacData({ data, serverURL, vacSchemaURL });
      pagination = await getPaginatedResponse(req, data?.vacs_connection?.pageInfo ?? undefined);
      results = vac;
    } else if (!type && !isVac && !isKennisartikel) {
      const productsData = await fetchKennisartikelen();
      const data = await fetchVac();
      const kennisartikelPagination = await getPaginatedResponse(
        req,
        productsData?.products_connection?.pageInfo ?? undefined,
      );
      const vacPagination = await getPaginatedResponse(req, data?.vacs_connection?.pageInfo ?? undefined);
      const count = [kennisartikelPagination?.count, vacPagination?.count].filter(isFiniteNumber).reduce(sum, 0);
      const total = [kennisartikelPagination?.total, vacPagination?.total].filter(isFiniteNumber).reduce(sum, 0);
      pagination = {
        ...kennisartikelPagination,
        ...vacPagination,
        count,
        total,
      };
      const kennisartikelData = getKennisartikelData({ data: productsData });
      const vac = getVacData({ data, serverURL, vacSchemaURL });
      results = [...kennisartikelData, ...vac];
    } else {
      pagination = {
        page: 0,
        pageSize: 0,
        total: 0,
        count: 0,
        next: null,
        previous: null,
      };
      results = [];
    }

    return res.status(200).json({ ...pagination, results });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};

export const getObjectByUUIDController: RequestHandler = async (req, res, next) => {
  try {
    const uuid = req.params?.uuid as string | undefined;
    const locale = (req.query?.locale as string) || 'nl';

    if (!uuid) {
      return res.status(404).json({ message: 'UUID not provided' });
    }

    const serverURL = getTheServerURL(req);

    const authHeader = req.headers?.authorization;
    const apiToken = authHeader?.startsWith('Token') ? authHeader.split(' ')[1] : authHeader;

    const object = await getObjectByUUID({
      uuid,
      locale,
      serverURL,
      apiToken,
    });

    return res.status(200).set('Content-Type', 'application/json').json(object);
  } catch (error: any) {
    if (error.message === 'UUID not provided' || error.message === 'Object not found') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
    return null;
  }
};
