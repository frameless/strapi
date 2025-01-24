import { Markdown as BaseMarkdown, PriceWidget } from '@frameless/ui';
import PropTypes from 'prop-types';
import React from 'react';

export const Markdown = ({ children, locale, priceData, priceZeroLabel = '¤ 0,00' }) => {
  const priceWidget = {
    span: ({ node, children: spanChildren }) => {
      if (node?.properties.dataStrapiCategory === 'price') {
        return (
          <PriceWidget
            freeProductText={priceZeroLabel}
            priceData={priceData}
            locale={locale}
            id={node?.properties.dataStrapiIdref}
          />
        );
      }
      delete node?.properties?.style;
      return <span {...node?.properties}>{spanChildren}</span>;
    },
  };

  return <BaseMarkdown components={priceWidget}>{children}</BaseMarkdown>;
};

Markdown.propTypes = {
  children: PropTypes.object,
  locale: PropTypes.string,
  priceData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      currency: PropTypes.oneOf(['EUR', 'USD']),
      value: PropTypes.number,
      uuid: PropTypes.string,
    }),
  ),
  priceZeroLabel: PropTypes.string,
};
