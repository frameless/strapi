import { UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { GET_ALL_PRODUCTS_SLUG_FETCH } from '../../query';

export interface Fields {
  title: string;
  body: string;
}

const getProducts = async ({ locale }: any) => {
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
          locale: locale,
        },
      }),
    });
    // TODO CHECK ANOTHER ERROR HERE

    const { data } = await response.json();
    const products = data?.products?.data;
    return products;
  } catch (error) {
    // TODO ADD ERROR MESSAGES TO I18N
    throw new Error(
      'Oops! Something went wrong on our server. We apologize for the inconvenience. Please try again later.',
    );
  }
};

export const metadata: Metadata = {
  title: 'Alle producten  - Online loket',
  description:
    'Zoekt u een product of dienst van de provincie, een waterschap of het Rijk? Op het overheidsloket kunt u bij alle overheden tegelijk zoeken.',
};

const Home = async ({ params: { locale } }: { params: any }) => {
  const products = await getProducts({ locale });

  return (
    <UnorderedList>
      {products &&
        products.length > 0 &&
        products.map((product: any, index: number) =>
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
