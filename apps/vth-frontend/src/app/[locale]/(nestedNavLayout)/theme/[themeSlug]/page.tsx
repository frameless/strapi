import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Get_Theme_By_SlugQuery } from '../../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import {
  AccordionProvider,
  Grid,
  GridCell,
  Header,
  Heading1,
  Markdown,
  NavigationList,
  Page,
  PageContent,
  RichText,
} from '@/components';
import { Card } from '@/components/Card';
import { Main } from '@/components/Main';
import { GET_THEME_BY_SLUG } from '@/query';
import { config } from '@/util';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { getNavData } from '@/util/getNavData';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

type Params = {
  params: Promise<{
    locale: string;
    themeSlug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const { themeSlug } = params;
  const { data } = await fetchData<Get_Theme_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_THEME_BY_SLUG,
    variables: { slug: themeSlug, pageMode: 'PUBLISHED' },
  });
  return {
    title: data.themePages?.[0]?.title ?? '',
    description: data.themePages?.[0]?.description ?? '',
  };
}

const ThemePage = async (props: Params) => {
  const params = await props.params;
  const { locale, themeSlug } = params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const { isEnabled } = await draftMode();
  const { data } = await fetchData<Get_Theme_By_SlugQuery>({
    url: createStrapiURL(),
    query: GET_THEME_BY_SLUG,
    variables: { slug: themeSlug, locale, pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED' },
  });

  if (!data.themePages?.[0]) return notFound();

  const theme = data.themePages?.[0];
  const navigationPageSlug = theme?.navigation_pages?.[0]?.slug;
  const siblingThemes = theme?.navigation_pages?.[0]?.theme_pages ?? [];
  const siblingArticles = theme?.navigation_pages?.[0]?.article_pages ?? [];

  const themasLinks =
    siblingThemes?.map((page) => ({
      textContent: page?.title ?? '',
      href: `/${locale}/theme/${page?.slug}`,
      isCurrent: page?.slug === themeSlug,
    })) || [];

  const contentLinks =
    siblingArticles?.map((page) => ({
      textContent: page?.title ?? '',
      href: `/${locale}/article/${page?.slug}`,
      isCurrent: page?.slug === themeSlug,
    })) || [];

  const sideNavigationLinks = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements = [
    {
      label: 'Home',
      href: '/',
      current: false,
    },
  ];

  const parentElement = theme.navigation_pages?.[0] && {
    label: theme?.navigation_pages?.[0]?.title ?? '',
    href: `/${locale}/${navigationPageSlug}`,
    current: false,
  };

  if (parentElement) {
    breadcrumbNavigationElements.push(parentElement);
  }

  const DynamicContent = () =>
    theme?.content &&
    theme?.content.length > 0 &&
    theme?.content?.map((component: any, index: number) => {
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
  const navList = await getNavData({ pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED', themeSlug });

  return (
    <Page>
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
      <PageContent className="utrecht-custom-page-content">
        <Breadcrumbs
          links={breadcrumbNavigationElements}
          backLink={{ label: parentElement?.label || 'Home', href: parentElement?.href || '/', current: false }}
        />
        <Main id="main">
          <Grid spacing="md">
            <GridCell md={8}>
              <Grid spacing="sm">
                <GridCell sm={12}>
                  <RichText>
                    <Heading1>{theme.title}</Heading1>
                    <DynamicContent />
                  </RichText>
                </GridCell>
                {theme?.article_pages &&
                  theme?.article_pages[0] &&
                  theme?.article_pages.map((content) => {
                    if (!content) return null;
                    const { title, description, slug: contentSlug, previewImage } = content;
                    const imageUrl = previewImage?.url;
                    const imageAlt = previewImage?.alternativeText ?? '';
                    return (
                      <GridCell sm={6} key={`content-${contentSlug}`}>
                        <Card
                          title={title ?? ''}
                          description={description ?? ''}
                          image={{
                            url: imageUrl ? `${getImageBaseUrl()}${imageUrl}` : '',
                            alt: imageAlt,
                          }}
                          link={{ href: `/${locale}/article/${contentSlug}` }}
                        />
                      </GridCell>
                    );
                  })}
              </Grid>
            </GridCell>
            {sideNavigationLinks.length > 1 && (
              <GridCell md={4} className="utrecht-grid-mobile-hidden">
                <nav>
                  <NavigationList list={sideNavigationLinks} sideNav mobile />
                </nav>
              </GridCell>
            )}
          </Grid>
        </Main>
        <Grid spacing="lg">
          <GridCell md={12} justifyContent="flex-end">
            <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default ThemePage;
