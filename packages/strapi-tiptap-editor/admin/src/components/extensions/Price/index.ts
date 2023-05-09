import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Widget from './widget';
import './price.css';

export type PriceTypes = {
  value: string;
  label: string;
  currency: string;
  id: string;
};
export type PriceListTypes = {
  title: string;
  price: PriceTypes[];
};

declare module '@tiptap/core' {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    reactComponent: {
      // eslint-disable-next-line no-unused-vars
      insertReactComponent: (price: PriceTypes) => ReturnType;
    };
  }
}

export const Price = Node.create({
  name: 'reactWidget',
  group: 'inline',
  content: 'inline*',
  inline: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      id: {
        default: '',
      },
    };
  },
  addCommands() {
    return {
      insertReactComponent:
        (price) =>
        ({ commands }) => {
          return commands.insertContent(`<react-widget id='${price.id}'></react-widget>`);
        },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'react-widget',
        getAttrs: (element) => {
          return (element as any).getAttribute('id');
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'react-widget',
      mergeAttributes(HTMLAttributes, {
        id: HTMLAttributes.id,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Widget, {
      as: 'span',
    });
  },
});
