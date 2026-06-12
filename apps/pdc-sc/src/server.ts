import { convertJsonToXML } from '@frameless/samenwerkende-catalogi';
import { config } from 'dotenv';
import express from 'express';
import { fetchData } from '@frameless/utils';

import { html } from './components/ErrorPage';
import { mapProductToScProduct } from './mapper';
import { GET_SAMENWERKENDECATALOGI_FETCH } from './queries';
import { GetSamenwerkendeCatalogiFetchQuery } from './gql/graphql';

config();

if (!process.env.STRAPI_PRIVATE_URL) throw new Error('`STRAPI_PRIVATE_URL` is required');
if (!process.env.FRONTEND_PUBLIC_URL) throw new Error('`FRONTEND_PUBLIC_URL` is required');

const { origin } = new URL(process.env.STRAPI_PRIVATE_URL);
const FRONTEND_PUBLIC_URL = process.env.FRONTEND_PUBLIC_URL;

const app = express();
const port = 4000;

const fetchSCData = async ({ locale }: { locale: string }) => {
  try {
    const data = await fetchData<{ data: GetSamenwerkendeCatalogiFetchQuery }>({
      url: `${origin}/graphql`,
      query: GET_SAMENWERKENDECATALOGI_FETCH,
      variables: {
        locale,
      },
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data from Strapi:', error);
    throw new Error('Error fetching data from Strapi');
  }
};

app.get('/', async (req, res) => {
  const locale = (req.query.locale as string) || 'nl';

  try {
    const { data } = await fetchSCData({ locale });

    if (data && data.products && data.products.length > 0) {
      const xml = convertJsonToXML(
        (data?.products ?? []).filter((p): p is NonNullable<typeof p> => p !== null).map(mapProductToScProduct),
        FRONTEND_PUBLIC_URL,
      );
      res.status(200);
      res.set('Content-Type', 'application/xml; charset=utf-8');
      res.set('Cache-control', 'public, s-maxage=86400, stale-while-revalidate');

      return res.send(xml);
    }
    res.status(404);
    res.set('Content-Type', 'text/html; charset=utf-8');
    return res.send(
      html({
        title: 'No Products Found',
        message: `Apologies, no products are currently available in the selected "${locale?.toLocaleUpperCase()}" language. Please try another language or check back later.`,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error instanceof Error ? error.message : error);
    res.status(500);
    res.set('Content-Type', 'text/html; charset=utf-8');
    return res.send(
      html({
        title: 'Server Error',
        message: "Oops! Something went wrong on our end. We're working to fix it. Please try again later.",
      }),
    );
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Samenwerkendecatalogi app listening on port ${port}`);
});
