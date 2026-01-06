import React from 'react';
import { Markdown } from '../Markdown';

export interface PriceType {
  value: string;
  label: string;
  currency: string;
  uuid?: string;
}

export interface ContentItem {
  content?: string;
}

interface ContentProps {
  data: ContentItem[];
  locale: string;
  priceData?: PriceType[];
  priceZeroLabel: string;
  title: string;
}

export const Content = ({ data = [], locale, priceData, priceZeroLabel = '¤ 0,00', title }: ContentProps) => (
  <>
    {title && <h1>{title}</h1>}
    {data.map((item, index) => (
      <Markdown key={index} priceZeroLabel={priceZeroLabel} locale={locale} priceData={priceData}>
        {item?.content}
      </Markdown>
    ))}
  </>
);
