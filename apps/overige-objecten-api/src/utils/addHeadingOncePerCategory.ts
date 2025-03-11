import { AdditionalInformationFieldAttributesContentContentBlock } from '../strapi-product-type';
export type ContentBlock = AdditionalInformationFieldAttributesContentContentBlock[];
interface AddHeadingOncePerCategoryProps {
  contentBlocks: ContentBlock;
  title: string;
}
export const addHeadingOncePerCategory = ({ contentBlocks, title }: AddHeadingOncePerCategoryProps): ContentBlock => {
  const renderedCategories = new Set(); // Track which categories have received an <h2>

  return contentBlocks.reduce((additionalInformation: ContentBlock, item) => {
    const category = item.categorie10;
    const shouldRenderHeading = !renderedCategories.has(category);
    if (shouldRenderHeading) {
      renderedCategories.add(category);
    }

    additionalInformation.push({
      ...item,
      content: `${shouldRenderHeading ? `<hr><h2>${title}</h2>` : ''}${item?.content}`,
    });

    return additionalInformation;
  }, []);
};
