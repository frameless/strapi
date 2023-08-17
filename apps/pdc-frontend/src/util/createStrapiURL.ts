import { URL } from 'url';
export const createStrapiURL = () => {
  if (!process.env.STRAPI_PRIVATE_URL) {
    throw new Error('STRAPI_PRIVATE_URL is not defined');
  }

  const { origin } = new URL(process.env.STRAPI_PRIVATE_URL);
  const strapiURL = `${origin}/graphql`;
  return strapiURL;
};
