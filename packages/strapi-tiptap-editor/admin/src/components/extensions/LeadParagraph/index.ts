import { Paragraph } from '@tiptap/extension-paragraph';

declare module '@tiptap/core' {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    leadParagraph: {
      setLeadParagraph: () => ReturnType;
    };
  }
}

export const LeadParagraph = Paragraph.extend({
  addAttributes() {
    return {
      'data-lead': {
        default: true,
        parseHTML: (element) => element.hasAttribute('data-lead'),
        renderHTML: (attributes) => {
          if (attributes['data-lead']) {
            return {
              'data-lead': attributes['data-lead'],
            };
          }
          return {};
        },
      },
    };
  },
  addCommands() {
    return {
      setLeadParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name, { 'data-lead': true });
        },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: (element) => (element as any).getAttribute('data-lead'),
      },
    ];
  },
});
