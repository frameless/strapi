/* eslint-disable no-unused-vars */
import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export interface LanguageOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    language: {
      /**
       * Set the language attribute
       */
      setLanguage: (attributes?: { lang: string }) => ReturnType;
      /**
       * Toggle the language attribute
       */
      toggleLanguage: (attributes?: { lang: string }) => ReturnType;
      /**
       * Unset the language attribute
       */
      unsetLanguage: () => ReturnType;
    };
  }
}

export const inputRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/;
export const pasteRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g;

export const Language = Mark.create<LanguageOptions>({
  name: 'language',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      lang: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute('lang') || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.lang) {
            return {};
          }
          return {
            lang: attributes.lang,
            dir: getDirectionFromLanguageCode(attributes.lang),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[lang][dir]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleLanguage:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetLanguage:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});

// TODO create utils package and move this logic there
function getDirectionFromLanguageCode(languageCode: string): 'ltr' | 'rtl' {
  // List of language codes that are written right-to-left
  const rtlLanguages = [
    'ar',
    'he',
    'fa',
    'ur',
    'yi',
    'dv',
    'ps',
    'ku',
    'ug',
    'arc',
    'azb',
    'mzn',
    'pnb',
    'sd',
    'ckb',
    'lrc',
    'glk',
    'nv',
    'prs',
    'tmr',
    'uga',
  ];
  // Check if the language code is in the list of RTL languages
  if (rtlLanguages.includes(languageCode.toLowerCase())) {
    return 'rtl';
  }

  // Default to left-to-right if not in the list of RTL languages
  return 'ltr';
}
