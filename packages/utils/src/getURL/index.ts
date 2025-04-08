import { showErrorBasedOnENV } from '../showErrorBasedOnENV';

export interface GetURL {
  env: any;
  key: string;
  isOrigin?: boolean;
}

export const getURL = ({ key, env, isOrigin }: GetURL) => {
  try {
    if (!env[key]) {
      showErrorBasedOnENV(`${key} is not defined`);
      return undefined;
    }
    const url = new URL(env[key]);
    return isOrigin ? url.origin : url;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`No valid URL found in the required environment variable ${key}`, error);
    return undefined;
  }
};
