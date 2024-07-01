// TODO: Create actual WCAG 2.2 data

import { successCriteria as wcag21 } from './wcag21';

export const successCriteria = wcag21.map((obj) => ({
  ...obj,
  url: obj.url.replace(/WCAG21/i, 'WCAG22'),
}));
