import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { client } from '@/client';
import { GET_ALL_PRODUCTS_SLUG } from '@/query';

type Attributes = {
  locale: string;
  slug: string;
  updatedAt: string;
};

interface ProductsAttributes {
  attributes: Attributes;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // TODO find a way to fetch all available pages routes in Nextjs

    const homePage = ctx.locales?.map(
      (locale: string) =>
        ({
          loc: process.env.STRAPI_FRONTEND_URL,
          lastmod: new Date().toISOString(),
          hreflang: locale,
        } as ISitemapField),
    );

    const res = await client.query({
      query: GET_ALL_PRODUCTS_SLUG,
      variables: {
        locale: 'all',
      },
    });

    const products = res.data?.products?.data?.map(
      (product: ProductsAttributes) =>
        ({
          loc: `${process.env.STRAPI_FRONTEND_URL}/${product.attributes.slug}`,
          lastmod: product.attributes.updatedAt,
          hreflang: product.attributes.locale,
        } as ISitemapField),
    );

    const fields = products.concat(homePage);
    return getServerSideSitemapLegacy(ctx, fields);
  } catch (error) {
    return getServerSideSitemapLegacy(ctx, []);
  }
};

// Default export to prevent next.js errors
export default function Sitemap() {}
