import fs from 'node:fs';

import type { RequestHandler } from 'express';
import yaml from 'js-yaml';

import { getTheServerURL, resolveDoc } from '../../utils';

import type { OpenAPI } from './types';

export const openAPIController: RequestHandler = async (req, res, next) => {
  try {
    const url = new URL('api/v2', getTheServerURL(req)).href;
    const OPEN_API_YAML = fs.readFileSync(resolveDoc('openapi.yaml'), 'utf8');

    if (!OPEN_API_YAML) throw new Error('openapi.yaml file not found');

    const openAPIDocument = yaml.load(OPEN_API_YAML) as OpenAPI;
    // Update server URLs
    const openapiServers = (openAPIDocument.servers || []).map((server) => ({
      url,
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
