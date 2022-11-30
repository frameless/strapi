import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  UnorderedList,
  UnorderedListItem,
  Link as UtrechtLink,
  Heading2,
  Paragraph,
  Heading1,
} from '@utrecht/component-library-react';
import { useContext, useEffect } from 'react';

import { Layout } from '../../components/Layout';
import SearchContext from '../../context/search/context';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { i18n } from '../../next-i18next.config';

const SearchPage: NextPage = () => {
  const { t } = useTranslation();
  const { getSearchResult, searchResults, setQuery, query, suggestedHits, suggestions, getSuggestedSearch } =
    useContext(SearchContext);
  const { query: routerQuery, locale } = useRouter();

  useEffect(() => {
    getSearchResult(locale || i18n.defaultLocale, routerQuery.q as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerQuery.q, locale]);

  return (
    <>
      <Head>
        <title>{t('seo.title')}</title>
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
          {searchResults?.hits &&
            searchResults?.hits.length > 0 &&
            searchResults?.hits.map(({ fields, type, url }, index: number) => (
              <UnorderedListItem key={index}>
                <Link href={url} passHref>
                  <UtrechtLink>
                    <Heading2 style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: fields.title }} />
                  </UtrechtLink>
                </Link>
                <Paragraph dangerouslySetInnerHTML={{ __html: fields.body }} />
              </UnorderedListItem>
            ))}
        </UnorderedList>
        {searchResults && searchResults.hits && searchResults.hits.length === 0 && (
          <div>
            <Heading1>Zoekresultaten voor ‘Zoekresultaten</Heading1>
            <div>
              <Heading2>Probeer het nog eens:</Heading2>
              <UnorderedList>
                <UnorderedListItem>Zorg ervoor dat alle woorden goed gespeld zijn.</UnorderedListItem>
                <UnorderedListItem>Probeer andere zoektermen.</UnorderedListItem>
                <UnorderedListItem>Maak de zoektermen algemener.</UnorderedListItem>
              </UnorderedList>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'nl', ['common'])),
    },
  };
}

export default SearchPage;
