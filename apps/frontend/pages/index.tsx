import type { NextPage } from "next";
import Head from "next/head";
import { client } from "../apolloClient";
import { GET_ALL_PRODUCTS_SLUG } from "../query";
import Link from "next/link";
import { UnorderedList, UnorderedListItem, Link as UtrechtLink } from "@utrecht/component-library-react";

import { Layout } from "../components/Layout";

const Home: NextPage<{ products?: any }> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Products Demo Page</title>
      </Head>
      <Layout>
        <UnorderedList>
          {products &&
            products.length > 0 &&
            products.map((product: any, index: number) =>
              product && product.attributes ? (
                <UnorderedListItem key={index}>
                  <Link href={`/products/${product.attributes.slug}`} passHref>
                    <UtrechtLink>{product.attributes.title}</UtrechtLink>
                  </Link>
                </UnorderedListItem>
              ) : null
            )}
        </UnorderedList>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async (ctx: any) => {
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS_SLUG,
    variables: { locale: ctx.locale },
  });
  if (!data.products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products.data,
    },
    revalidate: 1,
  };
};
