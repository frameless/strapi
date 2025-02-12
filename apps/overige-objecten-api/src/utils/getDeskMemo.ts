import { concatenateFieldValues } from './concatenateFieldValues';
import type { Section } from '../strapi-product-type';

export const getDeskMemo = (sections: Section[]) => {
  const internalBlock = sections.find(({ component }) => component === 'ComponentComponentsInternalBlockContent');
  const contentBlock = internalBlock?.internal_field?.data?.attributes?.content?.contentBlock;

  return contentBlock ? concatenateFieldValues(contentBlock) : '';
};
