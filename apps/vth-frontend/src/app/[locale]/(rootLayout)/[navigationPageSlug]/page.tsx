import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Get_Navigation_Page_By_SlugQuery } from '../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import { AccordionProvider, Grid, GridCell, Heading1, Markdown, Page, PageContent } from '@/components';
import { Card } from '@/components/Card';
import { GET_NAVIGATION_PAGE_BY_SLUG } from '@/query';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

type Params = {
  params: Promise<{
    locale: string;
    navigationPageSlug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const { navigationPageSlug } = params;
  const { data } = await fetchData<Get_Navigation_Page_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGE_BY_SLUG,
    variables: { slug: navigationPageSlug, pageMode: 'PUBLISHED' },
  });
  return {
    title: data.navigationPages?.[0]?.title ?? '',
    description: data.navigationPages?.[0]?.description,
  };
}

const NavigationPage = async (props: Params) => {
  const params = await props.params;
  const { locale, navigationPageSlug } = params;
  const { isEnabled } = await draftMode();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData<Get_Navigation_Page_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGE_BY_SLUG,
    variables: { slug: navigationPageSlug, locale, pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED' },
  });
  const navigationPage = data.navigationPages?.[0];
  if (!navigationPage) return notFound();
  const content = navigationPage.content;
  const title = navigationPage.title;
  const articles = navigationPage.article_pages;
  const themes = navigationPage.theme_pages;

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
    <Page>
      <PageContent className="utrecht-custom-page-content">
        <Breadcrumbs
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
                themes.map((theme) => {
                  if (!theme) return null;
                  const { title, description, slug: childSlug, previewImage } = theme;
                  const imageUrl = previewImage?.url;
                  const imageAlt = previewImage?.alternativeText ?? '';

                  return (
                    <GridCell sm={6} key={`theme-${childSlug}`}>
                      <Card
                        image={{ url: imageUrl ? `${getImageBaseUrl()}${imageUrl}` : '', alt: imageAlt }}
                        title={title}
                        description={description!}
                        link={{ href: `/${locale}/theme/${childSlug}` }}
                      />
                    </GridCell>
                  );
                })}
              {articles?.length > 0 &&
                articles.map((article) => {
                  if (!article) return null;
                  const { title, description, slug: articleSlug, previewImage } = article;
                  const imageUrl = previewImage?.url;
                  const imageAlt = previewImage?.alternativeText ?? '';
                  return (
                    <GridCell sm={6} key={`thema-${articleSlug}`}>
                      <Card
                        title={title!}
                        description={description!}
                        key={`thema-${articleSlug}`}
                        image={{ url: imageUrl ? `${getImageBaseUrl()}${imageUrl}` : '', alt: imageAlt }}
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
            <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default NavigationPage;
