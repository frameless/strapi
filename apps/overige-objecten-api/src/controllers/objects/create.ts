import type { RequestHandler } from 'express';
import snakeCase from 'lodash.snakecase';
import { v4 } from 'uuid';
import { CREATE_VAC } from '../../queries';
import type { DataVacItem } from '../../strapi-product-type';
import type { components } from '../../types/openapi';
import { fetchData, getCurrentTypeParam, getTheServerURL } from '../../utils';

type VACData = {
  data: {
    createVac: {
      data: DataVacItem;
    };
  };
};

export const createVacController: RequestHandler = async (req, res, next) => {
  const isAuthHasToken = req.headers?.authorization?.startsWith('Token');
  const tokenAuth = isAuthHasToken ? req.headers?.authorization?.split(' ')[1] : req.headers?.authorization;
  const locale = req.query?.locale || 'nl';
  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
  const serverURL = getTheServerURL(req);

  try {
    const body = req.body as components['schemas']['ObjectData'];
    const vac = body?.record?.data as components['schemas']['vac'];
    const vacSchemaURL = new URL('api/v2/objecttypes/vac', serverURL).href;
    const { isVac } = getCurrentTypeParam(body.type);

    if (!isVac) {
      return res.status(400).json({ message: 'Type is not allowed' });
    }

    const vacPayload = {
      publishedAt: new Date(),
      vac: {
        vraag: vac?.vraag,
        antwoord: vac?.antwoord,
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

    const { data: responseData } = await fetchData<VACData>({
      url: graphqlURL.href,
      query: CREATE_VAC,
      variables: { locale, data: vacPayload },
      headers: {
        Authorization: `Bearer ${tokenAuth}`,
      },
    });
    const uuid = responseData?.createVac?.data?.attributes?.vac?.uuid;
    const createdAt = responseData?.createVac?.data?.attributes?.createdAt;
    const vacUrl = new URL(`/api/v2/objects/${uuid}`, serverURL).href;

    return res.status(201).json({
      uuid,
      type: vacSchemaURL,
      url: vacUrl,
      record: {
        index: parseInt(responseData?.createVac?.data?.id, 10),
        startAt: createdAt,
        typeVersion: 3,
        data: {
          ...responseData?.createVac?.data?.attributes?.vac,
          url: vacUrl,
        },
        geometry: null,
        endAt: null,
        registrationAt: createdAt,
      },
    });
  } catch (error) {
    // Forward any errors to the error handler middleware
    next(error);
    return null;
  }
};
