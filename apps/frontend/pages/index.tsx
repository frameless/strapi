import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { client } from "../apolloClient";
import { GET_ALL_PRODUCTS_SLUG, GET_ALL_SLUGS } from "../query";
import Link from "next/link";
import {
  UnorderedList,
  UnorderedListItem,
  Link as UtrechtLink,
} from "@utrecht/component-library-react";

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
            products.map(({ attributes }: any, index: number) => (
              <UnorderedListItem key={index}>
                <Link href={`/products/${attributes.slug}`} passHref>
                  <UtrechtLink>{attributes.title}</UtrechtLink>
                </Link>
              </UnorderedListItem>
            ))}
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

  return {
    props: {
      products: data.products.data,
    },
  };
};
