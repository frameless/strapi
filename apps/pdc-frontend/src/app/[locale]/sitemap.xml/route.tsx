import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { languages } from '@/app/i18n/settings';
import { GET_ALL_PRODUCTS_SLUG } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetAllProductsSlugQueryQuery } from '../../../../gql/graphql';

// TODO find a way to fetch all available pages routes in Nextjs
const generateStaticPagesPath = (locales: typeof languages, paths: string[]) => {
  return locales.map((locale) =>
    paths.map((path) => ({
      loc: `${process.env.FRONTEND_PUBLIC_URL}${path}`,
      lastmod: new Date().toISOString(),
      hreflang: locale,
    })),
  );
};

export async function GET() {
  try {
    const { data } = await fetchData<{ data: GetAllProductsSlugQueryQuery }>({
      url: createStrapiURL(),
      query: GET_ALL_PRODUCTS_SLUG,
      variables: {
        locale: 'all',
      },
    });

    const products = data?.products?.data?.map(
      (product) =>
        ({
          loc: `${process.env.FRONTEND_PUBLIC_URL}/${product.attributes?.slug}`,
          lastmod: product.attributes?.updatedAt,
          hreflang: product.attributes?.locale,
        }) as ISitemapField,
    );
    const fields = products?.concat(...generateStaticPagesPath(languages, ['/']));

    return fields ? getServerSideSitemap(fields) : getServerSideSitemap([]);
  } catch (error) {
    throw new Error('Something went wrong!');
  }
}
