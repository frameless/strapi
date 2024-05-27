import Table from '@tiptap/extension-table';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TableWidget } from '../../TableWidget';

const CustomTable = Table.extend({
  addNodeView() {
    return ReactNodeViewRenderer(
      (options) => {
        return <TableWidget editor={options.editor} />;
      },
      {
        className: 'utrecht-node-viewer--table utrecht-node-viewer',
      },
    );
  },
});

export default CustomTable;
