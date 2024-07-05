import { Button, Dialog, DialogBody, DialogFooter, Grid, GridItem, Typography } from '@strapi/design-system';
import type { Editor as EditorTypes } from '@tiptap/react';
import { Document, FormField, FormLabel, Select, SelectOption } from '@utrecht/component-library-react';
import { ChangeEvent, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im';

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

export const TableMenuBar = ({ editor }: { editor: EditorTypes }) => {
  const [isVisibleDeleteTable, setIsVisibleDeleteTable] = useState({ visible: false, type: '' });

  const onTableMenubarChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value as TableEventTypes) {
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
  const isCapturedTable = editor.can().deleteNode('capturedTable');
  const deleteButtonText = isCapturedTable ? 'Delete table with caption' : 'Delete table';
  const dialogDescription = isCapturedTable
    ? 'Are you sure you want to delete the table with the caption?'
    : 'Are you sure you want to delete the table?';
  // const deleteButtonText = isCapturedTable
  //   ? formatMessage({
  //       id: 'components.tableMenuBar.deleteButtonTableWithCaption',
  //       defaultMessage: 'Delete table with caption',
  //     })
  //   : formatMessage({
  //       id: 'components.tableMenuBar.deleteButtonTable',
  //       defaultMessage: 'Delete table',
  //     });
  // const dialogDescription = isCapturedTable
  //   ? formatMessage({
  //       id: 'components.tableMenuBar.dialog.descriptionTableWithCaption',
  //       defaultMessage: 'Are you sure you want to delete the table with the caption?',
  //     })
  //   : formatMessage({
  //       id: 'components.tableMenuBar.dialog.descriptionTable',
  //       defaultMessage: 'Are you sure you want to delete the table?',
  //     });
  return (
    <Document className="utrecht-theme utrecht-theme--media-query-color-scheme">
      <Grid gap={2}>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableRow">
              {/* {formatMessage({
                id: 'components.tableMenuBar.select.row.label',
                defaultMessage: 'Row',
              })} */}
              Row
            </FormLabel>
            <Select id="tableRow" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.placeholder',
                  defaultMessage: 'Select',
                })} */}
                Select
              </SelectOption>
              <SelectOption value="addRowAfter">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.row.options.below',
                  defaultMessage: 'Insert row below',
                })} */}
                Insert row below
              </SelectOption>
              <SelectOption value="addRowBefore">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.row.options.above',
                  defaultMessage: 'Insert row above',
                })} */}
                Insert row above
              </SelectOption>
              <SelectOption value="deleteRow">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.row.options.delete',
                  defaultMessage: 'Delete row',
                })} */}
                Delete row
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableColumn">
              {/* {formatMessage({
                id: 'components.tableMenuBar.select.column.label',
                defaultMessage: 'Column',
              })} */}
              Column
            </FormLabel>
            <Select id="tableColumn" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.placeholder',
                  defaultMessage: 'Select',
                })} */}
                Select
              </SelectOption>
              <SelectOption value="addColumnAfter">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.column.options.right',
                  defaultMessage: 'Insert column after',
                })} */}
                Insert column after
              </SelectOption>
              <SelectOption value="addColumnBefore">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.column.options.left',
                  defaultMessage: 'Insert column before',
                })} */}
                Insert column before
              </SelectOption>
              <SelectOption value="deleteColumn">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.column.options.delete',
                  defaultMessage: 'Delete column',
                })} */}
                Delete column
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="toggleHeader">
              {/* {formatMessage({
                id: 'components.tableMenuBar.select.header.label',
                defaultMessage: 'Header',
              })} */}
              Header
            </FormLabel>
            <Select id="toggleHeader" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.placeholder',
                  defaultMessage: 'Select',
                })} */}
                Select
              </SelectOption>
              <SelectOption value="toggleHeaderRow">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.header.options.toggle.header.row',
                  defaultMessage: 'Toggle header row',
                })} */}
                Toggle header row
              </SelectOption>
              <SelectOption value="toggleHeaderColumn">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.header.options.toggle.header.column',
                  defaultMessage: 'Toggle header column',
                })} */}
                Toggle header column
              </SelectOption>
              <SelectOption value="toggleHeaderCell">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.header.options.toggle.header.cell',
                  defaultMessage: 'Toggle header cell',
                })} */}
                Toggle header cell
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableCell">
              {/* {formatMessage({
                id: 'components.tableMenuBar.select.cell.label',
                defaultMessage: 'Cell',
              })} */}
              Cell
            </FormLabel>
            <Select id="tableCell" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.placeholder',
                  defaultMessage: 'Select',
                })} */}
                Select
              </SelectOption>
              <SelectOption value="mergeCells">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.cell.options.merge',
                  defaultMessage: 'Merge cells',
                })} */}
                Merge cells
              </SelectOption>
              <SelectOption value="splitCell">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.cell.options.split',
                  defaultMessage: 'Split cell',
                })} */}
                Split cell
              </SelectOption>
              <SelectOption value="mergeOrSplit">
                {/* {formatMessage({
                  id: 'components.tableMenuBar.select.cell.options.merge.or.split',
                  defaultMessage: 'Merge or split',
                })} */}
                Merge or split
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={6}>
          <Button
            variant="danger-light"
            startIcon={<AiOutlineDelete />}
            onClick={() =>
              setIsVisibleDeleteTable({
                visible: !isVisibleDeleteTable.visible,
                type: isCapturedTable ? 'capturedTable' : 'table',
              })
            }
          >
            {deleteButtonText}
          </Button>
        </GridItem>
      </Grid>
      <Dialog
        onClose={() => setIsVisibleDeleteTable({ visible: !isVisibleDeleteTable.visible, type: '' })}
        title={
          //   formatMessage({
          //   id: 'components.tableMenuBar.dialog.title',
          //   defaultMessage: 'Confirmation',
          // })
          'Confirmation'
        }
        isOpen={isVisibleDeleteTable.visible}
      >
        <DialogBody icon={<ImWarning />}>
          <div>
            <div>
              <Typography id="confirm-description">{dialogDescription}</Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setIsVisibleDeleteTable({ visible: false, type: '' })} variant="tertiary">
              {/* {formatMessage({
                id: 'common.action.cancel',
                defaultMessage: 'Cancel',
              })} */}
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
                    setIsVisibleDeleteTable({ visible: false, type: '' });
                    break;

                  case 'capturedTable':
                    editor.chain().focus().deleteNode('capturedTable').run();
                    setIsVisibleDeleteTable({ visible: false, type: '' });
                    break;

                  default:
                    break;
                }
              }}
            >
              {/* {formatMessage({
                id: 'common.action.confirm',
                defaultMessage: 'Confirm',
              })} */}
              Confirm
            </Button>
          }
        />
      </Dialog>
    </Document>
  );
};
