import { Button, Dialog, DialogBody, DialogFooter, Flex, Grid, GridItem, Typography } from '@strapi/design-system';
import type { Editor as EditorTypes } from '@tiptap/react';
import { Document, FormField, FormLabel, Select, SelectOption } from '@utrecht/component-library-react';
import React, { ChangeEvent, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ImWarning } from 'react-icons/im';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

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
  const { formatMessage } = useIntl();

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
  const deleteButtonText = isCapturedTable
    ? formatMessage({
        id: getTrad('components.tableMenuBar.deleteButtonTableWithCaption'),
        defaultMessage: 'Delete table with caption',
      })
    : formatMessage({
        id: getTrad('components.tableMenuBar.deleteButtonTable'),
        defaultMessage: 'Delete table',
      });
  const dialogDescription = isCapturedTable
    ? formatMessage({
        id: getTrad('components.tableMenuBar.dialog.descriptionTableWithCaption'),
        defaultMessage: 'Are you sure you want to delete the table with the caption?',
      })
    : formatMessage({
        id: getTrad('components.tableMenuBar.dialog.descriptionTable'),
        defaultMessage: 'Are you sure you want to delete the table?',
      });
  return (
    <Document className="utrecht-theme">
      <Grid gap={2}>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableRow">
              {formatMessage({
                id: getTrad('components.tableMenuBar.select.row.label'),
                defaultMessage: 'Row',
              })}
            </FormLabel>
            <Select id="tableRow" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.placeholder'),
                  defaultMessage: 'Select',
                })}
              </SelectOption>
              <SelectOption value="addRowAfter">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.row.options.below'),
                  defaultMessage: 'Insert row below',
                })}
              </SelectOption>
              <SelectOption value="addRowBefore">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.row.options.above'),
                  defaultMessage: 'Insert row above',
                })}
              </SelectOption>
              <SelectOption value="deleteRow">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.row.options.delete'),
                  defaultMessage: 'Delete row',
                })}
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableColumn">
              {formatMessage({
                id: getTrad('components.tableMenuBar.select.column.label'),
                defaultMessage: 'Column',
              })}
            </FormLabel>
            <Select id="tableColumn" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.placeholder'),
                  defaultMessage: 'Select',
                })}
              </SelectOption>
              <SelectOption value="addColumnAfter">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.column.options.right'),
                  defaultMessage: 'Insert column after',
                })}
              </SelectOption>
              <SelectOption value="addColumnBefore">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.column.options.left'),
                  defaultMessage: 'Insert column before',
                })}
              </SelectOption>
              <SelectOption value="deleteColumn">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.column.options.delete'),
                  defaultMessage: 'Delete column',
                })}
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="toggleHeader">
              {formatMessage({
                id: getTrad('components.tableMenuBar.select.header.label'),
                defaultMessage: 'Header',
              })}
            </FormLabel>
            <Select id="toggleHeader" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.placeholder'),
                  defaultMessage: 'Select',
                })}
              </SelectOption>
              <SelectOption value="toggleHeaderRow">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.header.options.toggle.header.row'),
                  defaultMessage: 'Toggle header row',
                })}
              </SelectOption>
              <SelectOption value="toggleHeaderColumn">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.header.options.toggle.header.column'),
                  defaultMessage: 'Toggle header column',
                })}
              </SelectOption>
              <SelectOption value="toggleHeaderCell">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.header.options.toggle.header.cell'),
                  defaultMessage: 'Toggle header cell',
                })}
              </SelectOption>
            </Select>
          </FormField>
        </GridItem>
        <GridItem col={3}>
          <FormField>
            <FormLabel htmlFor="tableCell">
              {formatMessage({
                id: getTrad('components.tableMenuBar.select.cell.label'),
                defaultMessage: 'Cell',
              })}
            </FormLabel>
            <Select id="tableCell" onChange={onTableMenubarChange} value="">
              <SelectOption>
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.placeholder'),
                  defaultMessage: 'Select',
                })}
              </SelectOption>
              <SelectOption value="mergeCells">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.cell.options.merge'),
                  defaultMessage: 'Merge cells',
                })}
              </SelectOption>
              <SelectOption value="splitCell">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.cell.options.split'),
                  defaultMessage: 'Split cell',
                })}
              </SelectOption>
              <SelectOption value="mergeOrSplit">
                {formatMessage({
                  id: getTrad('components.tableMenuBar.select.cell.options.merge.or.split'),
                  defaultMessage: 'Merge or split',
                })}
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
        title={formatMessage({
          id: getTrad('components.tableMenuBar.dialog.title'),
          defaultMessage: 'Confirmation',
        })}
        isOpen={isVisibleDeleteTable.visible}
      >
        <DialogBody icon={<ImWarning />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">{dialogDescription}</Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setIsVisibleDeleteTable({ visible: false, type: '' })} variant="tertiary">
              {formatMessage({
                id: getTrad('common.action.cancel'),
                defaultMessage: 'Cancel',
              })}
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
              {formatMessage({
                id: getTrad('common.action.confirm'),
                defaultMessage: 'Confirm',
              })}
            </Button>
          }
        />
      </Dialog>
    </Document>
  );
};
