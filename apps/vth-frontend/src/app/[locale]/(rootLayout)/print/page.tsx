import {
  Article,
  Emphasis,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link,
  LinkProps,
  Paragraph,
  RichText,
} from '@utrecht/component-library-react';
import { clsx } from 'clsx';
import React, { ReactNode } from 'react';
import { HTMLAttributes, LiHTMLAttributes, type PropsWithChildren } from 'react';
import { useTranslation } from '@/app/i18n';
import { AccordionProvider, Grid, GridCell, Markdown, ScrollToTopButton, UtrechtIconChevronUp } from '@/components';
import { Page, PageContent } from '@/components';
import { PrintButton } from '@/components/PrintButton';
import { GET_PRINT_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

import '@/styles/print.css';
import '@/styles/space.css';

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

const PrintPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['common']);
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
    <Page>
      <PageContent className="utrecht-custom-page-content">
        <div className="utrecht-print-page">
          <PrintButton />
          <Article>
            <header className="utrecht-document-header">
              <Heading1>{printPageData?.title}</Heading1>
              <Paragraph>
                <Emphasis>Versiedatum: {printPageData?.versiondate}</Emphasis>
              </Paragraph>
              <Paragraph>{printPageData?.introductionBody}</Paragraph>
            </header>
            <TableOfContentsWithData heading="Inhoudsopgave" navigationPagesResponse={navigationPagesResponse} />
            {navigationPagesResponse.data[0] &&
              navigationPagesResponse.data.map(({ attributes: navigationPage }, index) => {
                return (
                  <GridCell sm={12} key={index}>
                    {NavigationPageDisplay(navigationPage, (index + 1).toString())}
                  </GridCell>
                );
              })}
          </Article>
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

export type TableOfContentsProps = HTMLAttributes<HTMLElement>;

export const TableOfContents = ({ children, className, ...restProps }: PropsWithChildren<TableOfContentsProps>) => (
  <section className={clsx('utrecht-table-of-contents', className)} {...restProps}>
    {children}
  </section>
);

export type TableOfContentsListProps = HTMLAttributes<HTMLElement>;

export const TableOfContentsList = ({
  children,
  className,
  ...restProps
}: PropsWithChildren<TableOfContentsListProps>) => (
  <ul className={clsx('utrecht-table-of-contents__list', className)} {...restProps}>
    {children}
  </ul>
);

export type TableOfContentsListItemProps = LiHTMLAttributes<HTMLLIElement>;

export const TableOfContentsListItem = ({
  children,
  className,
  ...restProps
}: PropsWithChildren<TableOfContentsListItemProps>) => (
  <li className={clsx('utrecht-table-of-contents__list-item', className)} {...restProps}>
    <span className="utrecht-table-of-contents__list-item-body">{children}</span>
  </li>
);

export interface TableOfContentsLinkProps extends LinkProps {
  href: string;
  label?: string;
}

export const TableOfContentsLink = ({
  children,
  className,
  label,
  ...restProps
}: PropsWithChildren<TableOfContentsLinkProps>) => (
  <Link className={clsx('utrecht-table-of-contents__link', className)} {...restProps}>
    {label && <span className="utrecht-table-of-contents__list-item-label">{label}</span>}
    <span className="utrecht-table-of-contents__list-item-title">{children}</span>
  </Link>
);

const formatChapter = (...levels: number[]): string => `${levels.map((n) => n + 1).join('.')}. `;

const TableOfContentsWithData = ({
  heading,
  navigationPagesResponse,
}: {
  heading?: ReactNode;
  navigationPagesResponse: NavigationPagesResponse;
}) => {
  return (
    <TableOfContents>
      {heading ? <Heading level={2}>{heading}</Heading> : null}
      <TableOfContentsList>
        {navigationPagesResponse.data[0] &&
          navigationPagesResponse.data.map(({ attributes: navigationPage }, indexA) => {
            return (
              <TableOfContentsListItem key={indexA}>
                <TableOfContentsLink href={`#navigation-page-${navigationPage.title}`} label={formatChapter(indexA)}>
                  {navigationPage.title}
                </TableOfContentsLink>
                <TableOfContentsList>
                  {navigationPage.theme_pages.data &&
                    navigationPage.theme_pages.data.map(({ attributes: themePage }, indexB) => {
                      return (
                        <TableOfContentsListItem key={indexB}>
                          <TableOfContentsLink
                            href={`#theme-page-${themePage.title}`}
                            label={formatChapter(indexA, indexB)}
                          >
                            {themePage.title}
                          </TableOfContentsLink>
                          <TableOfContentsList>
                            {themePage.article_pages.data &&
                              themePage.article_pages.data.map(({ attributes: articlePage }, indexC) => {
                                return (
                                  <TableOfContentsListItem key={indexC}>
                                    <TableOfContentsLink
                                      href={`#article-page-${articlePage.title}`}
                                      label={formatChapter(indexA, indexB, indexC)}
                                    >
                                      {articlePage.title}
                                    </TableOfContentsLink>
                                  </TableOfContentsListItem>
                                );
                              })}
                          </TableOfContentsList>
                        </TableOfContentsListItem>
                      );
                    })}
                  {navigationPage.article_pages.data &&
                    navigationPage.article_pages.data.map(({ attributes: articlePage }, indexB) => {
                      return (
                        <TableOfContentsListItem key={indexB}>
                          <TableOfContentsLink
                            href={`#article-page-${articlePage.title}`}
                            label={formatChapter(indexA, indexB)}
                          >
                            {articlePage.title}
                          </TableOfContentsLink>
                        </TableOfContentsListItem>
                      );
                    })}
                </TableOfContentsList>
              </TableOfContentsListItem>
            );
          })}
      </TableOfContentsList>
    </TableOfContents>
  );
};

const DynamicContent = ({ content, headingLevel }: { content: any[]; headingLevel: number }) => (
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
              <div key={index} className="utrecht-used-to-be-an-accordion">
                {component.item?.map(({ id, label, body }: any) => (
                  <section id={id} key={id} className="utrecht-used-to-be-an-accordion-section">
                    <Heading level={headingLevel}>{label}</Heading>
                    <Markdown headingLevel={headingLevel} imageUrl={getImageBaseUrl()}>
                      {body}
                    </Markdown>
                  </section>
                ))}
              </div>
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
    <>
      <Heading2 id={`navigation-page-${navigationPage.title}`}>
        {indexString}. {navigationPage.title}
      </Heading2>
      <DynamicContent headingLevel={3} content={navigationPage.content} />
      {navigationPage.theme_pages.data &&
        navigationPage.theme_pages.data.map(({ attributes: themePage }) => {
          return ThemePageDisplay(themePage, `${indexString}.${++levelIndex}`);
        })}
      {navigationPage.article_pages.data &&
        navigationPage.article_pages.data.map(({ attributes: articlePage }) => {
          return ArticlePageDisplay(articlePage, `${indexString}.${++levelIndex}`);
        })}
    </>
  );
};

const ThemePageDisplay = (themePage: ThemePage, indexString: string) => {
  return (
    <>
      <Heading3 id={`theme-page-${themePage.title}`}>
        {indexString}. {themePage.title}
      </Heading3>
      <DynamicContent headingLevel={4} content={themePage.content} />
      {themePage.article_pages.data &&
        themePage.article_pages.data.map(({ attributes: articlePage }, index) => {
          return ArticlePageDisplay(articlePage, `${indexString}.${index + 1}`);
        })}
    </>
  );
};

const ArticlePageDisplay = (articlePage: ArticlePage, indexString: string) => {
  return (
    <>
      <Heading4 id={`article-page-${articlePage.title}`}>
        {indexString}. {articlePage.title}
      </Heading4>
      <DynamicContent headingLevel={5} content={articlePage.content} />
    </>
  );
};
export default PrintPage;
