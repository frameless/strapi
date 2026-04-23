import { getURL, GetURL } from '../getURL';

type TFunction<K extends string = string, T = any, TK extends string = string> = (_key: K | K[], _options?: T) => TK;

/**
 * Get the query parameters for a given set of parameters.
 * @param {Record<string, string>} queryParams - The query parameters to include in the URL.
 * @returns {string} The query parameters as a string.
 * @example
 * const queryParams = getQueryParams({ q: 'test' });
 */
export const getQueryParams = (queryParams?: Record<string, string>) => {
  // eslint-disable-next-line no-undef
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
interface BuildURLFn {
  (_props: BuildURLProps & { required?: true }): URL;
  (_props: BuildURLProps & { required: false }): URL | undefined;
}

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
 * @param {boolean} props.required - Whether the env variable is required. Defaults to true.
 *                                   If false, returns undefined when the env variable is missing.
 * @returns {URL | undefined} The built URL object, or undefined if the env variable is optional and not set.
 * @example
 * // Required URL — throws if NEXT_PUBLIC_PDC_URL is not set
 * const url = buildURL({
 *   key: 'NEXT_PUBLIC_PDC_URL',
 *   env: process.env,
 *   segments: ['search'],
 *   locale: 'en',
 *   translations: t,
 * });
 *
 * //Optional URL — returns undefined if NEXT_PUBLIC_OPTIONAL_URL is not set
 * const url = buildURL({
 *   key: 'NEXT_PUBLIC_OPTIONAL_URL',
 *   env: process.env,
 *   required: false,
 * });
 */
export const buildURL = (({
  queryParams,
  isOrigin = true,
  locale,
  segments,
  env,
  key,
  translations,
  required = true,
}: BuildURLProps): URL | undefined => {
  const { pathSegments, searchParams } = getPathAndSearchParams({
    queryParams,
    segments,
    locale,
    translations,
  });
  try {
    const url = required
      ? getURL({ env, key, isOrigin, required: true })
      : getURL({ env, key, isOrigin, required: false });

    if (!url) return undefined;

    const baseUrl = new URL(url);
    const cleanBasePath = baseUrl.pathname.replace(/\/+$/, '');
    const cleanPathSegments = pathSegments.replace(/^\/+/, '');
    baseUrl.pathname = `${cleanBasePath}/${cleanPathSegments}`;
    baseUrl.search = searchParams;

    return baseUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to build URL: ${message}`);
  }
}) as BuildURLFn;
