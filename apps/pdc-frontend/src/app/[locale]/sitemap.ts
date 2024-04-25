import { MetadataRoute } from 'next';
import { GET_ALL_PRODUCTS_SITEMAP } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetAllProductsSitemapQuery } from '../../../gql/graphql';

const { origin } = new URL(process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000');

const generateStaticPagesPath = (paths: string[]) => {
  return paths.map((path) => ({
    url: `${origin}/${path}`,
    lastModified: new Date().toISOString(),
  }));
};
const staticPages = generateStaticPagesPath(['', 'products']);
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await fetchData<{ data: GetAllProductsSitemapQuery }>({
    url: createStrapiURL(),
    query: GET_ALL_PRODUCTS_SITEMAP,
  });

  const products = data?.products?.data?.map((product) => ({
    url: `${origin}/${product.attributes?.locale}/products/${product.attributes?.slug}`,
    lastModified: product.attributes?.updatedAt,
  }));

  const fields = products?.concat(...staticPages);

  return fields || staticPages;
}
