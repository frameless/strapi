import { MetadataRoute } from 'next';
import { cookies } from 'next/headers';
import { GET_ALL_ARTICLES_SLUGS, GET_ALL_THEME_SLUGS, GET_NAVIGATION_PAGES } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const { origin } = new URL(process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000');
export type Attributes = {
  slug: string;
  updatedAt: string;
};
export type Urls = {
  attributes: Attributes;
};
export interface GenerateUrlParameter {
  locale?: string;
  origin: string;
  segment?: string;
  urls: Urls[];
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
        url: constructHref({ segments: [origin, locale, segment, url.attributes.slug], baseURL: new URL(origin) }),
        lastModified: url.attributes.updatedAt,
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
        attributes: { slug: '', updatedAt: new Date().toISOString() }, // home page
      },
    ],
  });
  const { data: articleSlugsData } = await fetchData({
    url: createStrapiURL(),
    query: GET_ALL_ARTICLES_SLUGS,
  });
  const { data: navigationSlugsData } = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGES,
  });
  const { data: themeSlugsData } = await fetchData({
    url: createStrapiURL(),
    query: GET_ALL_THEME_SLUGS,
  });

  const articlePages = generateUrl({ locale, origin, segment: 'article', urls: articleSlugsData.articlePages.data });
  const navigationPages = generateUrl({
    locale,
    origin,
    urls: navigationSlugsData?.navigationPages?.data,
  });
  const themePages = generateUrl({ locale, origin, segment: 'theme', urls: themeSlugsData?.themePages?.data });

  const fields = [...articlePages, ...themePages, ...staticPages, ...navigationPages];

  return fields;
}
