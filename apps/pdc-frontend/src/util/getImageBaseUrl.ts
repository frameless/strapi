import { buildURL } from './buildURL';

export const getImageBaseUrl = (segment?: string) => {
  const url = buildURL({
    env: process.env,
    key: 'STRAPI_PUBLIC_URL',
    segments: segment ? [segment] : [],
  });
  return url?.href;
};
