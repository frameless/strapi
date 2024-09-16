import { MetadataRoute } from 'next';
import { cookies } from 'next/headers';
import { GET_ALL_PRODUCTS_SITEMAP } from '@/query';
import { buildURL, fetchData, getStrapiGraphqlURL } from '@/util';
import { GetAllProductsSitemapQuery } from '../../../gql/graphql';
import { useTranslation } from '../i18n';

const generateStaticPagesPath = (paths: string[]) => {
  return paths.map((url) => {
    return {
      url,
      lastModified: new Date().toISOString(),
    };
  });
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = cookies().get('i18nextLng')?.value || 'nl';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'common');
  const productsUrl = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products'],
    locale: locale || 'nl',
  });
  const homePageUrl = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    locale: locale || 'nl',
  });

  const staticPages = generateStaticPagesPath([homePageUrl.href, productsUrl.href]);
  const { data } = await fetchData<{ data: GetAllProductsSitemapQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_ALL_PRODUCTS_SITEMAP,
  });

  const products = data?.products?.data?.map((product) => {
    const url = buildURL({
      translations: t,
      env: process.env,
      key: 'FRONTEND_PUBLIC_URL',
      segments: ['segments.products', product.attributes?.slug as string],
      locale: product.attributes?.locale || 'nl',
    });

    return {
      url: url?.href,
      lastModified: product.attributes?.updatedAt,
    };
  });

  const fields = products?.concat(...staticPages);

  return fields as {
    url: string;
    lastModified: string;
  }[];
}
