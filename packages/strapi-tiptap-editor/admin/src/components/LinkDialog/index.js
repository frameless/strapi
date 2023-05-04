import { Button } from '@strapi/design-system/Button';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { TextInput } from '@strapi/design-system/TextInput';
import React from 'react';

export function LinkDialog({
  onDialogClose,
  isDialogOpen,
  dialogTitle,
  textInputProps,
  startActionButtonProps,
  endActionButtonProps,
}) {
  return (
    <Dialog onClose={onDialogClose} title={dialogTitle} isOpen={isDialogOpen}>
      <DialogBody>
        <Stack spacing={2}>
          <TextInput
            label={textInputProps.label}
            placeholder={textInputProps.placeholder}
            name={textInputProps.name}
            onChange={textInputProps.onChange}
            value={textInputProps.value}
            aria-label={textInputProps.ariaLabel}
          />
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={startActionButtonProps.onClick} variant="tertiary">
            {startActionButtonProps.text}
          </Button>
        }
        endAction={
          <Button onClick={endActionButtonProps.onClick} variant="success-light">
            {endActionButtonProps.text}
          </Button>
        }
      />
    </Dialog>
  );
}
