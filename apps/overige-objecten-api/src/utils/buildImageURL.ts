export const buildImageURL = (url: string, src: string): string | null => {
  if (!src) return null;

  try {
    const imageSrc = new URL(src, url);
    return imageSrc.toString();
  } catch (error) {
    return null;
  }
};
