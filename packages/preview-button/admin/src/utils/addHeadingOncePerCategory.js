export const addHeadingOncePerCategory = ({ contentBlocks, title }) => {
  const renderedCategories = new Set(); // Track which categories have received an <h2>

  return contentBlocks?.reduce((additionalInformation, item) => {
    const category = item?.kennisartikelCategorie;
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
