/**
 * @typedef {Object} ContentData
 * @property {string} data - The content data.
 */

/**
 * Gets the current content based on the type.
 *
 * @param {Object} params - The parameters for getting the current content.
 * @param {string} params.type - The type of content.
 * @param {JSX} params.internalField - The internal content data.
 * @param {JSX} params.vac - The vac content data.
 * @param {JSX} params.additionalInformation - The additional information content data.
 * @returns {ContentData|null} The current content data or null.
 */

export const getContentByType = ({ vac, internalField, additionalInformation, type }) => {
  const dataMap = {
    vac,
    'internal-field': internalField,
    'additional-information': additionalInformation,
  };

  return dataMap[type] ? { data: dataMap[type] } : null;
};
