import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import path from 'node:path';
import { getTheServerURL, readFile } from '../../utils';

type Server = {
  url: string;
  description: string;
};

export const openAPIController: RequestHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-undef
    const openapiYAML = readFile(path.join(__dirname, '../../docs/openapi.yaml'));

    if (!openapiYAML) throw new Error('openapi.yaml file not found');

    const openAPIDocument: any = yaml.load(openapiYAML);
    const openapiServers = openAPIDocument.servers.map((server: Server) => ({
      url: new URL('api/v1', getTheServerURL(req)),
      description: server.description,
    }));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    return res.json({ ...openAPIDocument, servers: openapiServers });
  } catch (error) {
    next(error);
    return null;
  }
};
