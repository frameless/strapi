export const getImageBaseUrl = () => {
  if (!process.env.STRAPI_PUBLIC_URL) {
    throw new Error('`STRAPI_PUBLIC_URL` is required to construct the image URL in the Markdown component.');
  }
  const url = new URL(process.env.STRAPI_PUBLIC_URL);
  return url?.origin;
};
