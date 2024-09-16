import { buildURL } from './buildURL';
export const getStrapiGraphqlURL = (): string => {
  const strapiURL = buildURL({
    env: { STRAPI_PRIVATE_URL: process.env.STRAPI_PRIVATE_URL },
    key: 'STRAPI_PRIVATE_URL',
    segments: ['graphql'],
  });
  if (!strapiURL) {
    throw new Error('getStrapiGraphqlURL: Failed to build Strapi GraphQL URL');
  }
  return strapiURL.href;
};
