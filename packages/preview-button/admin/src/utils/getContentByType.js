/**
 * @typedef {Object} ContentData
 * @property {string} data - The content data.
 * @property {string} id - The content id.
 */

/**
 * Gets the current content based on the type.
 *
 * @param {Object} params - The parameters for getting the current content.
 * @param {string} params.type - The type of content.
 * @param {Object} params.internalField - The internal content data.
 * @param {JSX} params.internalField.content - The internal content data.
 * @param {string} params.internalField.id - The internal content id.
 * @param {Object} params.vac - The vac content data.
 * @param {JSX} params.vac.content - The vac content data.
 * @param {string} params.vac.id - The vac content id.
 * @param {Object} params.additionalInformation - The additional information content data.
 * @param {JSX} params.additionalInformation.content - The additional information content data.
 * @param {string} params.additionalInformation.id - The additional information content id.
 * @param {Object} params.products - The product content data.
 * @param {JSX} params.products.content - The product content data.
 * @param {string} params.products.id - The product content id.
 * @returns {ContentData|null} The current content data or null.
 */

export const getContentByType = ({ vac, internalField, additionalInformation, products, type }) => {
  const dataMap = {
    vac,
    'internal-field': internalField,
    'additional-information': additionalInformation,
    products,
  };

  const contentData = dataMap[type];
  return contentData ? { data: contentData.content, id: contentData.id } : null;
};
