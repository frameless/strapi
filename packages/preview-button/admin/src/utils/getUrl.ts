export const getUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (e) {
    // eslint-disable-next-line no-console
    return null;
  }
};
