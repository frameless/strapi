import type { RequestHandler } from 'express';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

export const objecttypesController: RequestHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-undef
    const openAPIDocument: any = yaml.load(fs.readFileSync(path.join(__dirname, '../../docs/openapi.yaml'), 'utf8'));
    const type = req.params.type as string;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);
    if (!type) return res.status(400).json({ error: 'Missing type parameter' });
    if (type === 'kennisartikel') {
      return res.json(openAPIDocument.components.schemas['Kennisartikel']);
    } else {
      return res.json(openAPIDocument.components.schemas['VAC']);
    }
  } catch (error) {
    next(error);
    return null;
  }
};
