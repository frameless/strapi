import { BLOB, CSPDirectives, DATA, EVAL, getCSP, INLINE, nonce, NONE, SELF, STRICT_DYNAMIC } from 'csp-header';
import mergeWith from 'lodash.mergewith';
// Using "//*" in JavaScript, especially with VSCode, can disrupt syntax highlighting and code analysis, causing confusion and hindering development.
export const subdomainWildcard = (url: string): string => {
  const parsed = new URL(url);
  return `${parsed.protocol}//*.${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}`;
};

type Object = Record<string, any>;

type MergeCustomizer = (objValue: Object, srcValue: Object) => any;

export const mergeCustomizer: MergeCustomizer = (objValue, srcValue) =>
  Array.isArray(objValue) && Array.isArray(srcValue) ? objValue.concat(srcValue) : undefined;

export const mergeCSPDirectives = (...directives: (Partial<CSPDirectives> | undefined)[]) =>
  mergeWith({}, ...directives.filter(Boolean), mergeCustomizer);

/**
 * Check if the parameter is an actual URL. Then return the normalized URL.
 * Otherwise return `null`.
 */
export const normalizeURL = (urlSetting: string | undefined): string | null => {
  try {
    return new URL(urlSetting || '').toString();
  } catch (e) {
    return null;
  }
};

export const stringSort = (a: string, b: string) => (a === b ? 0 : a > b ? 1 : -1);

export const normalizeCSPDirectives = (directives: Partial<CSPDirectives>) => {
  return Object.entries(directives)
    .sort(([keyA], [keyB]) => stringSort(keyA, keyB))
    .reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: Array.isArray(value) ? value.sort(stringSort) : value,
      }),
      {},
    );
};

export const cspBase = {
  'default-src': [SELF],
  'object-src': [NONE],
  'base-uri': [SELF],
  'form-action': [SELF],
  'frame-ancestors': [NONE],
  'worker-src': [BLOB],
  'connect-src': [SELF, DATA, BLOB],
  'img-src': [SELF, BLOB, DATA],
  'font-src': [SELF],
  'block-all-mixed-content': true,
  'script-src': [SELF],
  'style-src': [SELF],
};

const ogoneURL = normalizeURL(process.env.OGONE_PAYMENT_SERVICE_URL);
export const ogonePaymentServices = ogoneURL
  ? {
      'form-action': [ogoneURL],
    }
  : {};

const isString = (arg: any): arg is string => typeof arg === 'string';

export const environmentVariableCsp = {
  'connect-src':
    typeof process.env.CSP_CONNECT_SRC_URLS === 'string'
      ? process.env.CSP_CONNECT_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'font-src':
    typeof process.env.CSP_FONT_SRC_URLS === 'string'
      ? process.env.CSP_FONT_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'form-action':
    typeof process.env.CSP_FORM_ACTION_URLS === 'string'
      ? process.env.CSP_FORM_ACTION_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'frame-src':
    typeof process.env.CSP_FRAME_SRC_URLS === 'string'
      ? process.env.CSP_FRAME_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'img-src':
    typeof process.env.CSP_IMG_SRC_URLS === 'string'
      ? process.env.CSP_IMG_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'script-src':
    typeof process.env.CSP_SCRIPT_SRC_URLS === 'string'
      ? process.env.CSP_SCRIPT_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'style-src':
    typeof process.env.CSP_STYLE_SRC_URLS === 'string'
      ? process.env.CSP_STYLE_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
  'worker-src':
    typeof process.env.CSP_WORKER_SRC_URLS === 'string'
      ? process.env.CSP_WORKER_SRC_URLS.split(/\s+/g)
          .map((str) => normalizeURL(str))
          .filter(isString)
      : [],
};

export const chatWidget = {
  'connect-src': ['wss://virtuele-gemeente-assistent.nl', 'https://virtuele-gemeente-assistent.nl'],
  'img-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
  'style-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
};

export const chatWidgetDev = {
  // Development only. We will use `nonce` instead of `script-src` for production.
  'script-src': ['https://virtuele-gemeente-assistent.nl'],
};

export const map = {
  'img-src': ['https://service.pdok.nl'],
};

export const matomo = {
  'connect-src': ['https://stats.utrecht.nl'],
};

export const matomoDev = {
  'script-src': ['https://stats.utrecht.nl'],
};

export const youtube = {
  'frame-src': ['https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/'],
};

const kcmSurveyStylesheetURL = normalizeURL(process.env.KCM_SURVEY_STYLESHEETS_LINK);

/**
 * KCM Survey widget CSP configuration
 * Allows the KCM survey widget to load and function properly
 *
 * Resources:
 * - *.kcmg.nl: All KCM subdomains (viewer, v, etc.)
 * - v.kcmg.nl: Icons, styles, and fonts
 * - KCM_SURVEY_STYLESHEETS_LINK: Custom stylesheet (e.g., https://www.utrecht.nl/fileadmin/kcm-radio.css)
 */
export const kcmSurvey = {
  'connect-src': [subdomainWildcard('https://kcmg.nl')],
  'script-src': [subdomainWildcard('https://kcmg.nl')],
  'style-src': [kcmSurveyStylesheetURL, subdomainWildcard('https://kcmg.nl'), INLINE].filter(isString),
  'font-src': [subdomainWildcard('https://kcmg.nl')],
  'frame-src': [subdomainWildcard('https://kcmg.nl')],
  'img-src': [subdomainWildcard('https://kcmg.nl')],
};

export const siteimproveanalytics = {
  'img-src': [subdomainWildcard('https://siteimproveanalytics.io')],
};

export const siteimproveanalyticsDev = {
  'script-src': ['https://siteimproveanalytics.com'],
};

export const devCsp = {
  'script-src': [STRICT_DYNAMIC, BLOB],
};

// The following settings are unsafe.
// Only use these in development!
export const unsafeNextJs = {
  'script-src': [INLINE, EVAL],
  'style-src': [INLINE],
};

const openFormsURL = normalizeURL(process.env.OPEN_FORMS_API_URL && new URL(process.env.OPEN_FORMS_API_URL).origin);

export const openForms = openFormsURL
  ? {
      'connect-src': [openFormsURL],
      'img-src': [openFormsURL],
      'font-src': [openFormsURL],
    }
  : {};

export const openFormsDev = openFormsURL
  ? {
      'script-src': [openFormsURL],
      'style-src': [openFormsURL],
      'frame-src': [openFormsURL],
    }
  : {};

// The following configuration is used currently, but we're not sure what would break when removed.
const legacyProdCsp = {
  'script-src': [
    // 'strict-dynamic' was introduced here:
    // https://github.com/frameless/strapi/commit/67555a0387f4e55ad8c2973b0ec44488b116434d
    STRICT_DYNAMIC,
    // blob: was introduced here:
    // https://github.com/frameless/strapi/commit/b54edeef9bdfd66c28c216dcd8bbb28c8097a188
    BLOB,
  ],
};

type NODE_ENV = 'development' | 'production' | 'test';

export const getContentSecurityPolicy = ({ nonce: nonceValue, node_env }: { nonce?: string; node_env?: NODE_ENV }) =>
  getCSP({
    directives: normalizeCSPDirectives(
      mergeCSPDirectives(
        cspBase,
        chatWidget,
        kcmSurvey,
        map,
        matomo,
        ogonePaymentServices,
        openForms,
        siteimproveanalytics,
        youtube,
        environmentVariableCsp,
        node_env !== 'development' ? legacyProdCsp : undefined,
        nonceValue
          ? {
              'script-src': [nonce(nonceValue)],
              'style-src': [nonce(nonceValue)],
            }
          : undefined,
        node_env === 'development' ? devCsp : undefined,
        node_env === 'development' ? unsafeNextJs : undefined,
        node_env === 'development' ? siteimproveanalyticsDev : undefined,
        node_env === 'development' ? openFormsDev : undefined,
        node_env === 'development' ? matomoDev : undefined,
        node_env === 'development' ? chatWidgetDev : undefined,
      ),
    ),
  });
