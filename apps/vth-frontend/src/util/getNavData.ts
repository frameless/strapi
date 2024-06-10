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
  data: { navigationPages: { data: NavAttributes[] } };
}

interface GetNavDataType {
  pageMode?: string;
}

export const getNavData = async ({ pageMode }: GetNavDataType) => {
  const { data }: NavTypes = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_DATA,
    variables: { pageMode },
  });
  const isNavList = Array.isArray(data?.navigationPages?.data);
  const navListData =
    isNavList &&
    (data.navigationPages.data.map((navigationPage) => {
      const isThemeList = Array.isArray(navigationPage.attributes.theme_pages?.data);
      const isArticleList = Array.isArray(navigationPage.attributes.article_pages?.data);

      const themeList =
        isThemeList &&
        navigationPage.attributes.theme_pages?.data.map(({ attributes: { slug, title, article_pages } }) => ({
          textContent: title,
          href: `/theme/${slug}`,
          children: article_pages?.data.map(({ attributes: { slug: articleSlug, title: articleTitle } }) => ({
            textContent: articleTitle,
            href: `/article/${articleSlug}`,
          })),
        }));

      const articleList =
        isArticleList &&
        navigationPage.attributes.article_pages?.data.map(({ attributes: { slug, title, theme_pages } }) => ({
          textContent: title,
          href: `/article/${slug}`,
          children: theme_pages?.data.map(({ attributes: { slug: themeSlug, title: themeTitle } }) => ({
            textContent: themeTitle,
            href: `/theme/${themeSlug}`,
          })),
        }));

      return {
        textContent: navigationPage.attributes.title,
        href: `/${navigationPage.attributes.slug}`,
        children: [...(themeList || []), ...(articleList || [])],
      };
    }) as NavigationListType[]);

  return navListData;
};
