import PropTypes from 'prop-types';
import React from 'react';
import { Markdown } from '../Markdown';

export const Content = ({ data, locale, priceData, priceZeroLabel = '¤ 0,00', title }) => {
  const isData = Array.isArray(data);
  return (
    <div>
      {title && <h1>{title}</h1>}
      {isData &&
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
};

Content.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
    }),
  ),
  priceData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      currency: PropTypes.oneOf(['EUR', 'USD']),
      value: PropTypes.number,
      uuid: PropTypes.string,
    }),
  ),
  locale: PropTypes.string,
  priceZeroLabel: PropTypes.string,
  title: PropTypes.string,
};
