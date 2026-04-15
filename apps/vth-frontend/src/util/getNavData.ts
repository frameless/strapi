'use server';

import { NavigationListType } from '@frameless/ui';

import { GetNavigationDataQuery } from '../../gql/graphql';

import { fetchData } from './fetchData';
import { createStrapiURL } from './createStrapiURL';

import { GET_NAVIGATION_DATA } from '@/query';

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
  const { data } = await fetchData<GetNavigationDataQuery>({
    url: createStrapiURL(),
    query: GET_NAVIGATION_DATA,
    variables: { pageMode, articleSlug, themeSlug },
  });

  const navLink = (data.navigationPages ?? []).map((navigationPage) => {
    if (navigationPage?.slug === data.currentLink[0]?.slug) {
      return {
        ...navigationPage,
        slug: data.currentLink[0]?.slug,
        theme_pages: data.currentLink[0]?.theme_pages,
        article_pages: data.currentLink[0]?.article_pages,
      };
    } else {
      return navigationPage;
    }
  });

  const isNavList = Array.isArray(navLink);
  const navListData = isNavList
    ? (navLink.map((navigationPage) => {
        const themeList = navigationPage?.theme_pages?.map((theme) => ({
          textContent: theme?.title,
          href: `/theme/${theme?.slug}`,
          children: theme?.article_pages?.map((article) => ({
            textContent: article?.title,
            href: `/article/${article?.slug}`,
          })),
        }));

        const articleList = navigationPage?.article_pages?.map((article) => ({
          textContent: article?.title,
          href: `/article/${article?.slug}`,
          children: article?.theme_pages?.map((theme) => ({
            textContent: theme?.title,
            href: `/theme/${theme?.slug}`,
          })),
        }));

        return {
          textContent: navigationPage?.title,
          href: `/${navigationPage?.slug}`,
          children: themeSlug || articleSlug ? [...(themeList || []), ...(articleList || [])] : [],
        };
      }) as NavigationListType[])
    : [];

  return navListData;
};
