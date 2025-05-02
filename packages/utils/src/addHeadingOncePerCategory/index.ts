export type ContentBlock = {
  content: string;
  id: string;
  [key: string]: any;
};
export type ContentBlockArray = ContentBlock[];
interface AddHeadingOncePerCategoryProps {
  contentBlocks: ContentBlockArray;
  title: string;
  categoryKey: string;
  template?: string; // Optional template with placeholders like {title} and {content}
}
/**
 * Adds an HTML heading (<h2>) and horizontal rule (<hr>) before content blocks,
 * but only once per unique category.
 *
 * @param {Object} params - The parameters object
 * @param {ContentBlockArray} params.contentBlocks - Array of content block objects containing content and metadata
 * @param {string} params.title - The heading text to be added
 * @param {string} params.categoryKey - The key used to group content blocks into categories
 * @param {string} [params.template] - Optional HTML template with `{title}` and `{content}` placeholders
 * @returns {ContentBlockArray} New array of content blocks with headings added once per category
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
 *
 * // Template Usage example.
 * const result = addHeadingOncePerCategory({
 *   contentBlocks: blocks,
 *   title: "Section",
 *   categoryKey: "category",
 *   template: "<div class='section-header'><h2>{title}</h2><hr/></div><div>{content}</div>"
 * });
 *
 * // The first item in each category will have the heading template applied, with {title} and {content} replaced.
 */
export const addHeadingOncePerCategory = ({
  contentBlocks,
  title,
  categoryKey,
  template = `<hr><h2>{title}</h2>{content}`,
}: AddHeadingOncePerCategoryProps): ContentBlockArray => {
  const renderedCategories = new Set<string>(); // Track categories already processed
  return contentBlocks.reduce((additionalInformation: ContentBlockArray, item) => {
    const category = item[categoryKey]; // Dynamically get the category

    if (category === undefined) {
      // eslint-disable-next-line no-console
      console.warn(`Missing category for item with id "${item.id}"`);
    }

    const shouldRenderHeading = !renderedCategories.has(category);
    if (shouldRenderHeading) {
      renderedCategories.add(category);
    }

    const content = shouldRenderHeading
      ? template.replace('{title}', title).replace('{content}', item.content)
      : item.content;
    additionalInformation.push({
      ...item,
      content,
    });

    return additionalInformation;
  }, []);
};
