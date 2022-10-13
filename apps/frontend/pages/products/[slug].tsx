import { NextPage } from "next";
import Head from "next/head";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

import { client } from "../../apolloClient";
import { GET_PRODUCT_BY_SLUG, GET_ALL_SLUGS } from "../../query";
import { Layout } from "../../components/Layout";

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
} from "@utrecht/component-library-react";

import { UtrechtDigidButton } from "@utrecht/web-component-library-react";

const components: Components = {
  h1: ({ children, node }) => <Heading1 {...node.properties}>{children}</Heading1>,
  h2: ({ children, node }) => <Heading2 {...node.properties}>{children}</Heading2>,
  h3: ({ children, node }) => <Heading3 {...node.properties}>{children}</Heading3>,
  h4: ({ children, node }) => <Heading4 {...node.properties}>{children}</Heading4>,
  h5: ({ children, node }) => <Heading5 {...node.properties}>{children}</Heading5>,
  h6: ({ children, node }) => <Heading6 {...node.properties}>{children}</Heading6>,
  p: ({ children, node }) => {
    const cleanChildren = children.filter((el) => el != null);
    return <Paragraph {...node.properties}>{cleanChildren}</Paragraph>;
  },
  ul: ({ children, node }) => <UnorderedList {...node.properties}>{children}</UnorderedList>,
  li: ({ children, node }) => <UnorderedListItem {...node.properties}>{children}</UnorderedListItem>,
  a: ({ children, node }) => <Link {...node.properties}>{children}</Link>,
};

const Product: NextPage = ({ product }: any) => {
  const { title, body, flexibleSection, excerpt } = product.attributes;
  return (
    <>
      <Head>
        <title>{product.attributes.title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <Layout>
        <Heading1>{title}</Heading1>
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

export async function getStaticProps(ctx: any) {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: ctx.params.slug, locale: ctx.locale },
  });

  if (!data || data.products.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data.products.data[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(ctx: any) {
  const { data } = await client.query({
    query: GET_ALL_SLUGS,
    variables: { locale: ctx.locale },
  });

  return {
    paths: data.products.data.map(({ attributes }: any) => {
      return {
        params: { slug: attributes.slug },
        locale: attributes.locale,
      };
    }),
    fallback: "blocking",
  };
}
