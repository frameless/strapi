import { BLOB, DATA, EVAL, getCSP, INLINE, nonce, NONE, SELF, STRICT_DYNAMIC } from 'csp-header';
import { createOpenFormsApiUrl } from '@/util/openFormsSettings';
// Using "//*" in JavaScript, especially with VSCode, can disrupt syntax highlighting and code analysis, causing confusion and hindering development.
const formatURL = (url: string): string => `https://${url}`;
const getOpenFormsHost = () => {
  return createOpenFormsApiUrl()?.host || '';
};

const chatWidget = {
  'connect-src': ['wss://virtuele-gemeente-assistent.nl', 'https://virtuele-gemeente-assistent.nl'],
  'img-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
  'script-src': ['https://virtuele-gemeente-assistent.nl'],
  'style-src': ['https://virtuele-gemeente-assistent.nl', 'https://mijn.virtuele-gemeente-assistent.nl'],
};
const map = {
  'img-src': ['https://service.pdok.nl'],
};
const matomo = {
  'connect-src': ['https://stats.utrecht.nl'],
  'script-src': ['https://stats.utrecht.nl'],
};

const youtube = {
  'frame-src': ['https://www.youtube.com/embed/', 'https://www.youtube-nocookie.com/embed/'],
};

const siteimproveanalytics = {
  'script-src': [formatURL('siteimproveanalytics.com')],
  'img-src': [formatURL('*.siteimproveanalytics.io')],
};

const openForms = {
  'connect-src': [getOpenFormsHost()],
  'img-src': [getOpenFormsHost()],
  'script-src': [getOpenFormsHost()],
  'font-src': [getOpenFormsHost()],
  'style-src': [getOpenFormsHost()],
};

export const cspBase = {
  'default-src': [SELF],
  'object-src': [NONE],
  'base-uri': [SELF],
  'form-action': [SELF],
  'frame-ancestors': [NONE],
  'worker-src': [BLOB],
  'connect-src': [
    SELF,
    ...openForms['connect-src'],
    ...chatWidget['connect-src'],
    ...matomo['connect-src'],
    DATA,
    BLOB,
  ],
  'img-src': [
    SELF,
    ...openForms['img-src'],
    BLOB,
    DATA,
    ...map['img-src'],
    ...siteimproveanalytics['img-src'],
    ...chatWidget['img-src'],
  ],
  'font-src': [SELF, ...openForms['font-src']],
  'frame-src': [...youtube['frame-src']],
  'block-all-mixed-content': true,
};

export const cspDevelopmentHeader = () => {
  return getCSP({
    directives: {
      'script-src': [
        SELF,
        INLINE,
        EVAL,
        ...openForms['script-src'],
        ...siteimproveanalytics['script-src'],
        ...chatWidget['script-src'],
        ...matomo['script-src'],
      ],
      'style-src': [SELF, INLINE, ...openForms['style-src']],
      ...cspBase,
    },
  });
};

export const cspProductionHeader = (nonceValue: string) => {
  return getCSP({
    directives: {
      'script-src': [SELF, nonce(nonceValue), STRICT_DYNAMIC, BLOB],
      'style-src': [SELF, nonce(nonceValue), ...chatWidget['style-src']],
      ...cspBase,
    },
  });
};
