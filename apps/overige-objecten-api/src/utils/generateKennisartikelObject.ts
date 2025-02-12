import {
  addHeadingOncePerCategory,
  combineSimilarCategories,
  createHTMLFiles,
  getDeskMemo,
  getVerantwoordelijkeOrganisatie,
  getVertalingen,
  normalizeCategories,
  processData,
} from './index';
import { Attributes } from '../strapi-product-type';
import { components } from '../types/openapi';
interface GenerateKennisartikelObjectTypes {
  attributes: Attributes;
  url: string;
  id: string;
}

export const generateKennisartikelObject = ({ attributes, url, id }: GenerateKennisartikelObjectTypes) => {
  const metaTags = attributes?.metaTags;
  const trefwoorden = metaTags?.keymatch
    ? metaTags.keymatch.split(', ').map((trefwoord: string) => ({ trefwoord }))
    : [];
  const kennisartikelMetadata = attributes.kennisartikelMetadata;
  const publicatieDatum = new Date(attributes.createdAt).toISOString().split('T')[0];
  const additionalInformation = addHeadingOncePerCategory({
    contentBlocks: attributes?.additional_information?.data?.attributes?.content?.contentBlock ?? [],
    title: 'Aanvullende informatie',
  });
  const priceData = attributes?.price?.data?.attributes?.price;
  const deskMemo = getDeskMemo(attributes?.sections);
  const sections = combineSimilarCategories(
    processData({ data: normalizeCategories([...attributes?.sections, ...additionalInformation]), priceData }),
  );

  const bothContentBlock = { ...sections, deskMemo };
  createHTMLFiles(bothContentBlock, priceData);
  const vertalingen = getVertalingen({ bothContentBlock, deskMemo, priceData, attributes, trefwoorden });
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
        verantwoordelijkeOrganisatie: getVerantwoordelijkeOrganisatie({
          metadata: kennisartikelMetadata?.verantwoordelijkeOrganisatie,
          url,
        }),
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
