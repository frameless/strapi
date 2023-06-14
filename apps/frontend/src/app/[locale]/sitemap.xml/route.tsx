import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { languages } from '@/app/i18n/settings';
import { GET_ALL_PRODUCTS_SLUG_FETCH } from '@/query';
import { fetchData } from '@/util/fetchData';

type Attributes = {
  locale: string;
  slug: string;
  updatedAt: string;
};

interface ProductsAttributes {
  attributes: Attributes;
}

// TODO find a way to fetch all available pages routes in Nextjs
const generateStaticPagesPath = (locales: typeof languages, paths: string[]) => {
  return locales.map((locale) =>
    paths.map((path) => ({
      loc: `${process.env.STRAPI_FRONTEND_URL}${path}`,
      lastmod: new Date().toISOString(),
      hreflang: locale,
    })),
  );
};

export async function GET() {
  try {
    const { data } = await fetchData({
      url: process.env.STRAPI_BACKEND_URL as string,
      query: GET_ALL_PRODUCTS_SLUG_FETCH,
      variables: {
        locale: 'all',
      },
    });

    const products = data?.products?.data?.map(
      (product: ProductsAttributes) =>
        ({
          loc: `${process.env.STRAPI_FRONTEND_URL}/${product.attributes.slug}`,
          lastmod: product.attributes.updatedAt,
          hreflang: product.attributes.locale,
        } as ISitemapField),
    );
    const fields = products.concat(...generateStaticPagesPath(languages, ['/']));

    return getServerSideSitemap(fields);
  } catch (error) {
    return false;
  }
}
