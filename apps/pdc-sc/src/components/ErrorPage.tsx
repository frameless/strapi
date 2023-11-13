import {
  Document,
  Heading,
  Logo,
  LogoImage,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
} from '@utrecht/component-library-react';
import React from 'react';
import { renderToString } from 'react-dom/server';

interface PageComponentProps {
  title: string;
  message: string;
}

const PageComponent = ({ message, title }: PageComponentProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@1.0.2-alpha.0/dist/index.css" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@1.0.2-alpha.0/dist/html.css" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/design-tokens@1.0.0-alpha.601/dist/index.css" />
      <title>{title}</title>
    </head>
    <body>
      <Document className="utrecht-theme utrecht-html">
        <Page>
          <PageHeader>
            <Logo style={{ blockSize: '100%', inlineSize: '100%' }}>
              <LogoImage />
            </Logo>
          </PageHeader>
          <PageContent>
            <Heading level={1}>{title}</Heading>
            <Paragraph>{message}</Paragraph>
          </PageContent>
        </Page>
      </Document>
    </body>
  </html>
);

export const html = ({ message, title }: PageComponentProps) => {
  return renderToString(<PageComponent message={message} title={title} />);
};
