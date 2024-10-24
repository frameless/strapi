import type { RequestHandler } from 'express';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_UUID } from '../../queries';
import type { StrapiProductType } from '../../strapi-product-type';
import { fetchData, generateKennisartikelObject, getPaginatedResponse, getTheServerURL, vacData } from '../../utils';

export const getAllObjectsController: RequestHandler = async (req, res, next) => {
  try {
    const locale = req.query?.locale || 'nl';
    const type = (req.query?.type as string) || '';
    const tokenAuth = req.headers?.authorization?.split(' ')[1];
    const serverURL = getTheServerURL(req);
    const kennisartikelSchemaURL = new URL('api/v1/objecttypes/kennisartikel', serverURL).href;
    const vacSchemaURL = new URL('api/v1/objecttypes/vac', serverURL).href;
    const vacObjects = vacData({ url: vacSchemaURL });
    const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
    // default pagination prams
    const limit = parseInt(req.query?.limit as string, 10) || -1;
    const start = parseInt(req.query?.start as string, 10) || 0;
    const page = parseInt(req.query?.page as string, 10);
    const pageSize = parseInt(req.query?.pageSize as string, 10);
    // Validate page and pageSize
    const isValidPage = typeof page === 'number' && page > 0;
    const isValidPageSize = typeof pageSize === 'number' && pageSize > 0;
    const paginationParams = {
      page: isValidPage ? page : undefined,
      pageSize: isValidPageSize ? pageSize : undefined,
      limit: !isValidPage && !isValidPageSize ? limit : undefined,
      start: !isValidPage && !isValidPageSize ? start : undefined,
    };
    // Fetch product data from GraphQL
    const { data } = await fetchData<StrapiProductType>({
      url: graphqlURL.href,
      query: GET_ALL_PRODUCTS,
      variables: { locale, ...paginationParams },
      headers: {
        Authorization: tokenAuth?.startsWith('Token') ? tokenAuth : `Token ${tokenAuth}`,
      },
    });

    const pagination = await getPaginatedResponse(req, data?.products);

    // Check if product data is available
    const products = data?.products?.data || [];

    if (products.length === 0) return res.status(200).json({ results: [] });
    const kennisartikel = products.map(({ attributes }) =>
      generateKennisartikelObject({ attributes, url: kennisartikelSchemaURL }),
    );

    // Set response content type
    res.set('Content-Type', 'application/json');

    // Send results based on the requested type
    if (type.endsWith('kennisartikel')) return res.status(200).json(kennisartikel);

    if (type.endsWith('vac')) return res.status(200).json(vacObjects);

    // If no specific type, return both kennisartikel and vac objects
    return res.status(200).json({ ...pagination, results: [...kennisartikel, ...vacObjects] });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};

export const getObjectByUUIDController: RequestHandler = async (req, res, next) => {
  try {
    const locale = req.query?.locale || 'nl';
    const uuid = req.params?.uuid;
    const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
    const serverURL = getTheServerURL(req);
    const tokenAuth = req.headers?.authorization?.split(' ')[1];
    const kennisartikelSchemaURL = new URL('api/v1/objecttypes/kennisartikel', serverURL).href;
    const vacSchemaURL = new URL('api/v1/objecttypes/vac', serverURL).href;

    // Fetch vac object based on UUID
    const vac = vacData({ url: vacSchemaURL }).find((item) => item.uuid === uuid);

    // Fetch product data from GraphQL
    const { data } = await fetchData<StrapiProductType>({
      url: graphqlURL.href,
      query: GET_PRODUCT_BY_UUID,
      variables: { locale, uuid },
      headers: {
        Authorization: tokenAuth?.startsWith('Token') ? tokenAuth : `Token ${tokenAuth}`,
      },
    });

    res.set('Content-Type', 'application/json');

    // Handle the case for a knowledge article (kennisartikel)
    const products = data?.products?.data || [];
    const kennisartikel = products
      .map(({ attributes }) => generateKennisartikelObject({ attributes, url: kennisartikelSchemaURL }))
      .find((item: { uuid: string }) => item.uuid === uuid);

    if (kennisartikel) return res.status(200).json(kennisartikel);

    // Handle the case for vac data
    if (vac) return res.status(200).json(vac);

    // If no matching object found, return 404
    return res.status(404).json({ message: 'Object not found' });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
    // Ensure function returns after calling next()
  }
};
