'use client';
import { Markdown as BaseMarkdown, Img } from '@frameless/ui';
import { Link } from '@utrecht/component-library-react/dist/css-module';
import isAbsoluteUrl from 'is-absolute-url';
import Image from 'next/image';
import NextLink from 'next/link';

type ImageProperties = {
  src: string;
  alt: string;
  width: string;
  height: string;
  dataFigcaption?: string;
};

export const Markdown = ({ children, imageUrl }: { children: string; imageUrl?: string }) => {
  return (
    <BaseMarkdown
      components={{
        img: ({ node }) => {
          const { src, alt, width, height, dataFigcaption } = node?.properties as ImageProperties;

          return imageUrl ? (
            <Img
              Image={Image}
              src={`${imageUrl}${src}`}
              alt={alt || ''}
              width={Number(width)}
              height={Number(height)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              figure={dataFigcaption}
            />
          ) : null;
        },
        a: ({ children, node }) => {
          const external = typeof node?.properties?.href === 'string' && isAbsoluteUrl(node?.properties?.href);
          return external ? (
            <Link href={node?.properties?.href as string} rel="external noopener noreferrer" external={external}>
              {children}
            </Link>
          ) : (
            <NextLink className="utrecht-link" href={node?.properties?.href as string}>
              {children}
            </NextLink>
          );
        },
      }}
    >
      {children}
    </BaseMarkdown>
  );
};
