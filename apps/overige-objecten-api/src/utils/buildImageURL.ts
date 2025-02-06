export const buildImageURL = (url: string, src: string): string | undefined => {
  if (!src) return undefined;

  try {
    const imageSrc = new URL(src, url);
    return imageSrc.toString();
  } catch (error) {
    return undefined;
  }
};
