/* eslint-disable no-undef */
import type { RequestHandler } from 'express';
import path from 'node:path';
import { readFile } from '../../utils';
export const objecttypesController: RequestHandler = async (req, res, next) => {
  try {
    const kennisartikelJSON = readFile(path.join(__dirname, '../../docs/kennisartikel.json'));
    const vacJSON = readFile(path.join(__dirname, '../../docs/vac.json'));
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
