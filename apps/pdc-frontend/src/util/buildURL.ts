import type { TFunction } from 'i18next';
import { getURL, GetURL } from './getURL';

/**
 * Get the query parameters for a given set of parameters.
 * @param {Record<string, string>} queryParams - The query parameters to include in the URL.
 * @returns {string} The query parameters as a string.
 * @example
 * const queryParams = getQueryParams({ q: 'test' });
 */
export const getQueryParams = (queryParams?: Record<string, string>) => {
  const params = new URLSearchParams(queryParams).toString();
  if (!params) return '';
  return params.startsWith('?') ? params : `?${params}`;
};

interface GetPathAndSearchParams {
  queryParams?: Record<string, string>;
  segments?: string[];
  locale?: string;
  translations?: TFunction<string, any, string>;
}
/**
 * Get the path and search parameters for a given set of parameters.
 * @param {GetPathAndSearchParams} props - The properties for getting the path and search parameters.
 * @param {Record<string, string>} props.queryParams - The query parameters to include in the URL.
 * @param {string[]} props.segments - The segments of the URL path.
 * @param {string} props.locale - The locale to include in the URL path.
 * @param {TFunction} props.translations - The translation function to apply to the segments.
 * @returns {Object} An object containing the path segments, search parameters, and the full URL.
 * @example
 * const { t } = await useTranslation(locale, ['common']);
 * const { pathSegments, searchParams, fullURL } = getPathAndSearchParams({
 *   queryParams: { q: 'test' },
 *   segments: ['search'],
 *   locale: 'en',
 *   translations: t,
 * });
 */
export const getPathAndSearchParams = ({
  queryParams,
  segments,
  locale,
  translations,
}: GetPathAndSearchParams): { pathSegments: string; searchParams: string; fullURL: string } => {
  const uniqueSegments = [...new Set(segments)].map((segment) => {
    if (typeof translations !== 'undefined') {
      return translations(segment, {
        defaultValue: segment,
      });
    }
    return segment;
  });
  const pathSegments = [locale, ...uniqueSegments].filter(Boolean).join('/');
  const searchParams = getQueryParams(queryParams);
  const fullURL = `${pathSegments}${searchParams}`;
  return { pathSegments, searchParams, fullURL };
};

interface BuildURLProps extends GetPathAndSearchParams, GetURL {}
/**
 * Build a URL object from the given parameters.
 * @param {BuildURLProps} props - The properties for building the URL.
 * @param {Record<string, string>} props.queryParams - The query parameters to include in the URL.
 * @param {string[]} props.segments - The segments of the URL path.
 * @param {string} props.locale - The locale to include in the URL path.
 * @param {TFunction} props.translations - The translation function to apply to the segments.
 * @param {string} props.env - The environment variable to use for the base URL.
 * @param {string} props.key - The key to use for the base URL.
 * @param {boolean} props.isOrigin - Whether to return the origin or the full URL.
 * @returns {URL} The built URL object.
 * @example
 * const { t } = await useTranslation(locale, ['common']);
 * const url = buildURL({
 *   queryParams: { q: 'test' },
 *   segments: ['search'],
 *   locale: 'en',
 *   translations: t,
 *   env: process.env,
 *   key: 'NEXT_PUBLIC_PDC_URL',
 * });
 */
export const buildURL = ({
  queryParams,
  isOrigin = true,
  locale,
  segments,
  env,
  key,
  translations,
}: BuildURLProps): URL => {
  const { pathSegments, searchParams } = getPathAndSearchParams({
    queryParams,
    segments,
    locale,
    translations,
  });
  try {
    const url = getURL({
      env,
      key,
      isOrigin,
    });

    if (typeof url !== 'string' || !url.trim()) {
      throw new Error(
        `Invalid URL: getURL returned an empty or invalid value ('${url}'). Ensure the environment variable '${key}' is correctly set and valid.`,
      );
    }

    const baseUrl = new URL(url);

    // Ensure no double slashes between the base path and new segments
    const cleanBasePath = baseUrl.pathname.replace(/\/+$/, ''); // Remove trailing slashes from base URL path
    const cleanPathSegments = pathSegments.replace(/^\/+/, ''); // Remove leading slashes from path segments

    // Rebuild the pathname
    baseUrl.pathname = `${cleanBasePath}/${cleanPathSegments}`;
    baseUrl.search = searchParams;

    return baseUrl;
  } catch (error) {
    throw new Error('Failed to build URL: Invalid URL or configuration.');
  }
};
