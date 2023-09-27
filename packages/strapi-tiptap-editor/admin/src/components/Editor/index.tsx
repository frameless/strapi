import { Box } from '@strapi/design-system/Box';
import { EditorContent } from '@tiptap/react';
import type { Editor as EditorTypes } from '@tiptap/react';
import React, { useState } from 'react';
import { BubbleMenuComponent } from './BubbleMenuComponent';
import { Toolbar } from './Toolbar';
import Wrapper from './styles';
import defaultSettings from '../../../../utils/defaults';
import MediaLib from '../MediaLib';
import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';
import { OnChangeParamTypes } from '../Wysiwyg';
import { PriceListTypes } from '../extensions/Price';

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

  return (
    <Wrapper>
      <Box hasRadius overflow="hidden" borderWidth="1px" borderStyle="solid" borderColor="neutral200">
        <Toolbar
          editor={editor}
          toggleMediaLib={handleToggleMediaLib}
          settings={settings}
          productPrice={productPrice}
        />
        <BubbleMenuComponent editor={editor} />

        <Box
          padding={2}
          background="neutral0"
          maxHeight="600px"
          style={{ resize: 'vertical', overflow: 'auto' }}
          className={['utrecht-theme'].join(' ')}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>

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
