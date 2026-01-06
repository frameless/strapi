import { Markdown as BaseMarkdown, PriceWidget } from '@frameless/ui';
import React from 'react';
import type { Options } from 'react-markdown';

export interface PriceData {
  value: string;
  label: string;
  currency: string;
  uuid?: string;
}

export interface MarkdownProps {
  children?: string;
  locale: string;
  priceData?: PriceData[];
  priceZeroLabel?: string;
}

export const Markdown = ({ children, locale, priceData, priceZeroLabel = '¤ 0,00' }: MarkdownProps) => {
  const priceWidget: Options['components'] = {
    span: ({ node, children: spanChildren }) => {
      const strapiIdref = node?.properties?.dataStrapiIdref as string;
      if (node?.properties.dataStrapiCategory === 'price') {
        return <PriceWidget freeProductText={priceZeroLabel} priceData={priceData} locale={locale} id={strapiIdref} />;
      }
      const { style, ...restProperties } = node?.properties || {};
      return <span {...restProperties}>{spanChildren}</span>;
    },
  };
  if (!children) {
    return null;
  }
  return <BaseMarkdown components={priceWidget}>{children}</BaseMarkdown>;
};
