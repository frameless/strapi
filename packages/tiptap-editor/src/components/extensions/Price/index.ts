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
  name: 'priceWidget',
  group: 'inline',
  content: 'inline*',
  atom: true,
  inline: true,
  draggable: true,
  addAttributes() {
    return {
      'data-strapi-idref': {
        default: '',
      },
      'data-strapi-category': {
        default: 'price',
      },
    };
  },
  addCommands() {
    return {
      insertReactComponent:
        (price) =>
        ({ commands }) => {
          return commands.insertContent(`<span data-strapi-idref='${price.id}'></span>`);
        },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element) => {
          if ((element as any)?.hasAttribute('data-strapi-idref')) {
            return (element as any).getAttribute('data-strapi-idref');
          }

          return false;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-strapi-idref': HTMLAttributes['data-strapi-idref'],
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Widget);
  },
});
