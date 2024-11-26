import { Markdown as ReactMarkdown } from '@frameless/ui';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import memoize from 'lodash.memoize';
import React from 'react';
import type { Price } from '../strapi-product-type';

export interface MarkdownProps {
  children: string;
  priceData?: Price[];
}

const createDOMPurify = memoize(() => {
  const { window } = new JSDOM();
  return DOMPurify(window);
});

export const Markdown = ({ children: html, priceData }: MarkdownProps) => {
  const domPurify = createDOMPurify();
  const sanitizeHTML = memoize((html) => domPurify.sanitize(html));
  const DOMPurifyHTML = sanitizeHTML(html);

  return html ? (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        p: ({ children }) => <p>{children}</p>,
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ children, href }) => <a href={href}>{children}</a>,
        img: ({ src, alt }) => <img src={src} alt={alt} />,
        table: ({ children }) => <table>{children}</table>,
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tfoot: ({ children }) => <tfoot>{children}</tfoot>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => <th>{children}</th>,
        td: ({ children }) => <td>{children}</td>,
        caption: ({ children }) => <caption>{children}</caption>,
        figure: ({ children }) => <figure>{children}</figure>,
        figcaption: ({ children }) => <figcaption>{children}</figcaption>,
        span: ({ node, children: spanChildren }) => {
          const priceCategory = node?.properties?.dataStrapiCategory;
          const strapiPriceUUID = node?.properties?.dataStrapiIdref as string;
          if (priceCategory === 'price') {
            const price = priceData?.find(({ uuid }) => uuid === strapiPriceUUID);
            if (!price) return null;
            const result = new Intl.NumberFormat('nl', {
              style: 'currency',
              currency: price.currency,
            }).format(parseInt(price.value, 10));

            return <span {...node?.properties}>{result}</span>;
          }
          return <span {...node?.properties}>{spanChildren}</span>;
        },
      }}
    >
      {DOMPurifyHTML}
    </ReactMarkdown>
  ) : null;
};
