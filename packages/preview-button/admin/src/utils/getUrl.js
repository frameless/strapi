export const getUrl = (url) => {
  try {
    return new URL(url);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Invalid URL provided for the domain:', url);
    return null;
  }
};
