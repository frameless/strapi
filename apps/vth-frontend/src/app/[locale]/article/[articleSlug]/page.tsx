import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { AccordionProvider, Heading1 } from '@/components';
import { BreadcrumbNavigationElement } from '@/components/BreadcrumbNavigation';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { LinkData, SideNavigation } from '@/components/SideNavigation';
import { GET_ARTICLE_BY_SLUG } from '@/query';
import { SiblingData } from '@/types';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

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
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug: articleSlug, locale, pageMode: isEnabled ? 'preview' : 'live' },
  });

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
      title,
      slug,
      href: `/${locale}/theme/${slug}`,
      isCurrent: slug === articleSlug,
    })) || [];

  const contentLinks =
    siblingContent?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/${locale}/article/${slug}`,
      isCurrent: slug === articleSlug,
    })) || [];

  const sideNavigationLinks: LinkData[] = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements: BreadcrumbNavigationElement[] = [];

  if (data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]) {
    breadcrumbNavigationElements.push({
      title:
        data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]?.attributes?.title,
      href: `/${locale}/${data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.navigation_pages?.data[0]?.attributes?.slug}`,
    });
  }

  const parentElement: BreadcrumbNavigationElement = hasHoofditemParentOnly
    ? {
        title: data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.title,
        href: `/${locale}/${parentHoofditemSlug}`,
      }
    : {
        title: data.findSlug.data?.attributes?.theme_pages?.data[0]?.attributes?.title,
        href: `/theme/${parentThemaSlug}`,
      };

  breadcrumbNavigationElements.push(parentElement);

  const DynamicContent = () =>
    data.findSlug.data?.attributes?.content &&
    data.findSlug.data?.attributes?.content.length > 0 &&
    data.findSlug.data?.attributes?.content?.map((component: any, index: number) => {
      switch (component?.__typename) {
        case 'ComponentComponentsBlockContent':
          return component.content ? (
            <Markdown imageUrl={getImageBaseUrl()} key={index}>
              {component.content}
            </Markdown>
          ) : null;
        case 'ComponentComponentsAccordionSection':
          return (
            <AccordionProvider
              sections={component.item.map(({ id, title, body }: any) => ({
                id,
                label: title,
                headingLevel: 3,
                body: <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>,
              }))}
            />
          );
        default:
          return null;
      }
    });

  return (
    <Grid className={'utrecht-grid--content-padding'}>
      <div className={'utrecht-grid__full-width'}>
        <BreadcrumbWithBacklink
          breadcrumbProps={{ navigationElements: breadcrumbNavigationElements }}
          backlinkProps={{
            title: parentElement.title,
            href: parentElement.href,
          }}
        />
      </div>
      <div className={'utrecht-grid__two-third'}>
        <Heading1>{data.findSlug.data?.attributes?.title}</Heading1>
        <DynamicContent />
      </div>
      {sideNavigationLinks.length > 1 && (
        <div className={'utrecht-grid-mobile-hidden utrecht-grid__one-third'}>
          <SideNavigation links={sideNavigationLinks} />
        </div>
      )}
    </Grid>
  );
};

export default ArticlePage;
