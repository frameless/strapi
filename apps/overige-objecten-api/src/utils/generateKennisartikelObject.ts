import { addHeadingOncePerCategory } from '@frameless/utils';

import type { components } from '../types/openapi';
import { ContentBlock, Kennisartikel, PageData } from '../shared-types';

import {
  combineSimilarCategories,
  createHTMLFiles,
  generateKeywords,
  getDeskMemo,
  getVerantwoordelijkeOrganisatie,
  getVertalingen,
  createComponentGuard,
  normalizeCategories,
  processData,
  uuidToIndex,
} from './index';

export const generateKennisartikelObject = ({
  title,
  uuid,
  locale,
  updatedAt,
  createdAt,
  metaTags,
  kennisartikelMetadata,
  sections,
  price,
  additional_information,
  url,
  id,
  publicationState,
}: Kennisartikel) => {
  const trefwoorden = generateKeywords(metaTags?.keymatch);
  const isInternalBlock = createComponentGuard('ComponentComponentsInternalBlockContent');
  const internalBlock = sections?.find(isInternalBlock);
  const getInternalField = internalBlock?.internal_field;
  const internalTrefwoorden = generateKeywords(getInternalField?.content?.keywords ?? '');
  const publicatieDatum = new Date(createdAt ?? Date.now()).toISOString().split('T')[0];
  const hasContent = (item: ContentBlock): item is ContentBlock & { content: string; id: string } =>
    item.content !== null;
  const additionalInformation = addHeadingOncePerCategory({
    contentBlocks: additional_information?.content?.contentBlock?.filter(hasContent) ?? [],
    title: 'Aanvullende informatie',
    categoryKey: 'categorie10',
  });
  const mergedContactInformationInternal = getInternalField?.contact_information_internal?.flatMap(
    (item) => item.contentBlock,
  );
  const contactInformationInternal = mergedContactInformationInternal;
  const contactInformationPublic = getInternalField?.contact_information_public?.contentBlock;
  // merge contactInformationInternal and contactInformationPublic
  const contactInformation = [...(contactInformationPublic ?? []), ...(contactInformationInternal ?? [])];
  const priceData = price?.price;
  const deskMemo = getDeskMemo(sections ?? [], contactInformation);
  const isContactInfoPublic = createComponentGuard('ComponentComponentsContactInformationPublic');

  const contactInformationPublicBlocks = (sections ?? [])
    .flatMap((block) => {
      // Scenario A: It's the new standalone component
      if (isContactInfoPublic(block)) {
        return block.contact_information_public?.contentBlock;
      }

      // Scenario B: It's nested inside the internal block
      if (isInternalBlock(block)) {
        return block.internal_field.contact_information_public?.contentBlock ?? [];
      }

      return [];
    })
    .map((inner) => ({
      component: 'ComponentComponentsUtrechtRichText' as const,
      kennisartikelCategorie: 'contact',
      id: inner?.id,
      content: inner?.content,
      categorie11: 'contact',
    }));

  const regularSections = (sections ?? []).filter((block) => !isContactInfoPublic(block));

  const combineSections = combineSimilarCategories(
    processData({
      data: normalizeCategories([
        ...(regularSections ?? []),
        ...(contactInformationPublicBlocks ?? []),
        ...(additionalInformation ?? []),
      ] as PageData),
      priceData,
    }),
  );

  const bothContentBlock = { ...combineSections, deskMemo };
  createHTMLFiles(bothContentBlock, priceData);
  const vertalingen = getVertalingen({
    bothContentBlock,
    deskMemo,
    priceData,
    locale: locale ?? 'nl',
    updatedAt: updatedAt!,
    title: title!,
    trefwoorden: [...trefwoorden, ...(internalTrefwoorden ?? [])],
  });
  const data: components['schemas']['ObjectData'] & { publicationState?: 'DRAFT' | 'PUBLISHED' } = {
    url: `${url}/api/v2/objects/${uuid}`,
    uuid: uuid ?? id,
    publicationState,
    type: new URL('api/v2/objecttypes/kennisartikel', url).href,
    record: {
      index: uuidToIndex(id ?? uuid),
      startAt: createdAt!,
      typeVersion: 3,
      data: {
        url: `${url}/api/v2/objects/${uuid}`,
        uuid: uuid!,
        upnUri: kennisartikelMetadata?.upnUri ?? '',
        publicatieDatum,
        productAanwezig: kennisartikelMetadata?.productAanwezig ?? false,
        productValtOnder: kennisartikelMetadata?.productValtOnder ?? null, // we need an extra field for this
        verantwoordelijkeOrganisatie: getVerantwoordelijkeOrganisatie({
          metadata: kennisartikelMetadata?.verantwoordelijkeOrganisatie ?? {
            owmsEndDate: '',
            owmsIdentifier: '',
          },
          url,
        }),
        locaties: null, //Een lijst met locaties waarop dit product beschikbaar is. Deze is nog niet nodig voor KISS en mag null zijn. Dit obecjt is dus nog niet opgenomen in dit schema
        doelgroep: kennisartikelMetadata?.doelgroep?.replace('_', '-') as 'eu-burger' | 'eu-bedrijf',
        afdelingen: kennisartikelMetadata?.afdelingen,
        beschikbareTalen: [locale ?? 'nl'],
        vertalingen,
      },
      geometry: null,
      endAt: null,
      registrationAt: createdAt!,
    },
  };

  return data;
};
