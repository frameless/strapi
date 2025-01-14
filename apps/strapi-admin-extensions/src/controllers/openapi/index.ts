/* eslint-disable no-undef */
import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

export const openAPIController: RequestHandler = async (req, res, next) => {
  try {
    const serverURL = `${req.protocol}://${req.get('host')}`;
    const url = new URL('api/v2', serverURL).href;
    const OPEN_API_YAML = fs.readFileSync(path.join(__dirname, '../../docs/openapi.yaml'), 'utf8');

    if (!OPEN_API_YAML) throw new Error('openapi.yaml file not found');

    const openAPIDocument = yaml.load(OPEN_API_YAML) as any;
    // Update server URLs
    const openapiServers = (openAPIDocument.servers || []).map((server: any) => ({
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
