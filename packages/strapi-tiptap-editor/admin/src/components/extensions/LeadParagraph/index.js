import { mergeAttributes } from '@tiptap/core';
import Paragraph from '@tiptap/extension-paragraph';

export const LeadParagraph = Paragraph.extend({
  name: 'leadParagraph',
  addAttributes() {
    return {
      'data-lead': {
        default: true,
      },
    };
  },
  addCommands() {
    return {
      setLeadParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
