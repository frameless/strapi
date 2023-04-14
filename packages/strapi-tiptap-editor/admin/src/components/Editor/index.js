import { Box } from '@strapi/design-system/Box';
import { EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BubbleMenuComponent } from './BubbleMenuComponent';
import { Toolbar } from './Toolbar';
import Wrapper from './styles.js';
import MediaLib from '../MediaLib';
import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';

function Editor({ editor, settings, productPrice }) {
  // Media library handling
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [forceInsert, setForceInsert] = useState(false);
  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
  const getUpdatedImage = (asset) => ({
    src: asset.url,
    alt: asset.alt,
    ...(asset.width && { width: asset.width }),
    ...(asset.height && { height: asset.height }),
    ...(asset.url?.includes('lazy') || (asset.caption === 'lazy' && { loading: 'lazy' })),
  });

  const handleChangeAssets = (assets) => {
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
        <BubbleMenuComponent editor={editor} toggleMediaLib={handleToggleMediaLib} />

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
}

Editor.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default Editor;
