import { Box } from '@strapi/design-system/Box';
import { EditorContent } from '@tiptap/react';
import type { Editor as EditorTypes } from '@tiptap/react';
import { Document } from '@utrecht/component-library-react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { BubbleMenuComponent } from './BubbleMenuComponent';
import { Toolbar } from './Toolbar';
import Wrapper from './styles';
import defaultSettings from '../../../../utils/defaults';
import { PriceListTypes } from '../../types';
import { getLocalStorage } from '../../utils';
import MediaLib from '../MediaLib';
import { OnChangeParamTypes } from '../Wysiwyg';
import './editor.scss';
import { StickyContainer, Sticky } from 'react-sticky';

interface EditorProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  productPrice?: PriceListTypes;
  disabled?: boolean;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (param: OnChangeParamTypes) => void;
  value: string;
}

const Editor = ({ editor, settings, productPrice }: EditorProps) => {
  // Media library handling
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [forceInsert, setForceInsert] = useState(false);
  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
  const getUpdatedImage = (asset: any) => {
    return {
      src: asset.url,
      alt: asset.alt,
      'data-figcaption': asset?.caption,
      ...(asset.width && { width: asset.width }),
      ...(asset.height && { height: asset.height }),
      ...(asset.url?.includes('lazy') || (asset.caption === 'lazy' && { loading: 'lazy' })),
    };
  };

  const handleChangeAssets = (assets: any[]) => {
    if (!forceInsert && editor.isActive('image')) {
      assets.forEach((asset) => {
        if (asset.mime.includes('image')) {
          editor.chain().focus().setImage(getUpdatedImage(asset)).run();
        }
      });
    } else {
      assets.forEach((asset) => {
        if (asset.mime.includes('image')) {
          editor.commands.setImage(getUpdatedImage(asset));
        }
      });
    }

    setForceInsert(false);
    handleToggleMediaLib();
  };

  // Wait till we have the settings before showing the editor
  if (!settings) {
    return null;
  }
  type Theme = 'light' | 'dark';
  const availableThemes: Theme[] = ['light', 'dark'];
  const isTheme = (arg: any): arg is Theme => availableThemes.some((x) => x === arg);
  const localStorageTheme = getLocalStorage('STRAPI_THEME', isTheme);
  return (
    <Wrapper>
      <StickyContainer>
        <Sticky topOffset={-50}>
          {({ style }) => (
            <div
              style={{
                ...style,
                zIndex: 10,
              }}
            >
              <Toolbar
                editor={editor}
                toggleMediaLib={handleToggleMediaLib}
                settings={settings}
                productPrice={productPrice}
              />
            </div>
          )}
        </Sticky>
        <Document
          className={clsx('utrecht-document--surface', 'utrecht-theme--media-query-color-scheme', {
            'utrecht-strapi-editor-content--dark': localStorageTheme === 'dark',
          })}
        >
          <EditorContent editor={editor} />
        </Document>
      </StickyContainer>
      <BubbleMenuComponent editor={editor} />
      {settings.other && settings.other.wordcount ? (
        <Box marginTop="5px" color="neutral600">
          {editor.storage.characterCount.words()} {editor.storage.characterCount.words() > 1 ? 'words' : 'word'}
        </Box>
      ) : null}

      <MediaLib isOpen={mediaLibVisible} onChange={handleChangeAssets} onToggle={handleToggleMediaLib} />
    </Wrapper>
  );
};

export default Editor;
