import { NextPage } from "next";
import Head from "next/head";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { GetStaticPropsContext } from "next";
import { client } from "../../apolloClient";
import { GET_PRODUCT_BY_SLUG, GET_ALL_SLUGS } from "../../query";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  UnorderedList,
  UnorderedListItem,
  Link,
  Button,
  ButtonLink,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@utrecht/component-library-react";

import { UtrechtDigidButton } from "@utrecht/web-component-library-react";
import { useRouter } from "next/router";
import { Alert } from "../../components/alert";

const components: Components = {
  h1: ({ children, node }) => <Heading1 {...node.properties}>{children}</Heading1>,
  h2: ({ children, node }) => <Heading2 {...node.properties}>{children}</Heading2>,
  h3: ({ children, node }) => <Heading3 {...node.properties}>{children}</Heading3>,
  h4: ({ children, node }) => <Heading4 {...node.properties}>{children}</Heading4>,
  h5: ({ children, node }) => <Heading5 {...node.properties}>{children}</Heading5>,
  h6: ({ children, node }) => <Heading6 {...node.properties}>{children}</Heading6>,
  p: ({ children, node }) => <Paragraph {...node.properties}>{children}</Paragraph>,
  ul: ({ children, node }) => <UnorderedList {...node.properties}>{children}</UnorderedList>,
  li: ({ children, node }) => <UnorderedListItem {...node.properties}>{children}</UnorderedListItem>,
  a: ({ children, node }) => <Link {...node.properties}>{children}</Link>,
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
};

const Product: NextPage = ({ product, localizations, preview }: any) => {
  const { title, body, flexibleSection, excerpt } = product.attributes;
  const { asPath, locale, defaultLocale } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{product.attributes.title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <Layout localizations={localizations}>
        {preview && (
          <Alert message={t("warnings.preview-mode")}>
            <ButtonLink
              href={`/api/clear-preview-mode-cookies?slug=${locale}${asPath}&default_locale=${defaultLocale}`}
            >
              {t("actions.turn-off-the-preview-mode")}
            </ButtonLink>
          </Alert>
        )}
        <Heading1 style={{ marginBlockStart: "3rem" }}>{title}</Heading1>
        <div>
          {flexibleSection && flexibleSection.title && <h2>{flexibleSection.title}</h2>}
          {flexibleSection && flexibleSection.subTitle && (
            <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
              {flexibleSection.subTitle}
            </ReactMarkdown>
          )}
          {flexibleSection && flexibleSection.option1 && (
            <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
              {flexibleSection.option1}
            </ReactMarkdown>
          )}
          {flexibleSection && flexibleSection.digidButton && (
            <UtrechtDigidButton>
              <ButtonLink
                appearance={`${flexibleSection.digidButton.appearance}-action-button`}
                href={flexibleSection.digidButton.href}
              >
                {flexibleSection.digidButton.label}
              </ButtonLink>
            </UtrechtDigidButton>
          )}
          <div id="accordionGroup" className="accordion">
            {flexibleSection &&
              flexibleSection.accordion &&
              flexibleSection.accordion.length > 0 &&
              flexibleSection.accordion.map((item: any) => (
                <div key={item.id}>
                  <Heading3>
                    <Button aria-expanded="true" aria-controls={`sect-${item.id}`} id={`${item.id}-id`}>
                      {item.title}
                    </Button>
                  </Heading3>
                  <div
                    id={`sect-${item.id}`}
                    role="region"
                    aria-labelledby={`${item.id}-id`}
                    className="accordion-panel"
                  >
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
                      {item.body}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          {body && (
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
              {body}
            </ReactMarkdown>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Product;

export async function getStaticProps({ params, preview, locale, defaultLocale }: GetStaticPropsContext) {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: params?.slug, locale: locale, pageMode: preview ? "PREVIEW" : "LIVE" },
  });

  if (!data || data.products.data.length === 0) {
    return {
      notFound: true,
    };
  }
  const localizations = data.products.data[0].attributes.localizations.data.map(({ attributes }: any) => attributes);
  localizations.push({
    locale: data.products.data[0].attributes.locale,
    slug: data.products.data[0].attributes.slug,
    __typename: "Product",
  });

  return {
    props: {
      product: data.products.data[0],
      localizations,
      preview: preview ? preview : null,
      ...(await serverSideTranslations(locale || "nl", ["common"])),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(ctx: any) {
  const { data } = await client.query({
    query: GET_ALL_SLUGS,
    variables: { locale: ctx.locale },
  });
  const paths = data.products.data.map(({ attributes }: any) => {
    return {
      params: { slug: attributes.slug },
      locale: attributes.locale,
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
