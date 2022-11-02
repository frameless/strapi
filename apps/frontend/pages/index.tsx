import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { client } from "../apolloClient";
import { GET_ALL_PRODUCTS_SLUG } from "../query";
import Link from "next/link";
import { UnorderedList, UnorderedListItem, Link as UtrechtLink } from "@utrecht/component-library-react";
import { useContext } from "react";

import { Layout } from "../components/Layout";
import SearchContext from "../context/search/context";
import { i18n } from "../next-i18next.config";

export interface Fields {
  title: string;
  body: string;
}

const Home: NextPage<{ products?: any }> = ({ products }) => {
  const { getSearchResult, setQuery, getSuggestedSearch, query, suggestedHits, suggestions } =
    useContext(SearchContext);
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Products Demo Page</title>
      </Head>
      <Layout
        onSearchChange={(event) => {
          setQuery(event.target.value);
          getSuggestedSearch(locale || i18n.defaultLocale, query);
        }}
        onSearchSubmit={(event) => {
          event.preventDefault();
          getSearchResult(locale || i18n.defaultLocale, query);
        }}
        searchBarValue={query}
        suggestedHits={suggestedHits}
        suggestions={suggestions}
      >
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
