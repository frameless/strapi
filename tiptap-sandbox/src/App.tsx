import './App.css';
import { Extensions, useEditor } from '@tiptap/react';
import { DesignSystemProvider, lightTheme } from '@strapi/design-system';
import StarterKit from '@tiptap/starter-kit';
import DocumentExtension from '@tiptap/extension-document';
import ParagraphExtension from '@tiptap/extension-paragraph';
import TextExtension from '@tiptap/extension-text';
import BoldExtension from '@tiptap/extension-bold';
import StrikeExtension from '@tiptap/extension-strike';
import ItalicExtension from '@tiptap/extension-italic';
import GapcursorExtension from '@tiptap/extension-gapcursor';
import ListItemExtension from '@tiptap/extension-list-item';
import BulletListExtension from '@tiptap/extension-bullet-list';
import HeadingExtension from '@tiptap/extension-heading';
import { LeadParagraph } from '@frameless/tiptap-editor/admin/src/components/extensions/LeadParagraph';
import { Price } from '@frameless/tiptap-editor/admin/src/components/extensions/Price';
import { Figcaption } from '@frameless/tiptap-editor/admin/src/components/extensions/Figcaption';
import { Figure } from '@frameless/tiptap-editor/admin/src/components/extensions/Figure';
import OrderedListExtension from '@tiptap/extension-ordered-list';
import TableExtension from '@tiptap/extension-table';
import TableRowExtension from '@tiptap/extension-table-row';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';
import UnderlineExtension from '@tiptap/extension-underline';
import TextAlignExtension from '@tiptap/extension-text-align';
import TextStyleExtension from '@tiptap/extension-text-style';
import CodeBlockExtension from '@tiptap/extension-code-block';
import CodeExtension from '@tiptap/extension-code';
import BlockquoteExtension from '@tiptap/extension-blockquote';
import HorizontalRuleExtension from '@tiptap/extension-horizontal-rule';
import HardBreakExtension from '@tiptap/extension-hard-break';
import HighlightExtension from '@tiptap/extension-highlight';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import CharacterCountExtension from '@tiptap/extension-character-count';
import YouTubeExtension from '@tiptap/extension-youtube';
import Editor from '@frameless/tiptap-editor/admin/src/components/Editor';
import { Language } from '@frameless/tiptap-editor/admin/src/components/extensions/Language';

function App() {
  const settings = {
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
    columns: ['two', 'three'],
    table: true,
    hardbreak: true,
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
            name: 'English',
            code: 'en',
          },
          {
            name: 'Nederlands',
            code: 'nl',
          },
        ],
      },
      saveJson: false,
    },
    youtube: {
      enabled: true,
      height: 480,
      width: 640,
    },
  };

  const CustomOrderedList = OrderedListExtension.extend({
    addInputRules() {
      return [];
    },
  });

  const extensions: Extensions = [
    StarterKit,
    // Text
    DocumentExtension,
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
    Price,
    Figcaption,
    Figure.extend({
      name: 'capturedTable',
      content: 'figcaption table',
    }),
    settings.disableOrderedListShorthand ? CustomOrderedList : OrderedListExtension,
    settings.table ? TableExtension.configure({ allowTableNodeSelection: true }) : (null as any),
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

  const editor = useEditor({
    extensions,
    parseOptions: {
      preserveWhitespace: 'full',
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: 'utrecht-theme utrecht-theme--media-query-color-scheme utrecht-html utrecht-document',
      },
    },
  });

  return (
    <>
      <DesignSystemProvider locale={'nl'} theme={lightTheme}>
        {editor && (
          <Editor
            key="editor"
            disabled={false}
            name={'name'}
            editor={editor}
            onChange={() => {}}
            value={''}
            settings={settings}
            productPrice={undefined}
          />
        )}
      </DesignSystemProvider>
    </>
  );
}

export default App;
