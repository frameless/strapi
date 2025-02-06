import { isYouTubeURL, Markdown as ReactMarkdown, YouTubeVideo } from '@frameless/ui';
import React from 'react';
import type { Price } from '../strapi-product-type';
import { buildImageURL, sanitizeHTML } from '../utils';

export interface MarkdownProps {
  children: string;
  priceData?: Price[];
}

export const Markdown = ({ children: html, priceData }: MarkdownProps) => {
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
        img: ({ src, alt }) => {
          if (!src && !process.env.STRAPI_PRIVATE_URL) return null;
          const imageSrc = buildImageURL(process.env.STRAPI_PRIVATE_URL as string, src as string);
          return <img src={imageSrc} alt={alt} />;
        },
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
        iframe: ({ node }) => {
          if (node && node.properties && typeof node.properties.src === 'string' && isYouTubeURL(node.properties.src)) {
            return (
              <YouTubeVideo
                src={node.properties.src}
                title={node.properties?.dataTitle as string}
                {...node.properties}
              />
            );
          } else {
            return null;
          }
        },
      }}
    >
      {DOMPurifyHTML}
    </ReactMarkdown>
  ) : null;
};
