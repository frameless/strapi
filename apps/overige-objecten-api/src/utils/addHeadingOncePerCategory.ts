import { AdditionalInformationFieldAttributesContentContentBlock } from '../strapi-product-type';
export type ContentBlock = AdditionalInformationFieldAttributesContentContentBlock[];
interface AddHeadingOncePerCategoryProps {
  contentBlocks: ContentBlock;
  title: string;
}
export const addHeadingOncePerCategory = ({ contentBlocks, title }: AddHeadingOncePerCategoryProps): ContentBlock => {
  const additionalInformation: ContentBlock = [];
  const renderedCategories = new Set(); // Track which categories have received an <h2>

  contentBlocks.forEach((item) => {
    const category = item.categorie10;
    // If this category hasn't been rendered yet, add the <h2> and mark it as rendered
    const shouldRenderHeading = !renderedCategories.has(category);
    if (shouldRenderHeading) {
      renderedCategories.add(category);
    }

    additionalInformation.push({
      ...item,
      content: `${shouldRenderHeading ? `<h2>${title}</h2>` : ''}${item?.content}`,
    });
  });

  return additionalInformation;
};
