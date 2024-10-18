import type { Selection } from '@tiptap/pm/state';

interface FindClosestTableParameters {
  selection: Selection;
}

interface FindTClosestComponentParameters {
  selection: Selection;
  nodeType?: string;
}

export const findClosestComponent = ({ selection, nodeType }: FindTClosestComponentParameters) => {
  const { $from, $to } = selection;

  let tableNode: any = null;
  const range = $from.blockRange($to);
  if (range) {
    range.$to.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos): any => {
      if (node.type.name === nodeType) {
        tableNode = { node, pos };
      }
      return false;
    });
  }
  return tableNode;
};

export const findClosestTable = ({ selection }: FindClosestTableParameters) => {
  return (
    findClosestComponent({ selection, nodeType: 'table' }) ||
    findClosestComponent({ selection, nodeType: 'capturedTable' })
  );
};
