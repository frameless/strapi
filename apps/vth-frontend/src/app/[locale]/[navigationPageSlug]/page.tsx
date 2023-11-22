import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { AccordionProvider, Heading1, Markdown } from '@/components';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { GET_NAVIGATION_PAGE_BY_SLUG } from '@/query';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type Params = {
  params: {
    locale: string;
    navigationPageSlug: string;
  };
};

export async function generateMetadata({ params: { locale, navigationPageSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGE_BY_SLUG,
    variables: { slug: navigationPageSlug, locale },
  });
  return {
    title: data.findSlug?.data?.attributes?.title,
    description: data.findSlug?.data?.attributes?.description,
  };
}

const NavigationPage = async ({ params: { locale, navigationPageSlug } }: Params) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGE_BY_SLUG,
    variables: { slug: navigationPageSlug, locale, pageMode: isEnabled ? 'preview' : 'live' },
  });
  const navigationPage = data.findSlug?.data;
  if (!navigationPage) return notFound();
  const content = navigationPage.attributes.content;
  const title = navigationPage.attributes.title;
  const articles = navigationPage.attributes.article_pages?.data;
  const themes = navigationPage.attributes.theme_pages?.data;

  const DynamicContent = () =>
    content &&
    content?.length > 0 &&
    content?.map((component: any, index: number) => {
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
          breadcrumbProps={{ navigationElements: [] }}
          backlinkProps={{ title: 'Home', href: '/' }}
        />
      </div>
      <Grid className={'utrecht-grid__two-third'}>
        <div className={'utrecht-grid__full-width'}>
          <Heading1>{title}</Heading1>
          <DynamicContent />
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {themes?.length > 0 &&
            themes.map((theme: any) => {
              const { title, description, slug: childSlug, previewImage: imageData } = theme.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  title={title}
                  description={description}
                  key={`theme-${childSlug}`}
                  link={{ href: `/${locale}/theme/${childSlug}` }}
                />
              );
            })}
          {articles?.length > 0 &&
            articles.map((article: any) => {
              const { title, description, slug: articleSlug, previewImage: imageData } = article.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  title={title}
                  description={description}
                  key={`thema-${articleSlug}`}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `/${locale}/article/${articleSlug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NavigationPage;
