export const getUrl = (url) => {
  try {
    return new URL(url);
  } catch (e) {
    // eslint-disable-next-line no-console
    return null;
  }
};
