import type { PageSection } from '../shared-types';

/**
 * Creates a reusable type guard for a specific Strapi component.
 * This is the "Best Practice" for use in .filter() and .find()
 */
export const createComponentGuard = <K extends PageSection['component']>(componentName: K) => {
  return (section: PageSection): section is Extract<PageSection, { component: K }> => {
    return section.component === componentName;
  };
};
