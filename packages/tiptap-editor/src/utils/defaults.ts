import i18nLanguages from '@cospired/i18n-iso-languages';
import type { Price } from '../types';
// import { auth } from '@strapi/helper-plugin';
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'));
i18nLanguages.registerLocale(require('@cospired/i18n-iso-languages/langs/nl.json'));
// const user = auth.getUserInfo();

export default {
  headings: ['h1', 'h2', 'h3', 'h4', 'h4', 'h5', 'h6'],
  bold: true,
  italic: true,
  strikethrough: true,
  underline: true,
  code: false,
  blockquote: true,
  highlight: false,
  align: ['left', 'center', 'right'],
  lists: ['ol', 'ul'],
  disableOrderedListShorthand: false,
  table: true,
  horizontal: true,
  links: {
    enabled: true,
    autolink: false,
    openOnClick: false,
    linkOnPaste: true,
    relAttribute: false,
    HTMLAttributes: {
      rel: '',
    },
  },
  image: {
    enabled: true,
    inline: true,
    allowBase64: false,
  },
  other: {
    wordcount: false,
    language: {
      enabled: false,
      default: [
        {
          name: i18nLanguages.getName('NL', 'nl'),
          code: 'en',
        },
        {
          name: i18nLanguages.getName('EN', 'nl'),
          code: 'us',
        },
        {
          name: i18nLanguages.getName('AR', 'nl'),
          code: 'ar',
        },
        {
          name: i18nLanguages.getName('UK', 'nl'),
          code: 'uk',
        },
        {
          name: i18nLanguages.getName('TR', 'nl'),
          code: 'tr',
        },
      ],
    },
  },
  youtube: {
    enabled: true,
    height: 480,
    width: 640,
  },
  price: {
    enabled: false,
    data: {},
  } as {
    enabled: boolean;
    data: {
      title: string;
      price: Price[];
    };
  },
};
