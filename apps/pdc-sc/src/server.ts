import { convertJsonToXML } from '@frameless/samenwerkende-catalogi';
import axios from 'axios';
import { config } from 'dotenv';
import express from 'express';
import { html } from './components/ErrorPage';

config();

const app = express();
const port = 4000;
const gql = (query: any) => query;
const GET_SAMENWERKENDECATALOGI_FETCH = gql(`
  query getSamenwerkendecatalogi($locale: I18NLocaleCode) {
    products(locale: $locale) {
      data {
        id
        attributes {
          title
          slug
          locale
          updatedAt
          catalogiMeta {
            abstract
            spatial {
              scheme
              resourceIdentifier
            }
            authority {
              scheme
              resourceIdentifier
            }
            audience {
              id
              type
            }
            onlineRequest {
              type
            }
          }
          pdc_metadata {
            uplProductNaam
          }
        }
      }
    }
  }
`);

const { origin } = new URL(process.env.STRAPI_PRIVATE_URL);

const fetchSCData = async ({ locale }: { locale: string }) => {
  try {
    const { data } = await axios.post(`${origin}/graphql`, {
      query: GET_SAMENWERKENDECATALOGI_FETCH,
      variables: {
        locale,
      },
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new Error('Error fetching data');
  }
};

app.get('/', async (req, res) => {
  const locale = (req.query.locale as string) || 'nl';

  try {
    const { data } = await fetchSCData({ locale });

    if (data && data.products && data.products?.data.length > 0) {
      const xml = convertJsonToXML(data?.products?.data, process.env.FRONTEND_PUBLIC_URL);
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
    console.error(error?.message);
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
