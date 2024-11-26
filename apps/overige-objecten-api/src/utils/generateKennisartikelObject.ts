import { combineSimilarCategories, createHTMLFiles, normalizeCategories, processData } from './index';
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
  const getInternalBlockComponent = attributes?.sections.find(
    ({ component }) => component === 'ComponentComponentsInternalBlockContent',
  );
  const priceData = attributes?.price?.data?.attributes?.price;
  const deskMemoInternalBlock = getInternalBlockComponent?.internal_field?.data?.attributes?.content?.contentBlock;
  const { deskMemo } = deskMemoInternalBlock ? processToDeskMemo(deskMemoInternalBlock) : { deskMemo: '' };
  const sections = combineSimilarCategories(
    processData({ data: normalizeCategories(attributes?.sections), priceData }),
  );

  const bothContentBlock = { ...sections, deskMemo };
  createHTMLFiles(bothContentBlock);
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
