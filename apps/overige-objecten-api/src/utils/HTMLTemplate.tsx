import { getDirectionFromLanguageCode } from '@frameless/utils';
import React from 'react';

interface HTMLTemplateProps {
  lang?: string;
  title?: string;
  children: React.ReactNode;
}

export const HTMLTemplate = ({ lang = 'nl', title = 'Preview', children }: HTMLTemplateProps) => (
  <html dir={getDirectionFromLanguageCode(lang)} lang={lang}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
);
