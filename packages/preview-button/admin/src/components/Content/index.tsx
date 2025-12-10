import React from 'react';
import { Markdown, type MarkdownProps } from '../../components/Markdown';

export interface ContentProps extends Pick<MarkdownProps, 'locale' | 'priceData'> {
  data?: {
    content?: string;
  }[];
  priceZeroLabel?: string;
  title?: string;
}

export const Content = ({ data, locale, priceData, priceZeroLabel = '¤ 0,00', title }: ContentProps) => (
  <div>
    {title && <h1>{title}</h1>}
    {Array.isArray(data) &&
      data.map(
        (item, index) =>
          item?.content && (
            <Markdown key={index} priceZeroLabel={priceZeroLabel} locale={locale} priceData={priceData}>
              {item.content}
            </Markdown>
          ),
      )}
  </div>
);
