import { Alert, ButtonLink, Heading1, Heading3, Paragraph, SpotlightSection } from '@utrecht/component-library-react';
import {
  UtrechtDigidButton,
  UtrechtDigidLogo,
  UtrechtEherkenningLogo,
  UtrechtEidasLogo,
} from '@utrecht/web-component-library-react';
import { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useContext } from 'react';
import { i18n } from '../../../next-i18next.config';
import { client } from '../../client';
import { Accordion } from '../../components/Accordion';
import { FAQSection } from '../../components/FAQSection';
import { Layout } from '../../components/Layout';
import { Markdown } from '../../components/Markdown';
import SearchContext from '../../context/search/context';
import { GET_PRODUCT_BY_SLUG } from '../../query';

const { publicRuntimeConfig } = getConfig();

const LogoButton = ({ logo, appearance, href, text, label }: any) => {
  switch (logo) {
    case 'digid':
      return (
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtDigidLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
      );
    case 'eherkenning':
      return (
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtEherkenningLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
      );
    case 'eidas':
      return (
        <div className="utrecht-logo-button">
          {label && <Heading3>{label}</Heading3>}
          <div className="utrecht-logo-button_container">
            <UtrechtEidasLogo />
            <ButtonLink appearance={`${appearance}-action-button`} href={href}>
              {text}
            </ButtonLink>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Product: NextPage = ({ product, localizations, preview }: any) => {
  const { title, excerpt } = product.attributes;
  const { asPath, locale, defaultLocale } = useRouter();
  const { getSearchResult, setQuery, query, suggestedHits, suggestions, getSuggestedSearch } =
    useContext(SearchContext);
  const { t } = useTranslation();
  const priceData = product.attributes.price && product.attributes.price?.data?.attributes.price;
  const { origin } = new URL(publicRuntimeConfig.strapiBackendURL);

  const Sections = () =>
    product.attributes && product.attributes.sections.length > 0
      ? product.attributes.sections.map((component: any, index: number) => {
          switch (component.__typename) {
            case 'ComponentComponentsBlockContent':
              return component.content ? (
                <Markdown strapiBackendURL={origin} locale={locale} key={index} priceData={priceData}>
                  {component.content}
                </Markdown>
              ) : null;
            case 'ComponentComponentsLogoButton':
              if (component && component.href && component.text) {
                return (
                  <LogoButton
                    key={index}
                    href={component.href}
                    text={component.text}
                    appearance={component.logo_button_appearance}
                    label={component.label}
                    logo={component.logo}
                  />
                );
              }
              return null;
            case 'ComponentComponentsFaq':
              if (component && component?.faq && component?.faq?.data && component?.faq?.data.attributes) {
                return (
                  <FAQSection
                    key={index}
                    locale={locale}
                    accordion={component.faq.data.attributes.faq.accordion}
                    sectionTitle={component.faq.data.attributes.title}
                    priceData={priceData}
                    strapiBackendURL={origin}
                  />
                );
              }
              return null;
            case 'ComponentComponentsAccordionSection':
              return (
                component.item &&
                component.item.length > 0 &&
                component.item.map(({ body, id, title }: any) => (
                  <Accordion
                    key={id}
                    locale={locale}
                    label={title}
                    body={
                      <Markdown priceData={priceData} locale={locale} strapiBackendURL={origin}>
                        {body}
                      </Markdown>
                    }
                  />
                ))
              );
            case 'ComponentComponentsImage':
              if (
                component.imageData &&
                component.imageData.data.attributes &&
                component.imageData.data.attributes.url
              ) {
                return (
                  <Image
                    src={`${origin}${component.imageData.data.attributes.url}`}
                    alt={component.imageData.data.attributes.alternativeText || ''}
                    sizes="(max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              33vw"
                    width={component.imageData.data.attributes.width}
                    height={component.imageData.data.attributes.height}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                );
              } else {
                return null;
              }
            case 'ComponentComponentsSpotlight':
              return component.content ? (
                <SpotlightSection type={component.type}>
                  <Markdown strapiBackendURL={origin} priceData={priceData}>
                    {component.content}
                  </Markdown>
                </SpotlightSection>
              ) : null;
            case 'ComponentComponentsButtonLink':
              return component.text && component.href ? (
                <div>
                  <Paragraph>{component?.label}</Paragraph>
                  <ButtonLink appearance={`${component?.button_link_appearance}-action-button`} href={component.href}>
                    {component.text}
                  </ButtonLink>
                </div>
              ) : null;
            case 'ComponentComponentsMultiColumnsButton':
              return (
                <div className="utrecht-multi-columns-button">
                  {component.column.map(({ buttonLink, logoButton, title }: any, index: number) => (
                    <div key={index} className="utrecht-multi-columns-button__item">
                      <Heading3>{title}</Heading3>
                      {buttonLink && buttonLink.button_link_appearance && buttonLink.href && buttonLink.text && (
                        <div className="utrecht-multi-columns-button__button">
                          <Paragraph>{buttonLink.label}</Paragraph>
                          <ButtonLink
                            appearance={`${buttonLink.button_link_appearance}-action-button`}
                            href={buttonLink.href}
                          >
                            {buttonLink.text}
                          </ButtonLink>
                        </div>
                      )}
                      {logoButton && logoButton.logo_button_appearance && logoButton.href && logoButton.text && (
                        <div className="utrecht-multi-columns-button__button">
                          <Paragraph>{logoButton.label}</Paragraph>
                          <UtrechtDigidButton>
                            <ButtonLink
                              appearance={`${logoButton.logo_button_appearance}-action-button`}
                              href={logoButton.href}
                            >
                              {logoButton.text}
                            </ButtonLink>
                          </UtrechtDigidButton>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );

            default:
              return <></>;
          }
        })
      : null;

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
          <Alert type="warning">
            <ButtonLink
              href={`/api/clear-preview-mode-cookies?slug=${locale}${asPath}&default_locale=${defaultLocale}`}
            >
              {t('actions.turn-off-the-preview-mode')}
            </ButtonLink>
            <Paragraph>{t('warnings.preview-mode')}</Paragraph>
          </Alert>
        )}
        <Heading1 style={{ marginBlockStart: '3rem' }}>{title}</Heading1>
        <Sections />
      </Layout>
    </>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params, preview, locale }) => {
  const res = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug: params?.slug,
      locale: locale,
      pageMode: preview ? 'PREVIEW' : 'LIVE',
    },
  });

  if (!res?.data || res.data?.products?.data?.length === 0) {
    return {
      notFound: true,
    };
  }
  const localizations =
    res.data.products.data[0]?.attributes.localizations.data.map(({ attributes }: any) => attributes) || [];
  localizations.push({
    locale: res.data.products.data[0].attributes.locale,
    slug: res.data.products.data[0].attributes.slug,
    __typename: 'Product',
  });

  return {
    props: {
      product: res.data?.products.data[0],
      localizations,
      preview: preview ? preview : null,
      ...(await serverSideTranslations(locale || 'nl', ['common'])),
    },
  };
};
