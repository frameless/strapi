import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { Get_Article_By_SlugQuery } from '../../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import {
  AccordionProvider,
  Breadcrumbs,
  Grid,
  GridCell,
  Header,
  Heading1,
  NavigationList,
  Page,
  PageContent,
  RichText,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { Main } from '@/components/Main';
import { Markdown } from '@/components/Markdown';
import { GET_ARTICLE_BY_SLUG } from '@/query';
import { config } from '@/util';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { getNavData } from '@/util/getNavData';

type Params = {
  params: {
    locale: string;
    articleSlug: string;
  };
};

export async function generateMetadata({ params: { articleSlug } }: Params): Promise<Metadata> {
  const { data } = await fetchData<Get_Article_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: articleSlug, pageMode: 'PUBLISHED' },
  });
  return {
    title: data.articlePages?.[0]?.title ?? '',
    description: data.articlePages?.[0]?.description ?? '',
  };
}

const ArticlePage = async ({ params: { locale, articleSlug } }: Params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const { isEnabled } = draftMode();
  const { data } = await fetchData<Get_Article_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: articleSlug, pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED' },
  });
  const navList = await getNavData({ pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED', articleSlug });
  if (!data.articlePages?.[0]) return notFound();

  const article = data.articlePages?.[0];
  const parentThemaSlug = article?.theme_pages?.[0]?.slug;
  const parentHoofditemSlug = article?.navigation_pages?.[0]?.slug;

  const hasHoofditemParentOnly = !parentThemaSlug && parentHoofditemSlug;

  const siblingThemas = hasHoofditemParentOnly ? (article?.navigation_pages?.[0]?.theme_pages ?? []) : [];
  const siblingContent = hasHoofditemParentOnly
    ? (article?.navigation_pages?.[0]?.article_pages ?? [])
    : (article?.theme_pages?.[0]?.article_pages ?? []);

  const themasLinks =
    siblingThemas?.map((page) => ({
      textContent: page?.title ?? '',
      href: `/${locale}/theme/${page?.slug}`,
      isCurrent: page?.slug === articleSlug,
    })) || [];

  const contentLinks =
    siblingContent?.map((page) => ({
      textContent: page?.title ?? '',
      href: `/${locale}/article/${page?.slug}`,
      isCurrent: page?.slug === articleSlug,
    })) || [];

  const sideNavigationLinks = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements = [
    {
      label: 'Home',
      href: '/',
      current: false,
    },
  ];

  const parentNavPage = article?.theme_pages?.[0]?.navigation_pages?.[0];
  if (parentNavPage) {
    breadcrumbNavigationElements.push({
      label: parentNavPage.title ?? '',
      href: `/${locale}/${parentNavPage.slug}`,
      current: false,
    });
  }

  const parentElement = hasHoofditemParentOnly
    ? {
        label: article?.navigation_pages?.[0]?.title ?? '',
        href: `/${locale}/${parentHoofditemSlug}`,
        current: false,
      }
    : {
        label: article?.theme_pages?.[0]?.title ?? '',
        href: `/theme/${parentThemaSlug}`,
        current: true,
      };

  breadcrumbNavigationElements.push(parentElement);

  const DynamicContent = () =>
    article?.content &&
    article?.content.length > 0 &&
    article?.content?.map((component: any, index: number) => {
      switch (component?.__typename) {
        case 'ComponentComponentsUtrechtRichText':
          return component.content ? (
            <Markdown imageUrl={getImageBaseUrl()} key={index}>
              {component.content}
            </Markdown>
          ) : null;
        case 'ComponentComponentsUtrechtAccordion':
          return (
            <AccordionProvider
              sections={component.item.map(({ id, label, body, headingLevel }: any) => ({
                id,
                label,
                headingLevel,
                body: <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>,
              }))}
            />
          );
        default:
          return null;
      }
    });

  return (
    <>
      <Header
        navList={navList}
        logo={{
          href: config.homePageURL,
          ariaLabel:
            t('logo.aria-label', {
              defaultValue: 'Gemeente Utrecht logo, ga naar homepagina',
            }) || '',
        }}
      />

      <Page>
        <PageContent className="utrecht-custom-page-content">
          <Breadcrumbs
            links={breadcrumbNavigationElements}
            Link={Link}
            backLink={{
              label: parentElement.label,
              href: parentElement.href,
              current: parentElement.current,
            }}
          />
          <Grid spacing="md">
            <GridCell md={8}>
              <Main id="main">
                <RichText>
                  <Heading1>{article?.title}</Heading1>
                  <DynamicContent />
                </RichText>
              </Main>
            </GridCell>
            <GridCell md={4} className="utrecht-grid-mobile-hidden">
              {sideNavigationLinks.length > 1 && (
                <nav>
                  <NavigationList list={sideNavigationLinks} sideNav mobile />
                </nav>
              )}
            </GridCell>
          </Grid>
          <Grid spacing="lg">
            <GridCell md={12} justifyContent="flex-end">
              <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
            </GridCell>
          </Grid>
        </PageContent>
      </Page>
    </>
  );
};

export default ArticlePage;
