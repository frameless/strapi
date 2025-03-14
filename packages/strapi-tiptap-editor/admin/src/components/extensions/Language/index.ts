import { getDirectionFromLanguageCode } from '@frameless/utils';
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
