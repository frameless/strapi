import type { Attributes, Price } from '../strapi-product-type';

import { renderMarkdownToString } from './renderMarkdownToString';

type Trefwoorden = {
  trefwoord: string;
};
type BothContentBlock = {
  [key: string]: string;
};
export interface GetVertalingenProps {
  bothContentBlock: BothContentBlock;
  deskMemo: string;
  priceData?: Price[];
  attributes: Attributes;
  trefwoorden?: Trefwoorden[];
}

export const getVertalingen = ({
  bothContentBlock,
  deskMemo,
  priceData,
  attributes,
  trefwoorden,
}: GetVertalingenProps) => [
  {
    ...bothContentBlock,
    deskMemo: renderMarkdownToString({ priceData, children: deskMemo }),
    trefwoorden,
    taal: attributes?.locale,
    titel: attributes?.title,
    datumWijziging: attributes.updatedAt,
  },
];
