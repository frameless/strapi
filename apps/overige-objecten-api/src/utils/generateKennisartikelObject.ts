import { combineSimilarCategories } from './combineSimilarCategories';
import { mapContentByCategory } from './mapContentByCategory';
import { processToDeskMemo } from './processToDeskMemo';
import { Attributes } from '../strapi-product-type';
import { components } from '../types/openapi';

interface GenerateKennisartikelObjectTypes {
  attributes: Attributes;
  url: string;
  id: string;
}

export const generateKennisartikelObject = ({ attributes, url, id }: GenerateKennisartikelObjectTypes) => {
  const metaTags = attributes?.metaTags;
  const trefwoorden = metaTags?.keymatch?.split(', ').map((trefwoord: string) => ({ trefwoord })) || [];
  const kennisartikelMetadata = attributes.kennisartikelMetadata;
  const publicatieDatum = new Date(attributes.createdAt).toISOString().split('T')[0];
  const contentBlock = attributes?.sections
    .filter(({ component }) => component === 'ComponentComponentsUtrechtRichText')
    .map(({ kennisartikelCategorie, content }) => mapContentByCategory(kennisartikelCategorie, content));

  const { deskMemo } = attributes?.internalContentBlock
    ? processToDeskMemo(attributes.internalContentBlock)
    : { deskMemo: '' };

  // combine similar categories
  const reducedContentBlock = combineSimilarCategories(contentBlock);
  const bothContentBlock = { ...reducedContentBlock, deskMemo };
  const vertalingen = [
    {
      ...bothContentBlock,
      deskMemo,
      trefwoorden,
      taal: attributes?.locale,
      titel: attributes?.title,
      datumWijziging: attributes.updatedAt,
    },
  ];

  const data: components['schemas']['ObjectData'] = {
    url: `${url}/api/v2/objects/${attributes.uuid}`,
    uuid: attributes.uuid,
    type: new URL('api/v2/objecttypes/kennisartikel', url).href,
    record: {
      index: parseInt(id, 10),
      startAt: attributes.createdAt,
      typeVersion: 3,
      data: {
        url: `${url}/api/v2/objects/${attributes.uuid}`,
        uuid: attributes.uuid,
        upnUri: kennisartikelMetadata?.upnUri,
        publicatieDatum,
        productAanwezig: kennisartikelMetadata?.productAanwezig,
        productValtOnder: kennisartikelMetadata?.productValtOnder, // we need an extra field for this
        verantwoordelijkeOrganisatie: {
          url: `${new URL('api/v2/objecttypes/kennisartikel', url).href}#verantwoordelijkeOrganisatie`,
          owmsIdentifier: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsIdentifier,
          owmsPrefLabel: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsPrefLabel,
          owmsEndDate: kennisartikelMetadata?.verantwoordelijkeOrganisatie?.owmsEndDate,
        },
        locaties: null, //Een lijst met locaties waarop dit product beschikbaar is. Deze is nog niet nodig voor KISS en mag null zijn. Dit obecjt is dus nog niet opgenomen in dit schema
        doelgroep: kennisartikelMetadata?.doelgroep?.replace('_', '-') as 'eu-burger' | 'eu-bedrijf',
        afdelingen: kennisartikelMetadata?.afdelingen,
        beschikbareTalen: [attributes?.locale],
        vertalingen,
      },
      geometry: null,
      endAt: null,
      registrationAt: attributes.createdAt,
    },
  };

  return data;
};
