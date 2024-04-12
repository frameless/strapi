import { Flex } from '@strapi/design-system/Flex';
import { BubbleMenu } from '@tiptap/react';
import type { Editor as EditorTypes } from '@tiptap/react';
import React from 'react';
import { TableMenuBar } from './TableMenuBar';

export interface BubbleMenuComponentProps {
  editor: EditorTypes;
}
export const BubbleMenuComponent = ({ editor }: BubbleMenuComponentProps) => {
  if (!editor) {
    return null;
  }

  const menuBars = editor.isActive('table') ? [<TableMenuBar editor={editor} key={1} />] : [];

  return (
    <BubbleMenu editor={editor} tippyOptions={{ zIndex: 2, maxWidth: '600px', duration: 20 }}>
      {menuBars.length > 0 && (
        <Flex padding={2} className="menu-bar floating">
          {/* Render menu bars */}
          {menuBars}
        </Flex>
      )}
    </BubbleMenu>
  );
};
