import type { RequestHandler } from 'express';
import merge from 'lodash.merge';
import snakeCase from 'lodash.snakecase';
import { GET_VAC_ITEM_BY_UUID, UPDATE_VAC } from '../../queries';
import type { DataVacItem, VACSData } from '../../strapi-product-type';
import type { components } from '../../types/openapi';
import { fetchData, getCurrentTypeParam, getTheServerURL } from '../../utils';

type VACData = {
  data: {
    updateVac: {
      data: DataVacItem;
    };
  };
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
  const { isVac } = getCurrentTypeParam(body.type);

  // Check if UUID is provided
  if (!uuid) {
    return res.status(404).json({ message: 'UUID not provided' });
  }

  try {
    const vacUrl = new URL(`/api/v2/objects/${body?.uuid}`, serverURL).href;
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;

    if (!isVac) return res.status(400).json({ message: 'Type is not allowed' });

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
      vac: {
        vraag: existingVac.attributes.vac.vraag,
        antwoord: existingVac.attributes.vac.antwoord,
        status: existingVac.attributes.vac.status,
        doelgroep: existingVac.attributes.vac.doelgroep,
        uuid: existingVac.attributes.vac.uuid,
        afdelingen: existingVac.attributes.vac.afdelingen,
        toelichting: existingVac.attributes.vac.toelichting,
        trefwoorden: existingVac.attributes.vac.trefwoorden,
      },
    };

    const vacBody = {
      vac: {
        vraag: vac?.vraag,
        antwoord: vac?.antwoord,
        status: vac?.status,
        doelgroep: vac?.doelgroep ? snakeCase(vac.doelgroep) : undefined,
        afdelingen: vac?.afdelingen,
        toelichting: vac?.toelichting,
        trefwoorden: vac?.trefwoorden,
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

    return res.status(200).json({
      uuid: body?.uuid,
      type: vacSchemaURL,
      url: vacUrl,
      record: {
        index: parseInt(existingVac.id, 10),
        startAt: responseData.updateVac.data.attributes.createdAt,
        typeVersion: 3,
        data: {
          ...responseData.updateVac.data.attributes.vac,
          url: vacUrl,
        },
        geometry: null,
        endAt: null,
        registrationAt: responseData.updateVac.data.attributes.createdAt,
      },
    });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
