/* eslint-disable no-undef */
import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import path from 'node:path';
import type { OpenAPI } from './types';
import { getTheServerURL, readFile } from '../../utils';

export const openAPIController: RequestHandler = async (req, res, next) => {
  try {
    const url = new URL('api/v2', getTheServerURL(req)).href;
    const OBJECT_TYPE_ENUM = [`${url}/objecttypes/kennisartikel`, `${url}/objecttypes/vac`];
    const OPEN_API_YAML = readFile(path.join(__dirname, '../../docs/openapi.yaml'));

    if (!OPEN_API_YAML) throw new Error('openapi.yaml file not found');

    const openAPIDocument = yaml.load(OPEN_API_YAML) as OpenAPI;
    // Update server URLs
    const openapiServers = (openAPIDocument.servers || []).map((server) => ({
      url,
      description: server.description,
    }));
    // Update enum for specific endpoint parameter
    const typeParameter = openAPIDocument.paths['/objects']?.get?.parameters?.find(
      (parameter) => parameter.name === 'type',
    );
    if (typeParameter?.schema) {
      typeParameter.schema.enum = OBJECT_TYPE_ENUM;
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    return res.json({ ...openAPIDocument, servers: openapiServers });
  } catch (error) {
    next(error);
    return null;
  }
};
