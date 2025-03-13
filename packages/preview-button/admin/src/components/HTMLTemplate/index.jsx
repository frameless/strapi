import { getDirectionFromLanguageCode } from '@frameless/utils';
import PropTypes from 'prop-types';
import React from 'react';

export const HTMLTemplate = ({ lang = 'nl', title = 'Preview', children }) => (
  <html dir={getDirectionFromLanguageCode(lang)} lang={lang}>
    <head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
);

HTMLTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  lang: PropTypes.string,
};
