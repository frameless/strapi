import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
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
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { Main } from '@/components/Main';
import { Markdown } from '@/components/Markdown';
import { GET_ARTICLE_BY_SLUG } from '@/query';
import { SiblingData } from '@/types';
import { config } from '@/util';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { getNavData } from '@/util/getNavData';

type Params = {
  params: {
    locale: string;
    articleSlug: string;
  };
};

export async function generateMetadata({ params: { locale, articleSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: articleSlug, locale },
  });
  return {
    title: data.findSlug.data?.attributes?.title,
    description: data.findSlug.data?.attributes?.description,
  };
}

const ArticlePage = async ({ params: { locale, articleSlug } }: Params) => {
  const { t } = await useTranslation(locale, ['common']);
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: articleSlug, locale, pageMode: isEnabled ? 'preview' : 'live' },
  });
  const navList = await getNavData({ pageMode: isEnabled ? 'PREVIEW' : 'LIVE', articleSlug });
  if (!data.findSlug?.data) return notFound();

  const parentThemaSlug = data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.slug;
  const parentHoofditemSlug = data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.slug;

  const hasHoofditemParentOnly = !parentThemaSlug && parentHoofditemSlug;

  const siblingThemas: SiblingData[] = hasHoofditemParentOnly
    ? data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.theme_pages?.data
    : [];
  const siblingContent: SiblingData[] = hasHoofditemParentOnly
    ? data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.article_pages?.data
    : data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.article_pages?.data;

  const themasLinks =
    siblingThemas?.map(({ attributes: { slug, title } }: SiblingData) => ({
      textContent: title,
      href: `/${locale}/theme/${slug}`,
      isCurrent: slug === articleSlug,
    })) || [];

  const contentLinks =
    siblingContent?.map(({ attributes: { slug, title } }: SiblingData) => ({
      textContent: title,
      href: `/${locale}/article/${slug}`,
      isCurrent: slug === articleSlug,
    })) || [];

  const sideNavigationLinks = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements = [
    {
      label: 'Home',
      href: '/',
      current: false,
    },
  ];

  if (data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]) {
    breadcrumbNavigationElements.push({
      label:
        data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]?.attributes?.title,
      href: `/${locale}/${data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]?.attributes?.slug}`,
      current: false,
    });
  }

  const parentElement = hasHoofditemParentOnly
    ? {
        label: data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.title,
        href: `/${locale}/${parentHoofditemSlug}`,
        current: false,
      }
    : {
        label: data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.title,
        href: `/theme/${parentThemaSlug}`,
        current: true,
      };

  breadcrumbNavigationElements.push(parentElement);

  const DynamicContent = () =>
    data.findSlug.data?.attributes?.content &&
    data.findSlug.data?.attributes?.content.length > 0 &&
    data.findSlug.data?.attributes?.content?.map((component: any, index: number) => {
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
                <Heading1>{data.findSlug.data?.attributes?.title}</Heading1>
                <DynamicContent />
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
