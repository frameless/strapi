import { Button } from '@strapi/design-system/Button';
import Eye from '@strapi/icons/Eye';
import PropTypes from 'prop-types';
import React from 'react';
import { Dialog } from '../Modal';
export const DialogPreviewButton = ({ dialog, previewButton }) => (
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

DialogPreviewButton.propTypes = {
  dialog: PropTypes.shape({
    ref: PropTypes.object,
    title: PropTypes.string,
    closeButton: PropTypes.shape({
      onClick: PropTypes.func,
    }),
    startAction: PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
    endAction: PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
    body: PropTypes.node,
  }).isRequired,
  previewButton: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }).isRequired,
};
