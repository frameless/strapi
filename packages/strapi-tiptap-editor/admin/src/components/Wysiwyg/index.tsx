import { Box } from '@strapi/design-system/Box';
import { Field, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
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
import TableExtension from '@tiptap/extension-table';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';
import TableRowExtension from '@tiptap/extension-table-row';
import TextExtension from '@tiptap/extension-text';
import TextAlignExtension from '@tiptap/extension-text-align';
import TextStyleExtension from '@tiptap/extension-text-style';
import UnderlineExtension from '@tiptap/extension-underline';
import YouTubeExtension from '@tiptap/extension-youtube';
import { Extensions, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getSettings } from '../../../../utils/api';
import defaultSettings from '../../../../utils/defaults';
import ProductPriceContext from '../../context/productPrice/context';
import { mergeDeep } from '../../utils/merge';
import Editor from '../Editor';
import { Figcaption } from '../extensions/Figcaption/index';
import { Figure } from '../extensions/Figure/index';
import { Language } from '../extensions/Language';
import { LeadParagraph } from '../extensions/LeadParagraph/index';
import { Price } from '../extensions/Price/index';

interface Target {
  name: string;
  value: string;
}

export interface OnChangeParamTypes {
  target: Target;
}

interface WysiwygProps {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (param: OnChangeParamTypes) => void;
  value: string;
  intlLabel: any;
  labelAction: string;
  disabled?: boolean;
  error: string;
  description: any;
  required: boolean;
}

const Wysiwyg = (props: WysiwygProps) => {
  const { name, onChange, value, intlLabel, labelAction, disabled, error, description, required } = props;
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
};

const CustomOrderedList = OrderedListExtension.extend({
  addInputRules() {
    return [];
  },
});

const WysiwygContent = ({
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
}: WysiwygProps & { settings: typeof defaultSettings }) => {
  const { formatMessage } = useIntl();
  const [currentContent, setCurrentContent] = useState('');
  const { busy, getProductPrice, productPrice } = React.useContext(ProductPriceContext);
  const { initialData } = useCMEditViewDataManager();

  useEffect(() => {
    getProductPrice(initialData.id);
  }, [initialData.id, getProductPrice]);

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
    HeadingExtension,
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
              renderHTML: (attributes: any) => {
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
  }, [currentContent, editor, value]);

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
};

export default Wysiwyg;
