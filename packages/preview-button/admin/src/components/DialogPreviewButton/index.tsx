import { Button } from '@strapi/design-system/Button';
import Eye from '@strapi/icons/Eye';
import { ReactNode, RefObject } from 'react';
import { ActionButton, Dialog } from '../Modal';

interface DialogType {
  ref: RefObject<HTMLDialogElement>;
  title: string;
  closeButton: ActionButton;
  startAction: ActionButton;
  endAction: ActionButton;
  body: ReactNode;
}

export interface DialogPreviewButtonProps {
  dialog: DialogType;
  previewButton: ActionButton;
}

export const DialogPreviewButton = ({ dialog, previewButton }: DialogPreviewButtonProps) => (
  <div className="preview-dialog utrecht-theme">
    <Button size="S" startIcon={<Eye />} className="utrecht-preview-button" onClick={previewButton?.onClick}>
      {previewButton?.label}
    </Button>
    <Dialog
      ref={dialog?.ref}
      title={dialog?.title}
      closeButton={{
        onClick: dialog?.closeButton?.onClick,
      }}
      startAction={{
        onClick: dialog?.startAction?.onClick,
        label: dialog?.startAction?.label,
      }}
      endAction={{
        onClick: dialog?.endAction?.onClick,
        label: dialog?.endAction?.label,
      }}
    >
      <div className="utrecht-html">{dialog?.body}</div>
    </Dialog>
  </div>
);
