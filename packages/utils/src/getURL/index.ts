export interface GetURL {
  env: any;
  key: string;
  isOrigin?: boolean;
}

export const getURL = ({ key, env, isOrigin }: GetURL) => {
  if (!env[key]) {
    // Always throw for missing required env vars — don't silently return undefined
    throw new Error(`Environment variable "${key}" is not defined`);
  }
  try {
    const url = new URL(env[key]);
    return isOrigin ? url.origin : url;
  } catch (error) {
    throw new Error(`"${key}" contains an invalid URL: "${env[key]}"`);
  }
};
