import { Button, Dialog, DialogBody, DialogFooter, Stack, TextInput } from '@strapi/design-system';
import type { ChangeEvent } from 'react';
import { TbBrandYoutube } from 'react-icons/tb';
import { ToolbarItem } from './ToolbarItem';
import type { InputType } from '../../types';

type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

interface YoutubeToolbarProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  dialog?: {
    // eslint-disable-next-line no-unused-vars
    onclose: (event: ChangeEvent<HTMLInputElement>) => void;
    title: string;
    isOpen: boolean;
    youtubeURLInput: InputType;
    youTubeWidthInput: Omit<InputType, 'value'> & { value?: number };
    youTubeHeightInput: Omit<InputType, 'value'> & { value?: number };
    cancelButton: ButtonType;
    insertButton: ButtonType;
  };
}

export const YoutubeToolbar = ({ label, isActive, onClick, dialog }: YoutubeToolbarProps) => (
  <>
    <ToolbarItem icon={<TbBrandYoutube />} label={label} isActive={isActive} onClick={onClick} />
    {dialog && (
      <Dialog onClose={dialog.onclose} title={dialog.title} isOpen={dialog.isOpen}>
        <DialogBody>
          <Stack spacing={2}>
            <TextInput
              label={dialog.youtubeURLInput.label}
              placeholder={dialog.youtubeURLInput.placeholder}
              name={dialog.youtubeURLInput.name}
              onChange={dialog.youtubeURLInput.onChange}
              value={dialog.youtubeURLInput.value}
              aria-label={dialog.youtubeURLInput.ariaLabel}
            />

            <Stack horizontal spacing={2}>
              <TextInput
                label={dialog.youTubeWidthInput.label}
                type="number"
                placeholder={dialog.youTubeWidthInput.placeholder}
                name={dialog.youTubeWidthInput.name}
                onChange={dialog.youTubeWidthInput.onChange}
                value={dialog.youTubeWidthInput.value}
                aria-label={dialog.youTubeWidthInput.ariaLabel}
              />

              <TextInput
                label={dialog.youTubeHeightInput.label}
                type="number"
                placeholder={dialog.youTubeHeightInput.placeholder}
                name={dialog.youTubeHeightInput.name}
                onChange={dialog.youTubeHeightInput.onChange}
                value={dialog.youTubeHeightInput.value}
                aria-label={dialog.youTubeHeightInput.ariaLabel}
              />
            </Stack>
          </Stack>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={dialog.cancelButton.onClick} variant="tertiary" disabled={dialog.cancelButton.disabled}>
              {dialog.cancelButton.label}
            </Button>
          }
          endAction={
            <Button
              onClick={dialog.insertButton.onClick}
              variant="success-light"
              disabled={dialog.insertButton.disabled}
            >
              {dialog.insertButton.label}
            </Button>
          }
        />
      </Dialog>
    )}
  </>
);
