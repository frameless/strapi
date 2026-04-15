import { MetadataRoute } from 'next';
import { cookies } from 'next/headers';

import { GetAllAriclesSlugsQuery, GetNavigationPagesQuery, GetAllThemeSlugsQuery } from '@/../../gql/graphql';

import { GET_ALL_ARTICLES_SLUGS, GET_ALL_THEME_SLUGS, GET_NAVIGATION_PAGES } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const { origin } = new URL(process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000');

export type UrlItem = {
  slug: string;
  updatedAt: string;
};
export interface GenerateUrlParameter {
  locale?: string;
  origin: string;
  segment?: string;
  urls: UrlItem[];
}
const constructHref = ({ segments, baseURL }: { segments: any[]; baseURL: string | URL }) => {
  const href = new URL(
    segments
      .filter(Boolean) // Removes falsy values like undefined, null, or empty strings
      .join('/') + '/', // Joins with '/' and ensures a trailing slash
    baseURL,
  ).href;
  return href;
};

export const generateUrl = ({ locale, origin, segment, urls }: GenerateUrlParameter) => {
  const isURls = Array.isArray(urls);

  return isURls
    ? urls.map((url) => ({
        url: constructHref({ segments: [origin, locale, segment, url.slug], baseURL: new URL(origin) }),
        lastModified: url.updatedAt,
      }))
    : [];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = cookies().get('i18next')?.value;
  const staticPages = generateUrl({
    locale,
    origin,
    urls: [
      {
        slug: '',
        updatedAt: new Date().toISOString(),
      },
    ],
  });
  const { data: articleSlugsData } = await fetchData<GetAllAriclesSlugsQuery>({
    url: createStrapiURL(),
    query: GET_ALL_ARTICLES_SLUGS,
  });
  const { data: navigationSlugsData } = await fetchData<GetNavigationPagesQuery>({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGES,
  });
  const { data: themeSlugsData } = await fetchData<GetAllThemeSlugsQuery>({
    url: createStrapiURL(),
    query: GET_ALL_THEME_SLUGS,
  });

  const articlePages = generateUrl({
    locale,
    origin,
    segment: 'article',
    urls: articleSlugsData.articlePages
      .filter((page) => page?.slug && page?.updatedAt)
      .map((page) => ({
        slug: page!.slug!,
        updatedAt: page!.updatedAt!,
      })),
  });
  const navigationPages = generateUrl({
    locale,
    origin,
    urls: navigationSlugsData?.navigationPages
      .filter((page) => page?.slug && page?.updatedAt)
      .map((page) => ({
        slug: page!.slug!,
        updatedAt: page!.updatedAt!,
      })),
  });
  const themePages = generateUrl({
    locale,
    origin,
    segment: 'theme',
    urls: themeSlugsData?.themePages
      .filter((page) => page?.slug && page?.updatedAt)
      .map((page) => ({
        slug: page!.slug!,
        updatedAt: page!.updatedAt!,
      })),
  });

  const fields = [...articlePages, ...themePages, ...staticPages, ...navigationPages];

  return fields;
}
