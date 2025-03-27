export type ContentBlock = {
  content: string;
  id: string;
  [key: string]: any;
}[];
interface AddHeadingOncePerCategoryProps {
  contentBlocks: ContentBlock;
  title: string;
  categoryKey: string;
}
/**
 * Adds an HTML heading (<h2>) and horizontal rule (<hr>) before content blocks,
 * but only once per unique category.
 *
 * @param {Object} params - The parameters object
 * @param {ContentBlock} params.contentBlocks - Array of content block objects containing content and metadata
 * @param {string} params.title - The heading text to be added
 * @param {string} params.categoryKey - The key used to group content blocks into categories
 * @returns {ContentBlock} New array of content blocks with headings added once per category
 *
 * @example
 * const blocks = [
 *   { content: "First item", category: "A", id: "1" },
 *   { content: "Second item", category: "A", id: "2" },
 *   { content: "Third item", category: "B", id: "3" }
 * ];
 *
 * const result = addHeadingOncePerCategory({
 *   contentBlocks: blocks,
 *   title: "Category Title",
 *   categoryKey: "category"
 * });
 */
export const addHeadingOncePerCategory = ({
  contentBlocks,
  title,
  categoryKey,
}: AddHeadingOncePerCategoryProps): ContentBlock => {
  const renderedCategories = new Set(); // Track which categories have received an <h2>

  return contentBlocks.reduce((additionalInformation: ContentBlock, item) => {
    const category = item[categoryKey]; // Dynamically get the category
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
