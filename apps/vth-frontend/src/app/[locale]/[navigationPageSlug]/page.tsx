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
  Heading1,
  Markdown,
  Page,
  PageContent,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { Card } from '@/components/Card';
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
  const { t } = await useTranslation(locale, ['common']);
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
            <div>
              <h2>Details/Summary</h2>
              <div>
                {component.item.map(({ id, label, body }: any) => (
                  <details key={id} className="utrecht-accordion">
                    <summary className="utrecht-accordion__section">
                      <h3 className="utrecht-button utrecht-button--subtle utrecht-accordion__button">{label}</h3>
                    </summary>
                    <div className="utrecht-accordion__panel">
                      <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>
                    </div>
                  </details>
                ))}
              </div>
              <h2>Original AccordionProvider</h2>
              <AccordionProvider
                sections={component.item.map(({ id, label, body }: any) => ({
                  id,
                  label,
                  headingLevel: 3,
                  body: <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>,
                }))}
              />
            </div>
          );
        default:
          return null;
      }
    });

  return (
    <Page>
      <PageContent className="utrecht-custom-page-content">
        <Breadcrumbs
          Link={Link}
          links={[{ label: 'Home', href: '/', current: false }]}
          backLink={{ label: 'Home', href: '/', current: false }}
        />
        <Grid spacing="sm">
          <GridCell md={12}>
            <Grid spacing="sm">
              <GridCell md={8}>
                <Heading1>{title}</Heading1>
                <DynamicContent />
              </GridCell>
            </Grid>
          </GridCell>
          <GridCell md={8}>
            <Grid spacing="sm">
              {themes?.length > 0 &&
                themes.map((theme: any) => {
                  const { title, description, slug: childSlug, previewImage: imageData } = theme.attributes;
                  const imageUrl = imageData?.data?.attributes?.url;
                  return (
                    <GridCell sm={6} key={`theme-${childSlug}`}>
                      <Card
                        image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                        title={title}
                        description={description}
                        link={{ href: `/${locale}/theme/${childSlug}` }}
                      />
                    </GridCell>
                  );
                })}
              {articles?.length > 0 &&
                articles.map((article: any) => {
                  const { title, description, slug: articleSlug, previewImage: imageData } = article.attributes;
                  const imageUrl = imageData?.data?.attributes?.url;
                  return (
                    <GridCell sm={6} key={`thema-${articleSlug}`}>
                      <Card
                        title={title}
                        description={description}
                        key={`thema-${articleSlug}`}
                        image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                        link={{ href: `/${locale}/article/${articleSlug}` }}
                      />
                    </GridCell>
                  );
                })}
            </Grid>
          </GridCell>
        </Grid>
        <Grid spacing="lg">
          <GridCell md={12} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default NavigationPage;
