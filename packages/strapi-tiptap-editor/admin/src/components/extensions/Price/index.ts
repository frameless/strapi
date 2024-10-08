import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Widget from './widget';
import './price.css';
import { PriceTypes } from '../../../types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    reactComponent: {
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
          return commands.insertContent(`<span data-strapi-idref='${price.uuid}'></span>`);
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
