import { Document, Heading, Page, PageContent, Separator } from '@utrecht/component-library-react';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Markdown } from '../components/Markdown';
import type { Price } from '../strapi-product-type';

const categoryStyle = { border: '1px solid #ccc', padding: '10px', marginBottom: '10px' };
interface CategoryTypes {
  [key: string]: string;
}

interface CategoryProps {
  data: CategoryTypes;
  priceData?: Price[];
}

const Category = ({ data, priceData }: CategoryProps) => {
  const markdownProps = { priceData };
  return (
    <>
      {data?.tekst && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Tekst</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.tekst}</Markdown>
        </div>
      )}
      {data?.procedureBeschrijving && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Procedure Beschrijving</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.procedureBeschrijving}</Markdown>
        </div>
      )}
      {data?.bewijs && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Bewijs</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.bewijs}</Markdown>
        </div>
      )}
      {data?.uitvoeringsinstructies && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Uitvoeringsinstructies</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.uitvoeringsinstructies}</Markdown>
        </div>
      )}
      {data?.bezwaarEnBeroep && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Bezwaar</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.bezwaarEnBeroep}</Markdown>
        </div>
      )}
      {data?.vereisten && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Vereisten</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.vereisten}</Markdown>
        </div>
      )}
      {data?.kostenEnBetaalmethoden && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Kosten en betaalmethoden</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.kostenEnBetaalmethoden}</Markdown>
        </div>
      )}
      {data?.contact && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Contact</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.contact}</Markdown>
        </div>
      )}
      {data?.wtdBijGeenReactie && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - WTD Bij Geen Reactie</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.wtdBijGeenReactie}</Markdown>
        </div>
      )}
      {data?.notice && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Notice</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.notice}</Markdown>
        </div>
      )}
      {data?.deskMemo && (
        <div style={categoryStyle}>
          <Heading level={2}>Categorie - Desk Memo (Interne velden)</Heading>
          <Separator />
          <Markdown {...markdownProps}>{data?.deskMemo}</Markdown>
        </div>
      )}
    </>
  );
};

interface PageComponentProps extends CategoryProps {}

const PageComponent = ({ data, priceData }: PageComponentProps) => (
  <html lang="nl">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@1.0.2-alpha.0/dist/index.css" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/component-library-css@1.0.2-alpha.0/dist/html.css" />
      <link rel="stylesheet" href="https://unpkg.com/@utrecht/design-tokens@1.0.0-alpha.601/dist/index.css" />
      <script
        src="https://unpkg.com/@utrecht/web-component-library-stencil/dist/utrecht/utrecht.esm.js"
        type="module"
      ></script>
      <style>
        {`
        :root {
          --utrecht-space-around: 1;
          }
          img {
            max-width: 100%;
            block-size: auto;
          }
        `}
      </style>
      <title>Kennisartikelen Categories</title>
    </head>
    <body>
      <Document className="utrecht-theme">
        <Page>
          <PageContent>
            <Heading level={1}>Kennisartikelen Categories</Heading>
            <Separator />
            <Category data={data} priceData={priceData} />
          </PageContent>
        </Page>
      </Document>
    </body>
  </html>
);

export const createHTMLFiles = (data: CategoryTypes, priceData: Price[]) => {
  const outputDir = './tmp/output-html';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.join(outputDir, `preview.html`);
  fs.writeFileSync(filePath, renderToString(<PageComponent data={data} priceData={priceData} />), 'utf8');
};
