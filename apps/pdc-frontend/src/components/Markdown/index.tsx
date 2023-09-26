import isAbsoluteUrl from 'is-absolute-url';
import NextLink from 'next/link';
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Link,
  Paragraph,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  UnorderedList,
  UnorderedListItem,
} from '@/components';
import { buildImgURL } from '@/util/buildImgURL';
import { useTranslation } from '../../app/i18n';
import { fallbackLng } from '../../app/i18n/settings';
import { Img } from '../Img';

type PriceTypes = {
  value: string;
  label: string;
  currency: string;
  id: string;
};

const components = ({ priceData, locale }: { priceData: PriceTypes[]; locale: string }) =>
  ({
    h1: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading1 {...node.properties}>{children}</Heading1>;
    },
    h2: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading2 {...node.properties}>{children}</Heading2>;
    },
    h3: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading3 {...node.properties}>{children}</Heading3>;
    },
    h4: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading4 {...node.properties}>{children}</Heading4>;
    },
    h5: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading5 {...node.properties}>{children}</Heading5>;
    },
    h6: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading6 {...node.properties}>{children}</Heading6>;
    },
    p: ({ children, node }) => {
      delete node.properties?.style;
      if (node.properties?.dataLead) {
        delete node.properties?.dataLead;
        return (
          <Paragraph {...node.properties} lead>
            {children}
          </Paragraph>
        );
      }

      return <Paragraph {...node.properties}>{children}</Paragraph>;
    },
    ul: ({ children, node }) => {
      delete node.properties?.style;
      return <UnorderedList {...node.properties}>{children}</UnorderedList>;
    },
    li: ({ children, node }) => {
      delete node.properties?.style;
      return <UnorderedListItem {...node.properties}>{children}</UnorderedListItem>;
    },
    a: ({ children, node }) => {
      const external = typeof node.properties?.href === 'string' && isAbsoluteUrl(node.properties?.href);
      return external ? (
        <Link href={node.properties?.href as string} rel="external noopener noreferrer" external={external}>
          {children}
        </Link>
      ) : (
        <NextLink className="utrecht-link" href={node.properties?.href as string} locale={locale}>
          {children}
        </NextLink>
      );
    },
    table: ({ children, node }) => {
      delete node.properties?.style;
      return <Table {...node.properties}>{children}</Table>;
    },
    tbody: ({ children, node }) => {
      delete node.properties?.style;
      return <TableBody {...node.properties}>{children}</TableBody>;
    },
    td: ({ children, node }) => {
      delete node.properties?.style;
      return <TableCell {...node.properties}>{children}</TableCell>;
    },
    thead: ({ children, node }) => {
      delete node.properties?.style;
      return <TableHeader {...node.properties}>{children}</TableHeader>;
    },
    tfoot: ({ children, node }) => {
      delete node.properties?.style;
      return <TableFooter {...node.properties}>{children}</TableFooter>;
    },
    th: ({ children, node }) => {
      delete node.properties?.style;
      return <TableHeaderCell {...node.properties}>{children}</TableHeaderCell>;
    },
    tr: ({ children, node }) => {
      delete node.properties?.style;
      return <TableRow {...node.properties}>{children}</TableRow>;
    },
    caption: ({ children, node }) => {
      delete node.properties?.style;
      return <TableCaption {...node.properties}>{children}</TableCaption>;
    },
    img: (props) => props.src && <Img {...props} src={buildImgURL(props.src)} />,
    'react-widget': async ({ node }: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = await useTranslation(locale ?? fallbackLng, 'common');
      if (node.properties?.id && priceData && priceData.length > 0) {
        const product = priceData.find(({ id }) => id === node.properties?.id);
        const price =
          Number(product?.value) === 0
            ? t('text.free-product')
            : new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: product?.currency,
              }).format(Number(product?.value));

        return <data value={price}>{price}</data>;
      } else {
        return null;
      }
    },
  }) as Components;

interface MarkdownProps {
  children: any;
  priceData?: any;
  locale?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, priceData, locale }) => (
  <ReactMarkdown
    components={components({
      priceData,
      locale: locale ?? fallbackLng,
    })}
    rehypePlugins={[rehypeRaw]}
  >
    {children}
  </ReactMarkdown>
);
