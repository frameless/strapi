import { Alert, Button, Dialog, DialogBody, DialogFooter, IconButtonGroup, TextInput } from '@strapi/design-system';
import { Paragraph } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { GrClose } from 'react-icons/gr';
import { RxUpdate } from 'react-icons/rx';
import {
  TbAnchor,
  // TbRefresh,
  // TbLetterX
} from 'react-icons/tb';
import slugify from 'slugify';
import { ToolbarItem } from './ToolbarItem';
import styles from './styles.module.scss';
import type { InputType } from '../../types';

const css = classnames.bind(styles);

type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type AlertTypes = {
  title: string;
  description: string;
  onClose: () => void;
  currentID: string;
};

type DialogTypes = {
  title: string;
  onClose: () => void;
  isOpen: boolean;
  input: InputType;
  cancelButton: ButtonType;
  insertButton: ButtonType;
  isAlertVisible: boolean;
  alert: AlertTypes;
  updateID: boolean;
};
interface ToolbarItemHeadingWithIDProps {
  onClick: () => void;
  label: string;
  isActive: boolean;
  disabled?: boolean;
  dialog?: DialogTypes;
}

export const createAnchorLink = (text: string) => {
  return slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: 'nl',
    trim: true,
  });
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(`Error copying to clipboard: ${error}`);
  }
};

export const ToolbarItemHeadingWithID = ({
  dialog,
  disabled,
  isActive,
  label,
  onClick,
}: ToolbarItemHeadingWithIDProps) => {
  return (
    <>
      <IconButtonGroup className={css('utrecht-tiptap-toolbar__button-group')}>
        <ToolbarItem icon={<TbAnchor />} label={label} disabled={disabled} isActive={isActive} onClick={onClick} />
      </IconButtonGroup>
      <Dialog onClose={dialog?.onClose} title={dialog?.title} isOpen={dialog?.isOpen}>
        <DialogBody>
          {dialog?.isAlertVisible && (
            <Alert title={dialog.alert.title} variant="success" onClose={dialog.alert.onClose}>
              {dialog.alert.description && <Paragraph>{dialog.alert.description}</Paragraph>}
              {dialog.alert.currentID && <Paragraph>#{dialog.alert.currentID}</Paragraph>}
            </Alert>
          )}
          {dialog?.updateID && (
            <div>
              <TextInput
                label={dialog.input.label}
                defaultValue={dialog.input.defaultValue}
                placeholder={dialog.input.placeholder}
                name="heading-id"
                hint={dialog.input.hint}
                onChange={dialog.input.onChange}
                value={dialog.input.value}
                error={dialog.input.error}
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={dialog?.cancelButton.onClick} variant="tertiary" startIcon={<GrClose />}>
              {dialog?.cancelButton.label}
            </Button>
          }
          endAction={
            <Button
              disabled={dialog?.insertButton.disabled}
              onClick={dialog?.insertButton.onClick}
              variant="success-light"
              startIcon={<RxUpdate />}
            >
              {dialog?.insertButton.label}
            </Button>
          }
        />
      </Dialog>
    </>
  );
};
