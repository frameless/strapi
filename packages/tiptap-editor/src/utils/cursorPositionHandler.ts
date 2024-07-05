import type { Editor } from '@tiptap/core';
import type { Node } from 'prosemirror-model';
import { findClosestTable } from './findClosestTable';

type CursorPositionHandlerParameters = {
  editor: Editor;
  position: 'above' | 'below';
};
export const cursorPositionHandler = ({ editor, position }: CursorPositionHandlerParameters) => {
  if (editor === null) return;

  const { state, dispatch } = editor.view;
  const { selection, schema } = state;
  const tableNode = findClosestTable({ selection });
  if (tableNode) {
    const posAbove = tableNode.pos;
    const posBelow = tableNode.pos + tableNode.node.content.size;
    const pos = position === 'above' ? posAbove : posBelow;

    const transaction = state.tr.insert(pos, schema.nodes.paragraph.createAndFill() as Node);
    dispatch(transaction);
    editor.commands.setTextSelection(pos);
  }
};
