import { Paragraph } from '@tiptap/extension-paragraph';

declare module '@tiptap/core' {
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
        default: false,
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
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name, { 'data-lead': false });
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
