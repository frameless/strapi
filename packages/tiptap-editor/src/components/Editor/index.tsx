// import { useCMEditViewDataManager } from '@strapi/helper-plugin';
// import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
// import ProductPriceContext from '../../context/productPrice/context';
// import { getSettings } from '../../utils/api';
// import { mergeDeep } from '../../utils/merge';
import { DesignSystemProvider } from '@strapi/design-system';
import { Box, Field, FieldLabel, Stack, Typography } from '@strapi/design-system';
import { EditorContent, useEditor } from '@tiptap/react';
import { extensions } from './extensions';
import PriceState from '../../context/price/state';
import defaultSettings from '../../utils/defaults';
import { BubbleMenuComponent } from '../BubbleMenu';
import { Toolbar } from '../Toolbar';

import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';
import '../../styles/global.scss';
import { useEffect } from 'react';
interface WysiwygProps {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onEditorChangeHandler: (content?: string) => void;
  value?: string;
  intlLabel?: any;
  labelAction?: string;
  disabled?: boolean;
  error?: string;
  description?: any;
  required?: boolean;
  className?: string;
  locale?: string;
}

export const Editor = ({
  name,
  onEditorChangeHandler,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
  settings,
  className,
  locale,
}: WysiwygProps & { settings: typeof defaultSettings }) => {
  const editor = useEditor({
    extensions: extensions({ settings }),
    parseOptions: {
      preserveWhitespace: 'full',
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: className ?? '',
      },
    },
    onUpdate: ({ editor }) => {
      if (typeof onEditorChangeHandler === 'function') {
        onEditorChangeHandler(editor.getHTML());
      }
    },
    content: value,
  });

  useEffect(() => {
    if (editor === null) return;
    editor.commands.setContent(editor.getHTML(), false);
  }, []);

  return (
    <DesignSystemProvider>
      <PriceState
        value={{
          price: settings.price.data,
        }}
      >
        <Field required={required} className="utrecht-theme">
          <Stack spacing={1}>
            <Box>
              <FieldLabel action={labelAction}> {intlLabel}</FieldLabel>
            </Box>
            {editor && (
              <Box hasRadius overflow="hidden" borderWidth="1px" borderStyle="solid" borderColor="neutral200">
                <Toolbar editor={editor} settings={settings} locale={locale} />
                <BubbleMenuComponent editor={editor} />

                <Box
                  padding={2}
                  background="neutral0"
                  maxHeight="600px"
                  style={{ resize: 'vertical', overflow: 'auto' }}
                >
                  <EditorContent editor={editor} name={name} disabled={disabled} key="editor" value={value} />
                </Box>
              </Box>
            )}
            {error && (
              <Typography variant="pi" textColor="danger600">
                {error}
              </Typography>
            )}
            {description && <Typography variant="pi">{description}</Typography>}
          </Stack>
        </Field>
      </PriceState>
    </DesignSystemProvider>
  );
};
