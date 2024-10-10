import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

export const openAPIController: RequestHandler = async (_req, res, next) => {
  try {
    // eslint-disable-next-line no-undef
    const openAPIDocument: any = yaml.load(fs.readFileSync(path.join(__dirname, '../../docs/openapi.yaml'), 'utf8'));
    const openapiServers = openAPIDocument.servers.map((server: any) => {
      return {
        url: new URL('api/v1', process.env.STRAPI_PRIVATE_URL).href,
        description: server.description,
      };
    });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    return res.json({ ...openAPIDocument, servers: openapiServers });
  } catch (error) {
    next(error);
    return null;
  }
};
