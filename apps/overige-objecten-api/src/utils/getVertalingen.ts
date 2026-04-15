import type { PriceItem } from '../shared-types';
import type { components } from '../types/openapi';

import { renderMarkdownToString } from './renderMarkdownToString';

type Vertaling = NonNullable<components['schemas']['kennisartikel']['vertalingen']>[number];

type Trefwoorden = {
  trefwoord: string;
};
type BothContentBlock = {
  [key: string]: string;
};
export interface GetVertalingenProps {
  bothContentBlock: BothContentBlock;
  deskMemo: string;
  priceData?: PriceItem[];
  locale?: string;
  title?: string;
  updatedAt?: string;
  trefwoorden?: Trefwoorden[];
}

export const getVertalingen = ({
  bothContentBlock,
  deskMemo,
  priceData,
  locale,
  title,
  updatedAt,
  trefwoorden,
}: GetVertalingenProps): Vertaling[] => [
  {
    ...bothContentBlock,
    deskMemo: renderMarkdownToString({ priceData, children: deskMemo }),
    trefwoorden,
    taal: (locale ?? 'nl') as 'nl' | 'en',
    titel: title,
    datumWijziging: updatedAt ?? '',
  },
];
