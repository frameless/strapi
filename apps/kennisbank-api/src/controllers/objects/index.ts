import type { RequestHandler } from 'express';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_UUID } from '../../queries';
import { components } from '../../types/openapi';
import { fetchData } from '../../utils';

type VACType = components['schemas']['VAC'] & { uuid: string };

const vacData: VACType[] = [
  {
    uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    vraag: 'Wat is het proces om een paspoort aan te vragen?',
    status: 'actief',
    antwoord:
      'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
    doelgroep: 'eu-burger',
  },
  {
    uuid: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
    vraag: 'Hoe kan ik een rijbewijs aanvragen?',
    status: 'actief',
    antwoord:
      'Voor het aanvragen van een rijbewijs moet u een aanvraagformulier invullen en uw identiteitsbewijs meenemen naar het gemeentehuis.',
    doelgroep: 'eu-burger',
  },
  {
    uuid: 'c3d4e5f6-g7h8-9i0j-k1l2-m3n4o5p6q7r8',
    vraag: 'Wat moet ik doen bij verhuizing?',
    status: 'actief',
    antwoord: 'Bij verhuizing moet u zich binnen 5 dagen inschrijven op uw nieuwe adres bij de gemeente.',
    doelgroep: 'eu-burger',
  },
];
const generateKennisartikelObject = ({ attributes }) => {
  const upnUri = new URL(`products/${attributes.slug}`, process.env.FRONTEND_PUBLIC_URL);
  const contentBlock = attributes?.sections.find(
    ({ component }: any) => component === 'ComponentComponentsUtrechtRichText',
  );
  const metaTags = attributes?.metaTags;
  const trefwoorden = metaTags?.keymatch?.split(', ').map((trefwoord: string) => ({ trefwoord })) || [];
  const productMetadata = attributes.pdc_metadata;

  const data: components['schemas']['Kennisartikel'] = {
    url: upnUri.href,
    uuid: attributes.uuid,
    upnUri: productMetadata?.uplProductNaam,
    publicatieDatum: new Date(attributes.createdAt) as any,
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
        bewijs: contentBlock?.kennisartikelCategorie === 'bewijs' ? contentBlock.content : undefined,
        bezwaarEnBeroep: contentBlock?.kennisartikelCategorie === 'bezwaar' ? contentBlock.content : undefined,
        contact: contentBlock?.kennisartikelCategorie === 'contact' ? contentBlock.content : undefined,
        datumWijziging: attributes.updatedAt,
        deskMemo: contentBlock?.kennisartikelCategorie === 'deskMemo' ? contentBlock.content : undefined,
        kostenEnBetaalmethoden: contentBlock?.kennisartikelCategorie === 'kosten' ? contentBlock.content : undefined,
        notice: contentBlock?.kennisartikelCategorie === 'bijzonderheden' ? contentBlock.content : undefined,
        procedureBeschrijving: contentBlock?.kennisartikelCategorie === 'aanvraag' ? contentBlock.content : undefined,
        taal: attributes?.locale,
        tekst: contentBlock?.kennisartikelCategorie === 'inleiding' ? contentBlock.content : undefined,
        titel: attributes?.title,
        trefwoorden,
        uitersteTermijn: contentBlock?.kennisartikelCategorie === 'termijn' ? contentBlock.content : undefined,
        vereisten: contentBlock?.kennisartikelCategorie === 'voorwaarden' ? contentBlock.content : undefined,
        wtdBijGeenReactie:
          contentBlock?.kennisartikelCategorie === 'wat_te_doen_bij_geen_reactie' ? contentBlock.content : undefined,
      },
    ],
  };
  return data;
};

export const getAllObjectsController: RequestHandler = async (req, res, next) => {
  const locale = (req.query?.locale as string) || 'nl';
  const type = (req.query?.type as string) || '';

  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);
  try {
    const { data } = await fetchData<any>({
      url: graphqlURL.href,
      query: GET_ALL_PRODUCTS,
      variables: { locale },
      headers: {
        Authorization: `Bearer ${process.env.PDC_STRAPI_API_TOKEN}`,
      },
    });

    if (data && data.products && data.products?.data.length > 0) {
      const kannisartikel = data.products.data.map(({ attributes }) => generateKennisartikelObject({ attributes }));

      res.set('Content-Type', 'application/json');
      res.set('Cache-control', 'public, s-maxage=86400, stale-while-revalidate');
      res.status(200);
      if (type.endsWith('kennisartikel')) {
        return res.send(kannisartikel);
      } else if (type.endsWith('vac')) {
        return res.send({ vac: vacData });
      } else {
        return res.send({
          kannisartikel,
          vac: vacData,
        });
      }
    }
    return res.send([]);
  } catch (error) {
    next(error);
    return null;
  }
};

export const getObjectByUUIDController: RequestHandler = async (req, res, next) => {
  const locale = (req.query?.locale as string) || 'nl';
  const uuid = (req.params?.uuid as string) || '';
  const graphqlURL = new URL('/graphql', process.env.STRAPI_PRIVATE_URL);

  try {
    const vac = vacData.find((item) => item.uuid === uuid);
    const { data } = await fetchData<any>({
      url: graphqlURL.href,
      query: GET_PRODUCT_BY_UUID,
      variables: { locale, uuid },
      headers: {
        Authorization: `Bearer ${process.env.PDC_STRAPI_API_TOKEN}`,
      },
    });

    res.set('Content-Type', 'application/json');
    res.set('Cache-control', 'public, s-maxage=86400, stale-while-revalidate');
    res.status(200);
    if (data && data.products && data.products?.data.length > 0) {
      const kannisartikel = data.products.data.map(({ attributes }) => generateKennisartikelObject({ attributes }))[0];
      return res.send(kannisartikel);
    } else if (vac) {
      return res.send(vac);
    } else {
      res.status(404);
      return res.send({ message: 'not found' });
    }
  } catch (error) {
    next(error);
    return null;
  }
};
