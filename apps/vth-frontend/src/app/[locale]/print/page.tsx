import { Emphasis, Heading1, Heading2, Heading3, Heading4, Paragraph } from '@utrecht/component-library-react';
import React from 'react';
import { AccordionProvider, Markdown } from '@/components';
import { Grid } from '@/components/Grid';
import { PrintButton } from '@/components/PrintButton';
import { GET_PRINT_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type PrintPageData = {
  title: string;
  versiondate: string;
  introductionBody: string;
};

type ArticlePage = {
  title: string;
  content: any[];
};

type ArticlePagesResponse = {
  data: {
    attributes: ArticlePage;
  }[];
};

type ThemePage = {
  title: string;
  content: any[];
  article_pages: ArticlePagesResponse;
};

type ThemePagesResponse = {
  data: {
    attributes: ThemePage;
  }[];
};

type NavigationPage = {
  title: string;
  content: any[];
  theme_pages: ThemePagesResponse;
  article_pages: ArticlePagesResponse;
};

type NavigationPagesResponse = {
  data: {
    attributes: NavigationPage;
  }[];
};

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_PRINT_PAGE,
    variables: { locale: locale },
  });

  const printPageData: PrintPageData = data?.printPage?.data?.attributes;
  const navigationPagesResponse: NavigationPagesResponse = data?.navigationPages;

  navigationPagesResponse?.data?.sort((a, b) => {
    return a.attributes.title.localeCompare(b.attributes.title);
  });

  navigationPagesResponse?.data?.forEach(({ attributes: navigationPage }) => {
    navigationPage.theme_pages?.data?.sort((a, b) => {
      return a.attributes.title.localeCompare(b.attributes.title);
    });
    navigationPage.article_pages?.data?.sort((a, b) => {
      return a.attributes.title.localeCompare(b.attributes.title);
    });
    navigationPage.theme_pages?.data?.forEach(({ attributes: themePage }) => {
      themePage.article_pages?.data?.sort((a, b) => {
        return a.attributes.title.localeCompare(b.attributes.title);
      });
    });
  });

  return (
    <div className={'utrecht-print-page'}>
      <PrintButton />
      <Grid className={'utrecht-grid--content-padding'}>
        <div className={'utrecht-grid__full-width'}>
          <section>
            <Heading1>{printPageData?.title}</Heading1>
            <Emphasis>Versiedatum: {printPageData?.versiondate}</Emphasis>
            <Paragraph>{printPageData?.introductionBody}</Paragraph>
          </section>
          <section>
            <Heading2>Inhoudsopgave</Heading2>
            <TableOfContents navigationPagesResponse={navigationPagesResponse} />
          </section>
        </div>
      </Grid>
      {navigationPagesResponse.data[0] &&
        navigationPagesResponse.data.map(({ attributes: navigationPage }, index) => {
          return (
            <Grid className={'utrecht-grid--content-padding'} key={index}>
              <div className={'utrecht-grid__full-width'}>
                {NavigationPageDisplay(navigationPage, (index + 1).toString())}
              </div>
            </Grid>
          );
        })}
    </div>
  );
};

const TableOfContents = ({ navigationPagesResponse }: { navigationPagesResponse: NavigationPagesResponse }) => {
  return (
    <ol>
      {navigationPagesResponse.data[0] &&
        navigationPagesResponse.data.map(({ attributes: navigationPage }, index) => {
          return (
            <li key={index}>
              <a href={`#navigation-page-${navigationPage.title}`}>{navigationPage.title}</a>
              <ol>
                {navigationPage.theme_pages.data &&
                  navigationPage.theme_pages.data.map(({ attributes: themePage }, index) => {
                    return (
                      <li key={index}>
                        <a href={`#theme-page-${themePage.title}`}>{themePage.title}</a>
                        <ol>
                          {themePage.article_pages.data &&
                            themePage.article_pages.data.map(({ attributes: articlePage }, index) => {
                              return (
                                <li key={index}>
                                  <a href={`#article-page-${articlePage.title}`}>{articlePage.title}</a>
                                </li>
                              );
                            })}
                        </ol>
                      </li>
                    );
                  })}
                {navigationPage.article_pages.data &&
                  navigationPage.article_pages.data.map(({ attributes: articlePage }, index) => {
                    return (
                      <li key={index}>
                        <a href={`#article-page-${articlePage.title}`}>{articlePage.title}</a>
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
                sections={component.item?.map(({ id, label, body }: any) => ({
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
      })}
  </>
);

const NavigationPageDisplay = (navigationPage: NavigationPage, indexString: string) => {
  let levelIndex = 0;

  return (
    <div>
      <Heading2 id={`navigation-page-${navigationPage.title}`}>
        {indexString}. {navigationPage.title}
      </Heading2>
      <DynamicContent content={navigationPage.content} />
      {navigationPage.theme_pages.data &&
        navigationPage.theme_pages.data.map(({ attributes: themePage }) => {
          return ThemePageDisplay(themePage, `${indexString}.${++levelIndex}`);
        })}
      {navigationPage.article_pages.data &&
        navigationPage.article_pages.data.map(({ attributes: articlePage }) => {
          return ArticlePageDisplay(articlePage, `${indexString}.${++levelIndex}`);
        })}
    </div>
  );
};

const ThemePageDisplay = (themePage: ThemePage, indexString: string) => {
  return (
    <div>
      <Heading3 id={`theme-page-${themePage.title}`}>
        {indexString}. {themePage.title}
      </Heading3>
      <DynamicContent content={themePage.content} />
      {themePage.article_pages.data &&
        themePage.article_pages.data.map(({ attributes: articlePage }, index) => {
          return ArticlePageDisplay(articlePage, `${indexString}.${index + 1}`);
        })}
    </div>
  );
};

const ArticlePageDisplay = (articlePage: ArticlePage, indexString: string) => {
  return (
    <div>
      <Heading4 id={`article-page-${articlePage.title}`}>
        {indexString}. {articlePage.title}
      </Heading4>
      <DynamicContent content={articlePage.content} />
    </div>
  );
};
export default Page;
