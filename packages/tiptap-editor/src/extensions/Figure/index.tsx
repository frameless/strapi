import { mergeAttributes, Node } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TableWidget } from '../../components/TableWidget';
export const Figure = Node.create({
  name: 'figure',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  group: 'block',
  content: 'block figcaption',
  draggable: true,
  isolating: true,
  parseHTML() {
    return [
      {
        tag: `figure[data-type="${this.name}"]`,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': this.name }), 0];
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // prevent dragging nodes out of the figure
            dragstart: (view, event) => {
              if (!event.target) {
                return false;
              }

              const pos = view.posAtDOM(event.target as HTMLElement, 0);
              const $pos = view.state.doc.resolve(pos);

              if ($pos.parent.type === this.type) {
                event.preventDefault();
              }

              return false;
            },
          },
        },
      }),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(
      (options: any) => {
        return <TableWidget editor={options.editor} />;
      },
      {
        className: 'utrecht-node-viewer--captured-table utrecht-node-viewer',
      },
    );
  },
});
