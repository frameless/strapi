import { NextPage } from 'next';
import Head from 'next/head';

import type { GetStaticPropsContext } from 'next';
import { client } from '../../client';
import { GET_PRODUCT_BY_SLUG, GET_ALL_SLUGS } from '../../query';
import { Layout } from '../../components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { Heading1, ButtonLink } from '@utrecht/component-library-react';

import { UtrechtDigidButton } from '@utrecht/web-component-library-react';
import { useRouter } from 'next/router';
import { Alert } from '../../components/alert';
import { Markdown } from '../../components/Markdown';
import { FAQSection } from '../../components/FAQSection';
import { Accordion } from '../../components/Accordion';
import SearchContext from '../../context/search/context';

import { i18n } from '../../../next-i18next.config';

const Product: NextPage = ({ product, localizations, preview }: any) => {
  const { title, body, flexibleSection, excerpt, faq } = product.attributes;
  const { asPath, locale, defaultLocale } = useRouter();
  const { getSearchResult, setQuery, query, suggestedHits, suggestions, getSuggestedSearch } =
    useContext(SearchContext);
  const { t } = useTranslation();
  const priceData = product.attributes.price && product.attributes.price?.data?.attributes.price;
  return (
    <>
      <Head>
        <title>{product.attributes.title}</title>
        <meta name="description" content={excerpt} />
        {product.attributes.metaTags && product.attributes.metaTags.keymatch && (
          <meta name="keymatch" content={product.attributes.metaTags.keymatch} />
        )}
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
        localizations={localizations}
        suggestedHits={suggestedHits}
        suggestions={suggestions}
      >
        {preview && (
          <Alert message={t('warnings.preview-mode')}>
            <ButtonLink
              href={`/api/clear-preview-mode-cookies?slug=${locale}${asPath}&default_locale=${defaultLocale}`}
            >
              {t('actions.turn-off-the-preview-mode')}
            </ButtonLink>
          </Alert>
        )}
        <Heading1 style={{ marginBlockStart: '3rem' }}>{title}</Heading1>
        <div>
          {flexibleSection && flexibleSection.title && <h2>{flexibleSection.title}</h2>}
          {flexibleSection && flexibleSection.subTitle && (
            <Markdown data={priceData}>{flexibleSection.subTitle}</Markdown>
          )}
          {flexibleSection && flexibleSection.option1 && (
            <Markdown data={priceData}>{flexibleSection.option1}</Markdown>
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
              flexibleSection.accordion.map((item: any, index: number) => (
                <Accordion
                  locale={locale}
                  key={index}
                  label={item.title}
                  body={<Markdown data={priceData}>{item.body}</Markdown>}
                />
              ))}
          </div>
        </div>
        <div>{body && <Markdown data={priceData}>{body}</Markdown>}</div>
        {faq.data && (
          <FAQSection
            locale={locale}
            accordion={faq.data.attributes.faq.accordion}
            sectionTitle={faq.data.attributes.title}
          />
        )}
      </Layout>
    </>
  );
};

export default Product;

export async function getStaticProps({ params, preview, locale }: GetStaticPropsContext) {
  const res = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug: params?.slug,
      locale: locale,
      pageMode: preview ? 'PREVIEW' : 'LIVE',
    },
  });

  if (!res?.data || (res.data?.products && res.data?.products.le && res.data?.products?.data?.length === 0)) {
    return {
      notFound: true,
    };
  }
  const localizations = res.data.products.data[0].attributes.localizations.data.map(
    ({ attributes }: any) => attributes,
  );
  localizations.push({
    locale: res.data.products.data[0].attributes.locale,
    slug: res.data.products.data[0].attributes.slug,
    __typename: 'Product',
  });

  return {
    props: {
      product: res.data.products.data[0],
      localizations,
      preview: preview ? preview : null,
      ...(await serverSideTranslations(locale || 'nl', ['common'])),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths(ctx: any) {
  const res = await client.query({ query: GET_ALL_SLUGS, variables: { locale: ctx.locale } });

  const paths =
    res.data && res.data?.products && res.data?.products?.data?.length > 0
      ? res?.data.products.data.map(({ attributes }: any) => {
          return {
            params: { slug: attributes.slug },
            locale: attributes.locale,
          };
        })
      : [];

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
