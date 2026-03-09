import { Request, Response } from 'express';

import { errorRenderer } from '../../client/errorRenderer';
import { pageRenderer } from '../../client/pageRenderer';
import { getObjectByUUID } from '../../service/object';
import { KennisartikelObject, VACObject } from '../../types';
import { getTheServerURL } from '../../utils';

export const previewController = async (req: Request, res: Response) => {
  const { slug, secret, uuid } = req.query as {
    slug?: 'vac' | 'kennisartikelen';
    secret?: string;
    // status?: 'DRAFT' | 'PUBLISHED'; this will be enable when we migrate to Strapi v5 with draft and publish system
    uuid?: string;
  };
  const serverURL = getTheServerURL(req);

  if (!slug || !secret || !process.env.STRAPI_API_TOKEN) {
    return res.status(400).send('Missing query parameters');
  }

  if (secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  try {
    if (slug === 'vac') {
      const vacData = (await getObjectByUUID({
        uuid,
        locale: 'nl',
        apiToken: process.env.STRAPI_API_TOKEN,
        serverURL,
        publicationState: 'PREVIEW',
      })) as VACObject;

      return res.send(
        pageRenderer({
          vacData,
          status: vacData.publicationState,
        }),
      );
    }

    if (slug === 'kennisartikelen') {
      const kennisartikelData = (await getObjectByUUID({
        uuid,
        locale: 'nl',
        serverURL,
        publicationState: 'PREVIEW',
        apiToken: process.env.STRAPI_API_TOKEN,
      })) as KennisartikelObject;

      return res.send(
        pageRenderer({
          kennisartikelData,
          status: kennisartikelData.publicationState,
        }),
      );
    }

    return res.status(404).send('Unknown preview type');
  } catch (err: any) {
    if (err.message === 'Object not found') {
      return res.status(404).send(
        errorRenderer({
          title: '404 – Object niet gevonden',
          message: 'Het object dat je probeert te previewen bestaat niet.',
        }),
      );
    }
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).end(
      errorRenderer({
        title: '500 – Interne serverfout',
        message: 'Er is een fout opgetreden bij het laden van de preview.',
      }),
    );
  }
};
