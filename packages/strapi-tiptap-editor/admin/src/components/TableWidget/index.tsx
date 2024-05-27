import type { Editor } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { Button } from '@utrecht/component-library-react';
import './styles.css';
import classnames from 'classnames';
import { TbArrowBack } from 'react-icons/tb';
import { cursorPositionHandler } from '../../utils';

interface TableWidgetProps {
  editor: Editor;
}

export const TableWidget = ({ editor }: TableWidgetProps) => (
  <NodeViewWrapper className="utrecht-table-widget">
    <Button
      appearance="primary-action-button"
      className={classnames('utrecht-table-widget__button', 'utrecht-table-widget__button--top')}
      onClick={() => cursorPositionHandler({ editor, position: 'above' })}
    >
      <TbArrowBack />
    </Button>
    <NodeViewContent />
    <Button
      appearance="primary-action-button"
      className={classnames('utrecht-table-widget__button', 'utrecht-table-widget__button--down')}
      onClick={() => cursorPositionHandler({ editor, position: 'below' })}
    >
      <TbArrowBack />
    </Button>
  </NodeViewWrapper>
);
