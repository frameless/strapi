import { Button } from '@strapi/design-system';
import Eye from '@strapi/icons/Eye';
import type { RefObject, ReactNode } from 'react';
import type { DialogProps } from '../Modal';
import { Dialog } from '../Modal';

interface PreviewButtonConfig {
  onClick: () => void;
  label: ReactNode;
}

interface DialogConfig extends Pick<DialogProps, 'title' | 'closeButton' | 'startAction' | 'endAction'> {
  ref: RefObject<HTMLDialogElement>;
  body: ReactNode;
}

export interface DialogPreviewButtonProps {
  dialog: DialogConfig;
  previewButton: PreviewButtonConfig;
}
export const DialogPreviewButton = ({ dialog, previewButton }: DialogPreviewButtonProps) => (
  <div className="preview-dialog utrecht-theme">
    <Button size="S" startIcon={<Eye />} className="utrecht-preview-button" onClick={previewButton.onClick}>
      {previewButton.label}
    </Button>
    <Dialog
      ref={dialog.ref}
      title={dialog.title}
      closeButton={dialog.closeButton}
      startAction={dialog.startAction}
      endAction={dialog.endAction}
    >
      <div className="utrecht-html">{dialog.body}</div>
    </Dialog>
  </div>
);

