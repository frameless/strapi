import { Flex } from '@strapi/design-system/Flex';
import { BubbleMenu } from '@tiptap/react';
import React from 'react';
import { TableMenuBar } from './TableMenuBar';
import { LinkToolbar } from './Toolbar';
import { useLink } from '../../hooks/useLink';
import { LinkDialog } from '../LinkDialog';

// Floating bubble menu for table
export function BubbleMenuComponent({ editor }) {
  const { isVisibleLinkDialog, onCloseLinkDialog, linkInput, onLinkUrlInputChange, openLinkDialog, onInsertLink } =
    useLink(editor);
  const isSelectionOverLink = editor.getAttributes('link').href;

  if (editor) {
    let menuBars = [];

    if (editor.isActive('table')) {
      menuBars.push(TableMenuBar(editor));
    } else if (isSelectionOverLink) {
      menuBars.push(<LinkToolbar onClick={openLinkDialog} editor={editor} />);
    }

    return (
      <>
        <BubbleMenu editor={editor} tippyOptions={{ zIndex: 2, maxWidth: '550px' }}>
          {menuBars.length ? (
            <Flex padding={2} className="menu-bar floating" style={{ flexWrap: 'wrap' }}>
              {/* Render menu bars */}
              {menuBars}
            </Flex>
          ) : null}
        </BubbleMenu>
        <LinkDialog
          onDialogClose={onCloseLinkDialog}
          isDialogOpen={isVisibleLinkDialog}
          dialogTitle="Insert link"
          textInputProps={{
            label: 'Link URL',
            placeholder: 'Write or paste the url here',
            name: 'url',
            onChange: (e) => onLinkUrlInputChange(e.target.value),
            value: linkInput,
            ariaLabel: 'URL',
          }}
          startActionButtonProps={{
            onClick: onCloseLinkDialog,
            text: 'Cancel',
          }}
          endActionButtonProps={{
            onClick: onInsertLink,
            text: 'Insert link',
          }}
        />
      </>
    );
  }

  return null;
}
