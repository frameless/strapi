import { buildURL } from './buildURL';
export const getStrapiGraphqlURL = () => {
  const strapiURL = buildURL({
    env: process.env,
    key: 'STRAPI_PRIVATE_URL',
    segments: ['graphql'],
  });
  return strapiURL?.href;
};
