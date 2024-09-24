export type Attributes = {
  slug: string;
  oldSlugs?: string[];
};

export type GetRedirectURLData = {
  attributes?: Attributes | null;
};

interface GetRedirectURL {
  data?: GetRedirectURLData[];
  url: URL;
  currentPathname: string;
}
/**
 * @description This function is used to get the redirect URL from the data array based on the current pathname.
 * @param {GetRedirectURL} param
 * @returns {URL | null}
 * @example
 * const redirectUrl = getRedirectURL({ data, url, currentPathname });
 */
export const getRedirectURL = ({ data, url, currentPathname }: GetRedirectURL): URL | null => {
  if (!Array.isArray(data)) return null;
  for (const { attributes } of data) {
    if (
      Array.isArray(attributes?.oldSlugs) &&
      attributes?.oldSlugs?.includes(currentPathname.split('/').pop() as string)
    ) {
      const redirectUrl = url;
      redirectUrl.pathname = new URL(attributes.slug, redirectUrl).pathname;
      return redirectUrl;
    }
  }
  return null;
};
