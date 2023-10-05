'use client';
import { Markdown as BaseMarkdown, Img, PriceWidget } from '@frameless/ui';
import { Link } from '@utrecht/component-library-react/dist/css-module';
import isAbsoluteUrl from 'is-absolute-url';
import Image from 'next/image';
import NextLink from 'next/link';
export { PageTitle } from '../Page-title';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
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

export const createMarkdownComponents = ({
  priceData,
  locale = fallbackLng,
  imageUrl,
}: {
  priceData?: PriceTypes[];
  locale?: string;
  imageUrl?: string;
}) => ({
  'react-widget': ({ node }: ReactMarkdownProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation(locale || fallbackLng, ['common']);
    return (
      <PriceWidget
        freeProductText={t('text.free-product') as string}
        priceData={priceData}
        locale={locale}
        id={node.properties?.id as string}
      />
    );
  },
  img: ({ node }: ReactMarkdownProps) => {
    const { src, alt, width, height, dataFigcaption } = node.properties as ImageProperties;

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
  a: ({ children, node }: ReactMarkdownProps) => {
    const external = typeof node.properties?.href === 'string' && isAbsoluteUrl(node.properties?.href);
    return external ? (
      <Link href={node.properties?.href as string} rel="external noopener noreferrer" external={external}>
        {children}
      </Link>
    ) : (
      <NextLink className="utrecht-link" href={node.properties?.href as string}>
        {children}
      </NextLink>
    );
  },
});

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
}) => <BaseMarkdown components={createMarkdownComponents({ priceData, locale, imageUrl })}>{children}</BaseMarkdown>;