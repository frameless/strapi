'use server';

import { NavigationListType } from '@frameless/ui';
import { GET_NAVIGATION_DATA } from '@/query';
import { createStrapiURL } from './createStrapiURL';
import { fetchData } from './fetchData';

type NavAttributes = {
  attributes: {
    title: string;
    slug: string;
    theme_pages?: { data: NavAttributes[] };
    article_pages?: { data: NavAttributes[] };
  };
};

interface NavTypes {
  data: { navigationPages: { data: NavAttributes[] }; currentLink: { data: NavAttributes[] } };
}

interface GetNavDataType {
  pageMode?: string;
  themeSlug?: string;
  articleSlug?: string;
}

export const getNavData = async ({
  pageMode,
  articleSlug,
  themeSlug,
}: GetNavDataType): Promise<NavigationListType[]> => {
  const { data }: NavTypes = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_DATA,
    variables: { pageMode, articleSlug, themeSlug },
  });

  const navLink = data.navigationPages.data.map(({ attributes }) => {
    if (attributes.slug === data.currentLink.data[0]?.attributes?.slug) {
      return {
        ...attributes,
        theme_pages: data.currentLink.data[0].attributes.theme_pages,
        article_pages: data.currentLink.data[0].attributes.article_pages,
      };
    } else {
      return attributes;
    }
  });

  const isNavList = Array.isArray(navLink);
  const navListData = isNavList
    ? (navLink.map((navigationPage) => {
        const isThemeList = Array.isArray(navigationPage.theme_pages?.data);
        const isArticleList = Array.isArray(navigationPage.article_pages?.data);

        const themeList =
          isThemeList &&
          navigationPage.theme_pages?.data.map(({ attributes: { slug, title, article_pages } }) => ({
            textContent: title,
            href: `/theme/${slug}`,
            children: article_pages?.data.map(({ attributes: { slug: articleSlug, title: articleTitle } }) => ({
              textContent: articleTitle,
              href: `/article/${articleSlug}`,
            })),
          }));

        const articleList =
          isArticleList &&
          navigationPage.article_pages?.data.map(({ attributes: { slug, title, theme_pages } }) => ({
            textContent: title,
            href: `/article/${slug}`,
            children: theme_pages?.data.map(({ attributes: { slug: themeSlug, title: themeTitle } }) => ({
              textContent: themeTitle,
              href: `/theme/${themeSlug}`,
            })),
          }));

        return {
          textContent: navigationPage.title,
          href: `/${navigationPage.slug}`,
          children: themeSlug || articleSlug ? [...(themeList || []), ...(articleList || [])] : [],
        };
      }) as NavigationListType[])
    : [];

  return navListData;
};
