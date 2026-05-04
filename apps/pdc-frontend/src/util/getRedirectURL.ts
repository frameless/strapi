export type ProductRedirect = {
  slug: string;
  oldSlugs?: string[];
};

interface GetRedirectURL {
  data?: ProductRedirect[];
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
  const pathSegments = currentPathname.split('/');
  const currentSlug = pathSegments.pop() || '';
  const pathPrefix = pathSegments.join('/');
  for (const item of data) {
    if (Array.isArray(item.oldSlugs) && item.oldSlugs.includes(currentSlug)) {
      const redirectUrl = new URL(url.toString());
      redirectUrl.pathname = `${pathPrefix}/${item.slug}`;
      return redirectUrl;
    }
  }
  return null;
};
