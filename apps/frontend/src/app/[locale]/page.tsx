import { UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchData } from '@/util/fetchData';
import { GET_ALL_PRODUCTS_SLUG_FETCH } from '../../query';
import { useTranslation } from '../i18n';

export interface Fields {
  title: string;
  body: string;
}

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'home-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}

const Home = async ({ params: { locale } }: { params: any }) => {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
    query: GET_ALL_PRODUCTS_SLUG_FETCH,
    variables: { locale },
  });

  return (
    <UnorderedList>
      {data?.products.data &&
        data?.products?.data?.length > 0 &&
        data.products.data.map((product: any, index: number) =>
          product && product.attributes ? (
            <UnorderedListItem key={index}>
              <Link className="utrecht-link" href={`${locale}/products/${product.attributes.slug}`} locale={locale}>
                {product.attributes.title}
              </Link>
            </UnorderedListItem>
          ) : null,
        )}
    </UnorderedList>
  );
};

export default Home;
