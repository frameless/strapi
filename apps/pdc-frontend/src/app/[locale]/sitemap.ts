import { MetadataRoute } from 'next';
import { cookies } from 'next/headers';
import { GET_ALL_PRODUCTS_SITEMAP } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetAllProductsSitemapQuery } from '../../../gql/graphql';
import { useTranslation } from '../i18n';

const { origin } = new URL(process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000');

const generateStaticPagesPath = (paths: string[]) => {
  return paths.map((path) => ({
    url: `${origin}/${path}`,
    lastModified: new Date().toISOString(),
  }));
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = cookies().get('i18nextLng')?.value || 'nl';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'common');
  const productsSegment = t('segments.products', {
    defaultValue: 'producten',
  });
  const staticPages = generateStaticPagesPath(['', productsSegment]);
  const { data } = await fetchData<{ data: GetAllProductsSitemapQuery }>({
    url: createStrapiURL(),
    query: GET_ALL_PRODUCTS_SITEMAP,
  });

  const products = data?.products?.data?.map((product) => ({
    url: `${origin}/${product.attributes?.locale}/${productsSegment}/${product.attributes?.slug}`,
    lastModified: product.attributes?.updatedAt,
  }));

  const fields = products?.concat(...staticPages);

  return fields || staticPages;
}
