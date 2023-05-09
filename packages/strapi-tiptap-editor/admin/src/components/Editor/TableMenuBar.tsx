import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  IconButton,
  IconButtonGroup,
  Typography,
} from '@strapi/design-system';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from '@strapi/design-system/Select';
import type { Editor as EditorTypes } from '@tiptap/react';
import React, { Fragment, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im';
import { RiInsertRowBottom, RiLayoutColumnLine, RiMergeCellsHorizontal, RiToggleLine } from 'react-icons/ri';

export const TableMenuBar = ({ editor }: { editor: EditorTypes }) => {
  const [isVisibleDeleteTable, setIsVisibleDeleteTable] = useState({ visible: false, type: '' });

  type TableEventTypes =
    | 'addRowAfter'
    | 'addRowBefore'
    | 'deleteRow'
    | 'addColumnAfter'
    | 'addColumnBefore'
    | 'deleteColumn'
    | 'toggleHeaderRow'
    | 'toggleHeaderColumn'
    | 'toggleHeaderCell'
    | 'mergeCells'
    | 'splitCell'
    | 'mergeOrSplit';

  const onTableMenubarChange = (event: TableEventTypes) => {
    switch (event) {
      case 'addRowAfter':
        editor.chain().focus().addRowAfter().run();
        break;
      case 'addRowBefore':
        editor.chain().focus().addRowBefore().run();
        break;
      case 'deleteRow':
        editor.chain().focus().deleteRow().run();
        break;
      case 'addColumnAfter':
        editor.chain().focus().addColumnAfter().run();
        break;
      case 'addColumnBefore':
        editor.chain().focus().addColumnBefore().run();
        break;
      case 'deleteColumn':
        editor.chain().focus().deleteColumn().run();
        break;
      case 'toggleHeaderRow':
        editor.chain().focus().toggleHeaderRow().run();
        break;
      case 'toggleHeaderColumn':
        editor.chain().focus().toggleHeaderColumn().run();
        break;
      case 'toggleHeaderCell':
        editor.chain().focus().toggleHeaderCell().run();
        break;
      case 'mergeCells':
        editor.chain().focus().mergeCells().run();
        break;
      case 'splitCell':
        editor.chain().focus().splitCell().run();
        break;
      case 'mergeOrSplit':
        editor.chain().focus().mergeOrSplit().run();
        break;
    }
  };

  return (
    <Fragment key="tableMenubar">
      <Grid gap={2}>
        <GridItem col={3}>
          <Select
            onChange={onTableMenubarChange}
            startIcon={<RiInsertRowBottom color="black" />}
            label="Table Row"
            placeholder="Select"
          >
            <Option value="addRowAfter">Insert row below</Option>
            <Option value="addRowBefore">Insert row above</Option>
            <Option value="deleteRow">Delete row</Option>
          </Select>
        </GridItem>
        <GridItem col={3}>
          <Select
            onChange={onTableMenubarChange}
            startIcon={<RiLayoutColumnLine color="black" />}
            label="Table Column"
            placeholder="Select"
          >
            <Option value="addColumnAfter">Insert column after</Option>
            <Option value="addColumnBefore">Insert column before</Option>
            <Option value="deleteColumn">Delete column</Option>
          </Select>
        </GridItem>
        <GridItem col={3}>
          <Select
            onChange={onTableMenubarChange}
            startIcon={<RiToggleLine color="black" />}
            label="Toggle header"
            placeholder="Select"
          >
            <Option value="toggleHeaderRow">Toggle header row</Option>
            <Option value="toggleHeaderColumn">Toggle header column</Option>
            <Option value="toggleHeaderCell">Toggle header cell</Option>
          </Select>
        </GridItem>
        <GridItem col={3}>
          <Select
            onChange={onTableMenubarChange}
            startIcon={<RiMergeCellsHorizontal color="black" />}
            label="Table cell"
            placeholder="Select"
          >
            <Option value="mergeCells">Merge cells</Option>
            <Option value="splitCell">Split cell</Option>
            <Option value="mergeOrSplit">Merge or split cell</Option>
          </Select>
        </GridItem>
      </Grid>
      <Grid>
        <IconButtonGroup className="button-group">
          <IconButton
            icon={<AiOutlineDelete />}
            label={editor.can().deleteNode('capturedTable') ? 'Delete table with caption' : 'Delete table'}
            onClick={() =>
              setIsVisibleDeleteTable({
                visible: true,
                type: editor.can().deleteNode('capturedTable') ? 'capturedTable' : 'table',
              })
            }
          />
        </IconButtonGroup>
      </Grid>
      <Dialog
        onClose={() => setIsVisibleDeleteTable({ visible: false, type: '' })}
        title="Confirmation"
        isOpen={isVisibleDeleteTable.visible}
      >
        <DialogBody icon={<ImWarning />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">{`Are you sure you want to delete the ${
                isVisibleDeleteTable.type === 'capturedTable' ? 'table with caption' : 'table'
              }?`}</Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setIsVisibleDeleteTable({ visible: false, type: '' })} variant="tertiary">
              Cancel
            </Button>
          }
          endAction={
            <Button
              variant="danger-light"
              startIcon={<AiOutlineDelete />}
              onClick={() => {
                switch (isVisibleDeleteTable.type) {
                  case 'table':
                    editor.chain().focus().deleteTable().run();
                    break;

                  case 'capturedTable':
                    editor.chain().focus().deleteNode('capturedTable').run();
                    break;

                  default:
                    break;
                }
              }}
            >
              Confirm
            </Button>
          }
        />
      </Dialog>
    </Fragment>
  );
};
