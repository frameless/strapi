export const buildImageURL = (url: string, src: string): string | undefined => {
  if (!src) return undefined;

  try {
    const imageSrc = new URL(src, url);
    return imageSrc.toString();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return undefined;
  }
};
