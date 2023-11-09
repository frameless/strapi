import { Button } from '@strapi/design-system/Button';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Stack } from '@strapi/design-system/Stack';
import { TextInput } from '@strapi/design-system/TextInput';
import React from 'react';

type TextInputProps = {
  label: string;
  placeholder: string;
  name: string;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  ariaLabel: string;
  hint?: string;
  error?: string;
};

type StartActionButtonProps = {
  onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

type EndActionButtonProps = {
  onClick: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
};

export interface LinkDialogProps {
  onDialogClose: (_event: React.KeyboardEvent<HTMLElement>) => void;
  isDialogOpen: boolean;
  dialogTitle: string;
  textInputProps: TextInputProps;
  startActionButtonProps: StartActionButtonProps;
  endActionButtonProps: EndActionButtonProps;
}

export const LinkDialog = ({
  onDialogClose,
  isDialogOpen,
  dialogTitle,
  textInputProps,
  startActionButtonProps,
  endActionButtonProps,
}: LinkDialogProps) => {
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
            hint={textInputProps?.hint}
            error={textInputProps?.error}
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
          <Button
            disabled={endActionButtonProps?.disabled}
            onClick={endActionButtonProps.onClick}
            variant="success-light"
          >
            {endActionButtonProps.text}
          </Button>
        }
      />
    </Dialog>
  );
};
