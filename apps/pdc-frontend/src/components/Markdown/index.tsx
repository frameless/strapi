'use client';
import { Markdown as BaseMarkdown, Img, PriceWidget } from '@frameless/ui';
import { Link } from '@utrecht/component-library-react/dist/css-module';
import isAbsoluteUrl from 'is-absolute-url';
import Image from 'next/image';
import NextLink from 'next/link';
export { PageTitle } from '../Page-title';
import type { ExtraProps } from 'react-markdown';
import { useTranslation } from '../../app/i18n/client';
import { fallbackLng } from '../../app/i18n/settings';

type PriceTypes = {
  id: string;
  price: number;
  currency: string;
  label: string;
  value: string;
};

type ImageProperties = {
  src: string;
  alt: string;
  width: string;
  height: string;
  dataFigcaption?: string;
};

export const Markdown = ({
  children,
  locale,
  priceData,
  imageUrl,
}: {
  children: string;
  imageUrl?: string;
  priceData?: PriceTypes[];
  locale?: string;
}) => {
  const priceWidget = {
    'react-widget': ({ node }: ExtraProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation(locale || fallbackLng, ['common']);
      return (
        <PriceWidget
          freeProductText={t('text.free-product') as string}
          priceData={priceData}
          locale={locale || fallbackLng}
          id={node?.properties?.id as string}
        />
      );
    },
  };

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
        ...priceWidget,
      }}
    >
      {children}
    </BaseMarkdown>
  );
};
