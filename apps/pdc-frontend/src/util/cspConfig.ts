import { BLOB, DATA, EVAL, getCSP, INLINE, nonce, NONE, SELF, STRICT_DYNAMIC } from 'csp-header';
import mergeWith from 'lodash.mergewith';
import { createOpenFormsApiUrl } from '@/util/openFormsSettings';
// Using "//*" in JavaScript, especially with VSCode, can disrupt syntax highlighting and code analysis, causing confusion and hindering development.
export const formatURL = (url: string): string => `https://${url}`;
const getOpenFormsHost = () => {
  return createOpenFormsApiUrl()?.host || '';
};
type Object = Record<string, any>;

// eslint-disable-next-line no-unused-vars
type MergeCustomizer = (objValue: Object, srcValue: Object) => any;

export const mergeCustomizer: MergeCustomizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
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
};

export const ogonePaymentServices = {
  'form-action': process.env.OGONE_PAYMENT_SERVICE_URL ? [process.env.OGONE_PAYMENT_SERVICE_URL] : '',
};

export const chatWidgetDev = {
  'connect-src': ['wss://virtuele-gemeente-assistent.nl', 'https://virtuele-gemeente-assistent.nl'],
  'img-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
  'script-src': ['https://virtuele-gemeente-assistent.nl'],
  'style-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
};

export const chatWidgetProd = {
  'connect-src': ['wss://virtuele-gemeente-assistent.nl', 'https://virtuele-gemeente-assistent.nl'],
  'img-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
  'style-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
};

export const map = {
  'img-src': ['https://service.pdok.nl'],
};

export const matomoDev = {
  'connect-src': ['https://stats.utrecht.nl'],
  'script-src': ['https://stats.utrecht.nl'],
};

export const matomoProd = {
  'connect-src': ['https://stats.utrecht.nl'],
};

export const youtube = {
  'frame-src': ['https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/'],
};

export const siteimproveanalyticsDev = {
  'script-src': [formatURL('siteimproveanalytics.com')],
  'img-src': [formatURL('*.siteimproveanalytics.io')],
};
export const siteimproveanalyticsProd = {
  'img-src': [formatURL('*.siteimproveanalytics.io')],
};

export const openFormsDev = {
  'connect-src': [getOpenFormsHost()],
  'img-src': [getOpenFormsHost()],
  'script-src': [getOpenFormsHost()],
  'font-src': [getOpenFormsHost()],
  'style-src': [getOpenFormsHost()],
};

export const openFormsProd = {
  'connect-src': [getOpenFormsHost()],
  'img-src': [getOpenFormsHost()],
  'font-src': [getOpenFormsHost()],
};
type NODE_ENV = 'development' | 'production' | 'test';
export const handelCSPEnv = (nonceValue?: string, node_env?: NODE_ENV) => {
  if (node_env === 'development') {
    return mergeWith(
      { 'script-src': [SELF, INLINE, EVAL], 'style-src': [SELF, INLINE] },
      chatWidgetDev,
      cspBase,
      map,
      matomoDev,
      ogonePaymentServices,
      openFormsDev,
      siteimproveanalyticsDev,
      youtube,
      mergeCustomizer,
    );
  }
  return mergeWith(
    {
      'script-src': [SELF, nonceValue && nonce(nonceValue), STRICT_DYNAMIC, BLOB],
      'style-src': [SELF, nonceValue && nonce(nonceValue)],
    },
    chatWidgetProd,
    cspBase,
    map,
    matomoProd,
    ogonePaymentServices,
    openFormsProd,
    siteimproveanalyticsProd,
    youtube,
    mergeCustomizer,
  );
};

export const cspDevelopmentHeader = () => {
  return getCSP({
    directives: handelCSPEnv(undefined, process.env.NODE_ENV),
  });
};

export const cspProductionHeader = (nonceValue: string) => {
  return getCSP({
    directives: handelCSPEnv(nonceValue, process.env.NODE_ENV),
  });
};
