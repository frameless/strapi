import fs from 'node:fs';

import type { RequestHandler } from 'express';

import { resolveDoc } from '../../utils';

export const objecttypesController: RequestHandler = async (req, res, next) => {
  try {
    const vacJSON = fs.readFileSync(resolveDoc('vac.json'), 'utf8');
    const kennisartikelJSON = fs.readFileSync(resolveDoc('kennisartikel.json'), 'utf8');
    const type = req.params.type as string;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200);

    if (!kennisartikelJSON || !vacJSON) {
      throw new Error('JSON file not found');
    }
    if (type === 'kennisartikel') {
      return res.json(JSON.parse(kennisartikelJSON));
    } else if (type === 'vac') {
      return res.json(JSON.parse(vacJSON));
    } else {
      return res.status(400).json({ error: 'Invalid type parameter' });
    }
  } catch (error) {
    next(error);
    return null;
  }
};
