import { Button, Dialog, DialogBody, DialogFooter, Field, FieldLabel, Stack, Textarea } from '@strapi/design-system';
import type { ChangeEvent } from 'react';
import { TbPhotoUp } from 'react-icons/tb';
import { ToolbarItem } from './ToolbarItem';

type TextareaTypes = {
  label: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  ariaLabel: string;
};

type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

interface ImageBase64ToolbarProps {
  // eslint-disable-next-line no-unused-vars
  onClick: () => void;
  label: string;
  isActive: boolean;
  dialog?: {
    title: string;
    onClose: () => void;
    isOpen: boolean;
    textarea: TextareaTypes;
    cancelButton: ButtonType;
    insertButton: ButtonType;
    preview?: {
      label: string;
    };
  };
}

export const ImageBase64Toolbar = ({ dialog, isActive, label, onClick }: ImageBase64ToolbarProps) => (
  <>
    <ToolbarItem icon={<TbPhotoUp />} label={label} isActive={isActive} onClick={onClick} />
    {dialog && (
      <Dialog onClose={dialog.onClose} title={dialog.title} isOpen={dialog.isOpen}>
        <DialogBody>
          <Stack spacing={2}>
            <Textarea
              label={dialog.textarea.label}
              placeholder={dialog.textarea.placeholder}
              name={dialog.textarea.name}
              onChange={dialog.textarea.onChange}
              value={dialog.textarea.value}
              style={{ maxHeight: '200px' }}
              aria-label={dialog.textarea.ariaLabel}
            />

            <Field name="preview">
              <Stack spacing={1}>
                {dialog.preview?.label && <FieldLabel>{dialog.preview.label}</FieldLabel>}
                {dialog.textarea.value.length ? (
                  <img style={{ maxWidth: '100%' }} src={dialog.textarea.value} alt="" />
                ) : null}
              </Stack>
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={dialog.cancelButton.onClick} variant="tertiary">
              {dialog.cancelButton.label}
            </Button>
          }
          endAction={
            <Button
              disabled={dialog.insertButton.disabled}
              onClick={dialog.insertButton.onClick}
              variant="success-light"
            >
              {dialog.insertButton.label}
            </Button>
          }
        />
      </Dialog>
    )}
  </>
);
