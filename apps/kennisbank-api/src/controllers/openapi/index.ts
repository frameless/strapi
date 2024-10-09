import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import { getTheServerURL } from '../../utils';

type Server = {
  url: string;
  description: string;
};

export const openAPIController: RequestHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-undef
    const openAPIDocument: any = yaml.load(fs.readFileSync(path.join(__dirname, '../../docs/openapi.yaml'), 'utf8'));
    const openapiComponents = {
      schemas: {
        kennisartikel: {
          $ref: new URL('api/v1/objecttypes/kennisartikel', getTheServerURL(req)),
        },
        vac: {
          $ref: new URL('api/v1/objecttypes/vac', getTheServerURL(req)),
        },
      },
    };

    const openapiServers = openAPIDocument.servers.map((server: Server) => ({
      url: new URL('api/v1', getTheServerURL(req)),
      description: server.description,
    }));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    return res.json({ ...openAPIDocument, servers: openapiServers, components: openapiComponents });
  } catch (error) {
    next(error);
    return null;
  }
};
