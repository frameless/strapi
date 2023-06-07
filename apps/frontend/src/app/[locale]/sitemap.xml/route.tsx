import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GET_ALL_PRODUCTS_SLUG_FETCH } from '@/query';
import { i18n } from '../../../i18n-config';

type Attributes = {
  locale: string;
  slug: string;
  updatedAt: string;
};

interface ProductsAttributes {
  attributes: Attributes;
}

// TODO find a way to fetch all available pages routes in Nextjs
const generateStaticPagesPath = (locales: typeof i18n.locales, paths: string[]) => {
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
    const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_ALL_PRODUCTS_SLUG_FETCH,
        variables: {
          locale: 'all',
        },
      }),
    });

    const { data } = await response.json();

    const products = data?.products?.data?.map(
      (product: ProductsAttributes) =>
        ({
          loc: `${process.env.STRAPI_FRONTEND_URL}/${product.attributes.slug}`,
          lastmod: product.attributes.updatedAt,
          hreflang: product.attributes.locale,
        } as ISitemapField),
    );
    const fields = products.concat(...generateStaticPagesPath(i18n.locales, ['/']));

    return getServerSideSitemap(fields);
  } catch (error) {
    return false;
  }
}
