// TODO: Reorder WCAG 2.2 data so it shows in between WCAG 2.1 issues

import { successCriteria as wcag21 } from './wcag21';

export const successCriteria = [
  ...wcag21.map((obj) => ({
    ...obj,
    url: obj.url.replace(/WCAG21/i, 'WCAG22'),
  })),
  {
    sc: '2.4.11',
    title: 'Focus Not Obscured (Minimum)',
    url: 'https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum',
    conformance: 'AA',
    nl: {
      title: 'Focus niet bedekt (minimum)',
    },
  },
  {
    sc: '2.4.12',
    title: 'Focus Not Obscured (Enhanced)',
    url: 'https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced',
    conformance: 'AAA',
    nl: {
      title: 'Focus niet bedekt (uitgebreid)',
    },
  },
  {
    sc: '2.4.13',
    title: 'Focus Appearance',
    url: 'https://www.w3.org/TR/WCAG22/#focus-appearance',
    conformance: 'AAA',
    nldesignsystem: true,
    nl: {
      title: 'Focusweergave',
    },
  },
  {
    sc: '2.5.7',
    title: 'Dragging Movements',
    url: 'https://www.w3.org/TR/WCAG22/#dragging-movements',
    conformance: 'AA',
    nl: {
      title: 'Sleepbewegingen',
    },
  },
  {
    sc: '2.5.8',
    title: 'Target Size (minimum)',
    url: 'https://www.w3.org/TR/WCAG22/#target-size-minimum',
    conformance: 'AA',
    nl: {
      title: 'Grootte van het aanwijsgebied (minimum)',
    },
  },
  {
    sc: '3.2.6',
    title: 'Consistent Help',
    url: 'https://www.w3.org/TR/WCAG22/#consistent-help',
    conformance: 'A',
    nl: {
      title: 'Consistente hulp',
    },
  },
  {
    sc: '3.3.7',
    title: 'Redundant Entry',
    url: 'https://www.w3.org/TR/WCAG22/#redundant-entry',
    conformance: 'A',
    nl: {
      title: 'Overbodige invoer',
    },
  },
  {
    sc: '3.3.8',
    title: 'Accessible Authentication (Minimum)',
    url: 'https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum',
    conformance: 'AA',
    nl: {
      title: 'Toegankelijke authenticatie (minimum)',
    },
  },
  {
    sc: '3.3.9',
    title: 'Accessible Authentication (Enhanced)',
    url: 'https://www.w3.org/TR/WCAG22/#accessible-authentication-enhanced',
    conformance: 'AAA',
    nl: {
      title: 'Toegankelijke authenticatie (uitgebreid)',
    },
  },
];
