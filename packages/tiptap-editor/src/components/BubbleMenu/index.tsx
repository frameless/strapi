import { BubbleMenu } from '@tiptap/react';
import type { Editor as EditorTypes } from '@tiptap/react';
import classnames from 'classnames/bind';
import { TableMenuBar } from './Table';
import style from './styles.module.scss';

const css = classnames.bind(style);
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
        <div className={css('utrecht-tiptap-bubble-menu')}>
          {/* Render menu bars */}
          {menuBars}
        </div>
      )}
    </BubbleMenu>
  );
};
