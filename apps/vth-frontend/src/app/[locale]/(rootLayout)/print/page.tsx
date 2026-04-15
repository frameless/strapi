import {
  Emphasis,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  RichText,
} from '@utrecht/component-library-react';
import React from 'react';

import { Get_Print_PageQuery } from '../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import {
  AccordionProvider,
  Grid,
  GridCell,
  Markdown,
  ScrollToTopButton,
  UtrechtIconChevronUp,
  Page,
  PageContent,
} from '@/components';
import { PrintButton } from '@/components/PrintButton';
import { GET_PRINT_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

import '@/styles/print.css';
import '@/styles/space.css';

const PrintPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData<Get_Print_PageQuery>({
    url: createStrapiURL(),
    query: GET_PRINT_PAGE,
    variables: { locale: locale },
  });

  const printPageData = data?.printPage;
  const navigationPages = data?.navigationPages;

  navigationPages?.sort((a, b) => {
    return (a?.title ?? '').localeCompare(b?.title ?? '');
  });

  navigationPages?.forEach((navigationPage) => {
    if (!navigationPage) return;

    navigationPage.theme_pages?.sort((a, b) => {
      return (a?.title ?? '').localeCompare(b?.title ?? '');
    });
    navigationPage.article_pages?.sort((a, b) => {
      return (a?.title ?? '').localeCompare(b?.title ?? '');
    });
    navigationPage.theme_pages?.forEach((themePage) => {
      if (!themePage) return;

      themePage.article_pages?.sort((a, b) => {
        return (a?.title ?? '').localeCompare(b?.title ?? '');
      });
    });
  });

  return (
    <Page>
      <PageContent className="utrecht-custom-page-content">
        <div className="utrecht-print-page">
          <PrintButton />
          <Grid spacing="lg">
            <GridCell sm={12}>
              <section>
                <Heading1>{printPageData?.title}</Heading1>
                <Emphasis>Versiedatum: {printPageData?.versiondate}</Emphasis>
                <Paragraph>{printPageData?.introductionBody}</Paragraph>
              </section>
              <section>
                <Heading2>Inhoudsopgave</Heading2>
                <TableOfContents navigationPages={navigationPages} />
              </section>
            </GridCell>
          </Grid>
          <Grid spacing="lg">
            {navigationPages?.[0] &&
              navigationPages.map((navigationPage, index) => {
                if (!navigationPage) return null;
                return (
                  <GridCell sm={12} key={index}>
                    {NavigationPageDisplay(navigationPage, (index + 1).toString())}
                  </GridCell>
                );
              })}
          </Grid>
        </div>
        <Grid spacing="lg">
          <GridCell md={12} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </PageContent>
    </Page>
  );
};

const TableOfContents = ({ navigationPages }: { navigationPages: Get_Print_PageQuery['navigationPages'] }) => {
  return (
    <ol>
      {navigationPages?.[0] &&
        navigationPages?.map((navigationPage, index) => {
          return (
            <li key={index}>
              <a href={`#navigation-page-${navigationPage?.title}`}>{navigationPage?.title}</a>
              <ol>
                {navigationPage?.theme_pages &&
                  navigationPage.theme_pages.map((themePage, index) => {
                    return (
                      <li key={index}>
                        <a href={`#theme-page-${themePage?.title}`}>{themePage?.title}</a>
                        <ol>
                          {themePage?.article_pages &&
                            themePage.article_pages.map((articlePage, index) => {
                              return (
                                <li key={index}>
                                  <a href={`#article-page-${articlePage?.title}`}>{articlePage?.title}</a>
                                </li>
                              );
                            })}
                        </ol>
                      </li>
                    );
                  })}
                {navigationPage?.article_pages &&
                  navigationPage.article_pages.map((articlePage, index) => {
                    return (
                      <li key={index}>
                        <a href={`#article-page-${articlePage?.title}`}>{articlePage?.title}</a>
                      </li>
                    );
                  })}
              </ol>
            </li>
          );
        })}
    </ol>
  );
};

const DynamicContent: React.FC<{
  content: any[];
}> = ({ content }) => (
  <>
    {content &&
      content.length > 0 &&
      content.map((component, index) => {
        switch (component.__typename) {
          case 'ComponentComponentsUtrechtRichText':
            return component.content ? (
              <Markdown imageUrl={getImageBaseUrl()} key={index}>
                {component.content}
              </Markdown>
            ) : null;
          case 'ComponentComponentsUtrechtAccordion':
            return (
              <AccordionProvider
                key={index}
                sections={component.item?.map(({ id, label, body, headingLevel }: any) => ({
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
      })}
  </>
);

const NavigationPageDisplay = (
  navigationPage: NonNullable<Get_Print_PageQuery['navigationPages'][number]>,
  indexString: string,
) => {
  let levelIndex = 0;

  return (
    <RichText>
      <Heading2 id={`navigation-page-${navigationPage.title}`}>
        {indexString}. {navigationPage.title}
      </Heading2>
      <DynamicContent content={navigationPage.content ?? []} />
      {navigationPage.theme_pages &&
        navigationPage.theme_pages?.map((themePage) => {
          if (!themePage) return null;

          return ThemePageDisplay(themePage, `${indexString}.${++levelIndex}`);
        })}
      {navigationPage.article_pages &&
        navigationPage.article_pages.map((articlePage) => {
          if (!articlePage) return null;
          return ArticlePageDisplay(articlePage, `${indexString}.${++levelIndex}`);
        })}
    </RichText>
  );
};

const ThemePageDisplay = (
  themePage: NonNullable<Get_Print_PageQuery['navigationPages'][number]>['theme_pages'][number],
  indexString: string,
) => {
  return (
    <RichText>
      <Heading3 id={`theme-page-${themePage?.title}`}>
        {indexString}. {themePage?.title}
      </Heading3>
      <DynamicContent content={themePage?.content ?? []} />
      {themePage?.article_pages &&
        themePage.article_pages.map((articlePage, index) => {
          if (!articlePage) return null;
          return ArticlePageDisplay(articlePage, `${indexString}.${index + 1}`);
        })}
    </RichText>
  );
};

const ArticlePageDisplay = (
  articlePage: NonNullable<Get_Print_PageQuery['navigationPages'][number]>['article_pages'][number],
  indexString: string,
) => {
  return (
    <RichText>
      <Heading4 id={`article-page-${articlePage?.title}`}>
        {indexString}. {articlePage?.title}
      </Heading4>
      <DynamicContent content={articlePage?.content ?? []} />
    </RichText>
  );
};
export default PrintPage;
