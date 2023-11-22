import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { AccordionProvider, Heading1, Markdown } from '@/components';
import { BreadcrumbNavigationElement } from '@/components/BreadcrumbNavigation';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { LinkData, SideNavigation } from '@/components/SideNavigation';
import { GET_THEME_BY_SLUG } from '@/query';
import { SiblingData } from '@/types';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type Params = {
  params: {
    locale: string;
    themeSlug: string;
  };
};

export async function generateMetadata({ params: { locale, themeSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEME_BY_SLUG,
    variables: { slug: themeSlug, locale },
  });
  return {
    title: data.findSlug.data?.attributes?.title,
    description: data.findSlug.data?.attributes?.description,
  };
}

const ThemePage = async ({ params: { locale, themeSlug } }: Params) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEME_BY_SLUG,
    variables: { slug: themeSlug, locale, pageMode: isEnabled ? 'preview' : 'live' },
  });

  if (!data.findSlug?.data) return notFound();

  const navigationPageSlug = data.findSlug.data?.attributes.navigation_pages?.data[0]?.attributes?.slug;
  const siblingThemes: SiblingData[] =
    data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.theme_pages?.data || [];
  const siblingArticles: SiblingData[] =
    data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.contents?.data || [];

  const themasLinks =
    siblingThemes?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/${locale}/theme/${slug}`,
      isCurrent: slug === themeSlug,
    })) || [];

  const contentLinks =
    siblingArticles?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/${locale}/article/${slug}`,
      isCurrent: slug === themeSlug,
    })) || [];

  const sideNavigationLinks: LinkData[] = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements: BreadcrumbNavigationElement[] = [];

  const parentElement: BreadcrumbNavigationElement = data.findSlug.data?.attributes.navigation_pages?.data[0] && {
    title: data.findSlug.data?.attributes?.navigation_pages?.data[0]?.attributes?.title,
    href: `/${locale}/${navigationPageSlug}`,
  };

  if (parentElement) {
    breadcrumbNavigationElements.push(parentElement);
  }

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
              sections={component.item.map(({ id, label, body }: any) => ({
                id,
                label,
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
          backlinkProps={{ title: parentElement?.title || 'Home', href: parentElement?.href || '/' }}
        />
      </div>
      <Grid className={'utrecht-grid__two-third'}>
        <div className={'utrecht-grid__full-width'}>
          <Heading1>{data.findSlug.data?.attributes?.title}</Heading1>
          <DynamicContent />
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {data.findSlug.data?.attributes?.article_pages.data &&
            data.findSlug.data?.attributes?.article_pages.data[0] &&
            data.findSlug.data?.attributes?.article_pages.data.map((content: any) => {
              const { title, description, slug: contentSlug, previewImage: imageData } = content.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  title={title}
                  description={description}
                  key={`content-${contentSlug}`}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `/${locale}/article/${contentSlug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
      {sideNavigationLinks.length > 1 && (
        <div className={'utrecht-grid-mobile-hidden utrecht-grid__one-third'}>
          <SideNavigation links={sideNavigationLinks} />
        </div>
      )}
    </Grid>
  );
};

export default ThemePage;
