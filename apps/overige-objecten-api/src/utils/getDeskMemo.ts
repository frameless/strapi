import { concatenateFieldValues } from './concatenateFieldValues';
import type { Section } from '../strapi-product-type';

export const getDeskMemo = (sections: Section[], contactInformation?: { id: string; content: string }[]) => {
  const internalBlock = sections.find(({ component }) => component === 'ComponentComponentsInternalBlockContent');
  const contentBlock = [
    ...(internalBlock?.internal_field?.data?.attributes?.content?.contentBlock ?? []),
    ...(contactInformation ?? []),
  ];

  return contentBlock ? concatenateFieldValues(contentBlock) : '';
};
