import type { RequestHandler } from 'express';
import { GET_ALL_PRODUCTS, GET_ALL_VAC_ITEMS, GET_PRODUCT_BY_UUID, GET_VAC_ITEM_BY_UUID } from '../../queries';
import type { StrapiProductType, VACSData } from '../../strapi-product-type';
import { fetchData, generateKennisartikelObject, getPaginatedResponse, getTheServerURL } from '../../utils';
export const getAllObjectsController: RequestHandler = async (req, res, next) => {
  try {
    const locale = req.query?.locale || 'nl';
    const type = (req.query?.type as string) || '';
    const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
    const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
    const serverURL = getTheServerURL(req);
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
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
        Authorization: `Bearer ${tokenAuth}`,
      },
    });
    // Fetch VACs data from GraphQL
    const { data: vacData } = await fetchData<{ data: VACSData }>({
      url: graphqlURL.href,
      query: GET_ALL_VAC_ITEMS,
      variables: { ...paginationParams },
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
      },
    });

    const vac = vacData?.vacs?.data?.map((item) => {
      const vacUrl = new URL(`/api/v2/objects/${item.attributes.vac.uuid}`, serverURL).href;
      return {
        uuid: item.attributes.vac.uuid,
        type: vacSchemaURL,
        url: vacUrl,
        record: {
          index: parseInt(item.id, 10),
          startAt: item.attributes.createdAt,
          typeVersion: 1,
          data: {
            ...item.attributes.vac,
            url: vacUrl,
          },
          geometry: null,
          endAt: null,
          registrationAt: item.attributes.createdAt,
        },
      };
    });

    const pagination = await getPaginatedResponse(req, data?.products);

    // Check if product data is available
    const products = data?.products?.data || [];

    if (products.length === 0) return res.status(200).json({ results: [] });
    const kennisartikel = products.map(({ attributes, id }) =>
      generateKennisartikelObject({ attributes, url: serverURL, id }),
    );

    // Set response content type
    res.set('Content-Type', 'application/json');

    // Send results based on the requested type
    if (type.endsWith('kennisartikel')) return res.status(200).json({ ...pagination, results: kennisartikel });

    if (type.endsWith('vac')) return res.status(200).json({ results: vac });

    // If no specific type, return both kennisartikel and vac objects
    if (vac.length > 0 && kennisartikel.length > 0)
      return res.status(200).json({ ...pagination, results: [...kennisartikel, ...vac] });
    if (vac.length > 0) return res.status(200).json({ ...pagination, results: [...vac] });
    if (kennisartikel.length > 0) return res.status(200).json({ ...pagination, results: [...kennisartikel] });
    return res.status(200).json({ ...pagination, results: [] });
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

    // Check if UUID is provided
    if (!uuid) {
      return res.status(404).json({ message: 'UUID not provided' });
    }

    const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
    const serverURL = getTheServerURL(req);
    const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
    const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
    // Fetch product data from GraphQL
    const { data } = await fetchData<any>({
      url: graphqlURL.href,
      query: GET_PRODUCT_BY_UUID,
      variables: { locale, uuid },
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
      },
    });
    // Fetch VACs data from GraphQL
    const { data: vacData } = await fetchData<{ data: VACSData }>({
      url: graphqlURL.href,
      query: GET_VAC_ITEM_BY_UUID,
      variables: { uuid },
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
      },
    });
    res.set('Content-Type', 'application/json');

    // Handle the case for a knowledge article (kennisartikel)
    const products = data?.products?.data || [];
    const kennisartikel = products
      .map(({ attributes, id }: any) => generateKennisartikelObject({ attributes, url: serverURL, id }))
      .find((item: { uuid: string }) => item.uuid === uuid);

    if (kennisartikel) {
      return res.status(200).json(kennisartikel); // Return to prevent further execution
    }

    // Handle the case for VAC data
    if (Array.isArray(vacData?.vacs?.data) && vacData.vacs.data.length > 0) {
      const vac = vacData?.vacs?.data?.map((item) => {
        const vacUrl = new URL(`/api/v2/objects/${item.attributes.vac.uuid}`, serverURL).href;
        return {
          uuid: item.attributes.vac.uuid,
          type: vacSchemaURL,
          url: vacUrl,
          record: {
            index: parseInt(item.id, 10),
            startAt: item.attributes.createdAt,
            typeVersion: 1,
            data: {
              ...item.attributes.vac,
              url: vacUrl,
            },
            geometry: null,
            endAt: null,
            registrationAt: item.attributes.createdAt,
          },
        };
      })[0];
      return res.status(200).json(vac); // Return to prevent further execution
    }

    // If no matching object found, return 404
    return res.status(404).json({ message: 'Object not found' });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
