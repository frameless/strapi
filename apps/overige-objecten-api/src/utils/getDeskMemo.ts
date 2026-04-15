import { Sections, ContentBlockSimple } from '../shared-types';

import { concatenateFieldValues } from './concatenateFieldValues';
import { createComponentGuard } from './createComponentGuard';

export const getDeskMemo = (sections?: Sections | null, contactInformation?: ContentBlockSimple[]) => {
  const isInternalBlock = createComponentGuard('ComponentComponentsInternalBlockContent');
  const internalBlock = sections?.find(isInternalBlock);
  const contentBlock = [...(internalBlock?.internal_field?.content?.contentBlock ?? []), ...(contactInformation ?? [])];

  return contentBlock.length > 0 ? concatenateFieldValues(contentBlock) : '';
};
