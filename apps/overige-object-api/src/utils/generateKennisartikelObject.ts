import { Attributes } from '../strapi-product-type';
import { components } from '../types/openapi';
interface GenerateKennisartikelObjectTypes {
  attributes: Attributes;
  url: string;
}
export const generateKennisartikelObject = ({ attributes, url }: GenerateKennisartikelObjectTypes) => {
  const contentBlock = attributes?.sections.find(({ component }) => component === 'ComponentComponentsUtrechtRichText');
  const metaTags = attributes?.metaTags;
  const trefwoorden = metaTags?.keymatch?.split(', ').map((trefwoord: string) => ({ trefwoord })) || [];
  const kennisartikelMetadata = attributes.kennisartikelMetadata;
  const publicatieDatum = new Date(attributes.createdAt).toISOString().split('T')[0];
  const data: components['schemas']['kennisartikel'] = {
    url,
    uuid: attributes.uuid,
    upnUri: kennisartikelMetadata?.upnUri,
    publicatieDatum,
    productAanwezig: kennisartikelMetadata?.productAanwezig,
    productValtOnder: kennisartikelMetadata?.productValtOnder, // we need an extra field for this
    verantwoordelijkeOrganisatie: {
      url: `${url}#verantwoordelijkeOrganisatie`,
      owmsIdentifier: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsIdentifier,
      owmsPrefLabel: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsPrefLabel,
      owmsEndDate: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsEndDate,
    },
    locaties: null, //Een lijst met locaties waarop dit product beschikbaar is. Deze is nog niet nodig voor KISS en mag null zijn. Dit obecjt is dus nog niet opgenomen in dit schema
    doelgroep: kennisartikelMetadata?.doelgroep?.replace('_', '-') as 'eu-burger' | 'eu-bedrijf',
    afdelingen: kennisartikelMetadata?.afdelingen,
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
