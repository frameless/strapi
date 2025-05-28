import { Markdown as BaseMarkdown } from '@frameless/ui';
import { Image, Link } from '@utrecht/component-library-react/dist/css-module';
import isAbsoluteUrl from 'is-absolute-url';

type ImageProperties = {
  src: string;
  alt: string;
  width: string;
  height: string;
};

export const Markdown = ({ children }: { children: string }) => {
  return (
    <BaseMarkdown
      components={{
        img: ({ node }) => {
          const { src, alt, width, height } = node?.properties as ImageProperties;
          return (
            <Image
              src={src}
              alt={alt || ''}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          );
        },
        a: ({ children, node }) => {
          const external = typeof node?.properties?.href === 'string' && isAbsoluteUrl(node?.properties?.href);
          return external ? (
            <Link href={node?.properties?.href as string} rel="external noopener noreferrer" external={external}>
              {children}
            </Link>
          ) : (
            <Link className="utrecht-link" href={node?.properties?.href as string}>
              {children}
            </Link>
          );
        },
      }}
    >
      {children}
    </BaseMarkdown>
  );
};
