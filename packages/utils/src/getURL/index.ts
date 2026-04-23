export interface GetURL {
  env: any;
  key: string;
  isOrigin?: boolean;
  required?: boolean;
}

interface GetURLFn {
  (_props: GetURL & { required?: true }): string | URL;
  (_props: GetURL & { required: false }): string | URL | undefined;
}

export const getURL = (({ key, env, isOrigin, required = true }: GetURL): string | URL | undefined => {
  if (!env[key]) {
    if (required) {
      throw new Error(`Environment variable "${key}" is not defined`);
    }
    return undefined;
  }
  try {
    const url = new URL(env[key]);
    return isOrigin ? url.origin : url;
  } catch {
    throw new Error(`"${key}" contains an invalid URL: "${env[key]}"`);
  }
}) as GetURLFn;
