import { buildURL } from './buildURL';

export const getImageBaseUrl = (segment?: string): string => {
  const url = buildURL({
    env: process.env,
    key: 'STRAPI_PUBLIC_URL',
    segments: segment ? [segment] : [],
  });
  if (!url) throw new Error('getImageBaseUrl: Failed to build image URL');
  return url.href;
};
