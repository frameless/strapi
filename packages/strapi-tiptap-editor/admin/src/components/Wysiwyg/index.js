import { Box } from '@strapi/design-system/Box';
import { Field, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Extension } from '@tiptap/core';
import BlockquoteExtension from '@tiptap/extension-blockquote';
import BoldExtension from '@tiptap/extension-bold';
import BulletListExtension from '@tiptap/extension-bullet-list';
import CharacterCountExtension from '@tiptap/extension-character-count';
import CodeExtension from '@tiptap/extension-code';
import CodeBlockExtension from '@tiptap/extension-code-block';
import { Color as ColorExtension } from '@tiptap/extension-color';
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
import TableExtension from '@tiptap/extension-table';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';
import TableRowExtension from '@tiptap/extension-table-row';
import TextExtension from '@tiptap/extension-text';
import TextAlignExtension from '@tiptap/extension-text-align';
import TextStyleExtension from '@tiptap/extension-text-style';
import UnderlineExtension from '@tiptap/extension-underline';
import YouTubeExtension from '@tiptap/extension-youtube';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getSettings } from '../../../../utils/api';
import defaultSettings from '../../../../utils/defaults';
import ProductPriceContext from '../../context/productPrice/context';
import { mergeDeep } from '../../utils/merge';
import Editor from '../Editor';
import { Figcaption, Figure, LeadParagraph, Price } from '../extensions/index';

function Wysiwyg(opts) {
  const { name, onChange, value, intlLabel, labelAction, disabled, error, description, required } = opts;
  const { data: savedSettings, isLoading } = useQuery('settings', getSettings);
  const settings = mergeDeep(defaultSettings, savedSettings);

  if (isLoading) return null;

  return (
    <WysiwygContent
      name={name}
      onChange={onChange}
      value={value}
      intlLabel={intlLabel}
      labelAction={labelAction}
      disabled={disabled}
      error={error}
      description={description}
      required={required}
      settings={settings}
    />
  );
}

const CSSColumnsExtension = Extension.create({
  name: 'cssColumns',
  addOptions() {
    return {
      types: [],
      columnTypes: [2, 3],
      defaultColumnType: 'two',
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          cssColumns: {
            default: null,
            renderHTML: (attributes) =>
              attributes.cssColumns !== null && { style: `column-count: ${attributes.cssColumns}` },
            parseHTML: (element) => element.style.columnCount || null,
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      toggleColumns:
        (columnType) =>
        ({ commands, editor }) => {
          if (!editor.isActive({ cssColumns: columnType }))
            return this.options.types.every((type) => commands.updateAttributes(type, { cssColumns: columnType }));

          return this.options.types.every((type) => commands.resetAttributes(type, 'cssColumns'));
        },
      unsetColumns:
        (_columnType) =>
        ({ commands }) => {
          return this.options.types.every((type) => commands.resetAttributes(type, 'cssColumns'));
        },
    };
  },
});

const CustomOrderedList = OrderedListExtension.extend({
  addInputRules() {
    return [];
  },
});

function WysiwygContent({
  name,
  onChange,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
  settings,
}) {
  const { formatMessage } = useIntl();
  const [currentContent, setCurrentContent] = useState('');
  const { busy, getProductPrice, productPrice } = React.useContext(ProductPriceContext);
  const { initialData } = useCMEditViewDataManager();

  useEffect(() => {
    getProductPrice(initialData.id);
  }, [initialData.id, getProductPrice]);

  const editor = useEditor({
    extensions: [
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
      HeadingExtension,
      LeadParagraph,
      Price,
      Figcaption,
      Figure.extend({
        name: 'capturedTable',
        content: 'figcaption table',
      }),
      settings.disableOrderedListShorthand ? CustomOrderedList : OrderedListExtension,
      settings.code ? CodeBlockExtension : null,
      settings.code ? CodeExtension : null,
      settings.blockquote ? BlockquoteExtension : null,
      settings.horizontal ? HorizontalRuleExtension : null,
      settings.hardbreak ? HardBreakExtension : null,

      UnderlineExtension,
      TextAlignExtension.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyleExtension,
      settings.color ? ColorExtension : null,
      settings.highlight ? HighlightExtension.configure({ multicolor: true }) : null,
      // Links
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

      // Images
      settings.image.enabled
        ? ImageExtension.extend({
            addAttributes() {
              return {
                // eslint-disable-next-line react/no-this-in-sfc
                ...this.parent?.(),
                width: { default: null },
                height: { default: null },
                loading: { default: null },
                renderHTML: (attributes) => {
                  return {
                    width: attributes.width,
                    height: attributes.height,
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

      // Table
      settings.table
        ? TableExtension.configure({
            allowTableNodeSelection: true,
          })
        : null,
      settings.table ? TableRowExtension : null,
      settings.table ? TableCellExtension : null,
      settings.table ? TableHeaderExtension : null,

      settings.other && settings.other.wordcount ? CharacterCountExtension.configure() : null,

      // CSS Columns
      CSSColumnsExtension.configure({
        types: ['paragraph'],
      }),

      settings.youtube.enabled
        ? YouTubeExtension.configure({
            inline: false,
          })
        : null,
    ],
    parseOptions: {
      preserveWhitespace: 'full',
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  useEffect(() => {
    if (editor === null) return;

    if (currentContent === '') {
      // Content can be 2 things: JSON or String. Be able to display both things.

      try {
        // If content is saved as json, parse it

        const json = JSON.parse(value);

        setCurrentContent(value);
        editor.commands.setContent(json, false);
      } catch (e) {
        // Use value as is, the content hasn't been converted to json.
        setCurrentContent(value);
        editor.commands.setContent(value, false);
      }
    }
  }, [currentContent, editor, value, onChange, initialData.id]);

  useEffect(() => {
    editor?.on('update', () => {
      if (settings.other.saveJson) {
        onChange({ target: { name, value: JSON.stringify(editor.getJSON()) } });
      } else {
        onChange({ target: { name, value: editor.getHTML() } });
      }
    });

    return () => {
      editor?.off('update', () => {
        if (settings.other.saveJson) {
          onChange({ target: { name, value: JSON.stringify(editor.getJSON()) } });
        } else {
          onChange({ target: { name, value: editor.getHTML() } });
        }
      });
    };
  }, [editor, name, onChange, settings.other.saveJson, initialData.id]);

  return (
    <Field required={required}>
      <Stack spacing={1}>
        <Box>
          <FieldLabel action={labelAction}> {formatMessage(intlLabel)}</FieldLabel>
        </Box>
        {editor && !busy && (
          <Editor
            key="editor"
            disabled={disabled}
            name={name}
            editor={editor}
            onChange={onChange}
            value={value}
            settings={settings}
            productPrice={productPrice}
          />
        )}
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && <Typography variant="pi">{formatMessage(description)}</Typography>}
      </Stack>
    </Field>
  );
}

Wysiwyg.defaultProps = {
  description: '',
  intlLabel: '',
};

Wysiwyg.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
};

export default Wysiwyg;
