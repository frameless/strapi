import BlockquoteExtension from '@tiptap/extension-blockquote';
import BoldExtension from '@tiptap/extension-bold';
import BulletListExtension from '@tiptap/extension-bullet-list';
import CharacterCountExtension from '@tiptap/extension-character-count';
import CodeExtension from '@tiptap/extension-code';
import CodeBlockExtension from '@tiptap/extension-code-block';
import DocumentExtension from '@tiptap/extension-document';
import GapcursorExtension from '@tiptap/extension-gapcursor';
import HardBreakExtension from '@tiptap/extension-hard-break';
import HeadingExtension from '@tiptap/extension-heading';
import HighlightExtension from '@tiptap/extension-highlight';
import HorizontalRuleExtension from '@tiptap/extension-horizontal-rule';
import ImageExtension from '@tiptap/extension-image';
import ItalicExtension from '@tiptap/extension-italic';
import LinkExtension from '@tiptap/extension-link';
import ListItemExtension from '@tiptap/extension-list-item';
import OrderedListExtension from '@tiptap/extension-ordered-list';
import ParagraphExtension from '@tiptap/extension-paragraph';
import StrikeExtension from '@tiptap/extension-strike';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';
import TableRowExtension from '@tiptap/extension-table-row';
import TextExtension from '@tiptap/extension-text';
import TextAlignExtension from '@tiptap/extension-text-align';
import TextStyleExtension from '@tiptap/extension-text-style';
import UnderlineExtension from '@tiptap/extension-underline';
import YouTubeExtension from '@tiptap/extension-youtube';
import { Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CustomTable from '../../extensions/CustomTable';
import { Figcaption } from '../../extensions/Figcaption';
import { Figure } from '../../extensions/Figure';
import { Language } from '../../extensions/Language';
import { LeadParagraph } from '../../extensions/LeadParagraph';
import { Price } from '../../extensions/Price';

const CustomOrderedList = OrderedListExtension.extend({
  addInputRules() {
    return [];
  },
});

export const extensions = ({ settings }: { settings: any }): Extensions => [
  StarterKit,
  // Text
  DocumentExtension,
  // TableWidget,
  ParagraphExtension,
  TextExtension,
  BoldExtension,
  StrikeExtension,
  ItalicExtension,
  GapcursorExtension,
  ListItemExtension,
  BulletListExtension,
  HeadingExtension.extend({
    addGlobalAttributes() {
      return [
        {
          types: ['heading'],
          attributes: {
            id: {
              default: null,
            },
          },
        },
      ];
    },
  }),
  LeadParagraph,
  settings.other.language ? Language : null,
  settings.price ? Price : null,
  Figcaption,
  settings.table
    ? Figure.extend({
        name: 'capturedTable',
        content: 'figcaption table',
      })
    : null,
  settings.disableOrderedListShorthand ? CustomOrderedList : OrderedListExtension,
  settings.table ? CustomTable.configure({ allowTableNodeSelection: true }) : (null as any),
  settings.table ? TableRowExtension : null,
  settings.table ? TableCellExtension : null,
  settings.table ? TableHeaderExtension : null,
  UnderlineExtension,
  TextAlignExtension.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyleExtension,
  settings.code ? CodeBlockExtension : null,
  settings.code ? CodeExtension : null,
  settings.blockquote ? BlockquoteExtension : null,
  settings.horizontal ? HorizontalRuleExtension : null,
  settings.hardbreak ? HardBreakExtension : null,
  settings.highlight ? HighlightExtension.configure({ multicolor: true }) : null,
  settings.links.enabled
    ? LinkExtension.configure({
        autolink: settings.links.autolink,
        openOnClick: settings.links.openOnClick,
        linkOnPaste: settings.links.linkOnPaste,
        HTMLAttributes: {
          rel: settings.links.HTMLAttributes.rel,
        },
      })
    : null,
  settings.image.enabled
    ? ImageExtension.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: { default: null },
            height: { default: null },
            loading: { default: null },
            'data-figcaption': { default: null },
            renderHTML: (attributes: any) => {
              return {
                width: attributes.width,
                height: attributes.height,
                'data-figcaption': attributes?.caption,
                loading: attributes.loading,
              };
            },
          };
        },
      }).configure({
        inline: settings.image.inline,
        allowBase64: settings.image.allowBase64,
      })
    : null,
  settings.other && settings.other.wordcount ? CharacterCountExtension.configure() : null,
  settings.youtube.enabled
    ? YouTubeExtension.configure({
        inline: false,
      })
    : null,
];
