import type { RequestHandler } from 'express';
import { SEARCH_PRODUCT } from '../../queries';
import { paths } from '../../types/openapi';
import { fetchData } from '../../utils';

type SuccessResponse = paths['/kennisartikel']['get']['responses'][200]['content']['application/json'][0];

export const kennisartikelController: RequestHandler = async (req, res, next) => {
  const locale = (req.query?.locale as string) || 'nl';
  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
  try {
    const { data } = await fetchData<any>({
      url: graphqlURL.href,
      query: SEARCH_PRODUCT,
      variables: { locale },
      headers: {
        Authorization: `Bearer ${process.env.PDC_STRAPI_API_TOKEN}`,
      },
    });

    if (data && data.products && data.products?.data.length > 0) {
      const kannisartikel = data.products.data.map(({ attributes }) => {
        const upnUri = new URL(`products/${attributes.slug}`, process.env.FRONTEND_PUBLIC_URL);
        const contentBlock = attributes?.sections.find(
          ({ component }: any) => component === 'ComponentComponentsUtrechtRichText',
        );
        const metaTags = attributes?.metaTags;
        const trefwoorden = metaTags?.keymatch?.split(', ').map((trefwoord: string) => ({ trefwoord })) || [];
        const productMetadata = attributes.pdc_metadata;
        const publicatieDatum = new Date(attributes.createdAt);

        const data: Omit<SuccessResponse, 'publicatieDatum'> & { publicatieDatum: Date } = {
          url: upnUri.href,
          uuid: attributes.uuid,
          upnUri: productMetadata?.uplProductNaam,
          publicatieDatum,
          productAanwezig: true,
          productValtOnder: null, // we need an extra field for this
          verantwoordelijkeOrganisatie: {
            url: 'https://utrecht.nl',
            owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
            owmsPrefLabel: '',
            owmsEndDate: new Date() as any,
          },
          locaties: null, //Een lijst met locaties waarop dit product beschikbaar is. Deze is nog niet nodig voor KISS en mag null zijn. Dit obecjt is dus nog niet opgenomen in dit schema
          doelgroep: 'eu-burger',
          afdelingen: [
            {
              afdelingId: '',
              afdelingnaam: '',
            },
          ],
          beschikbareTalen: [attributes?.locale],
          vertalingen: [
            {
              taal: attributes?.locale,
              titel: attributes?.title,
              contact: contentBlock?.kennisartikelCategorie === 'contact' ? contentBlock.content : undefined,
              deskMemo: contentBlock?.kennisartikelCategorie === 'deskMemo' ? contentBlock.content : undefined,
              tekst: contentBlock?.kennisartikelCategorie === 'inleiding' ? contentBlock.content : undefined,
              procedureBeschrijving:
                contentBlock?.kennisartikelCategorie === 'aanvraag' ? contentBlock.content : undefined,
              bewijs: contentBlock?.kennisartikelCategorie === 'bewijs' ? contentBlock.content : undefined,
              vereisten: contentBlock?.kennisartikelCategorie === 'voorwaarden' ? contentBlock.content : undefined,
              bezwaarEnBeroep: contentBlock?.kennisartikelCategorie === 'bezwaar' ? contentBlock.content : undefined,
              kostenEnBetaalmethoden:
                contentBlock?.kennisartikelCategorie === 'kosten' ? contentBlock.content : undefined,
              uitersteTermijn: contentBlock?.kennisartikelCategorie === 'termijn' ? contentBlock.content : undefined,
              wtdBijGeenReactie:
                contentBlock?.kennisartikelCategorie === 'wat_te_doen_bij_geen_reactie'
                  ? contentBlock.content
                  : undefined,
              notice: contentBlock?.kennisartikelCategorie === 'bijzonderheden' ? contentBlock.content : undefined,
              trefwoorden,
              datumWijziging: attributes.updatedAt,
            },
          ],
        };
        return data;
      });
      res.set('Content-Type', 'application/json');
      res.set('Cache-control', 'public, s-maxage=86400, stale-while-revalidate');
      return res.send(kannisartikel);
    }
    res.status(200);

    return res.send([]);
  } catch (error) {
    next(error);
    return null;
  }
};
