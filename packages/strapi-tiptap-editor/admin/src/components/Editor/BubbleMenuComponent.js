import { Flex } from '@strapi/design-system/Flex';
import { BubbleMenu } from '@tiptap/react';
import React from 'react';
import { TableMenuBar } from './TableMenuBar';

// Floating bubble menu for table
export function BubbleMenuComponent({ editor }) {
  if (editor) {
    let menuBars = [];

    if (editor.isActive('table')) {
      menuBars.push(TableMenuBar(editor));
    }

    return (
      <BubbleMenu editor={editor} tippyOptions={{ zIndex: 2, maxWidth: '550px' }}>
        {menuBars.length ? (
          <Flex padding={2} className="menu-bar floating" style={{ flexWrap: 'wrap' }}>
            {/* Render menu bars */}
            {menuBars}
          </Flex>
        ) : null}
      </BubbleMenu>
    );
  }

  return null;
}
