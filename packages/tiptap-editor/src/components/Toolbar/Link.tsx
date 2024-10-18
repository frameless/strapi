import { FormField, FormFieldDescription, FormLabel, Paragraph, Textbox } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { type RefObject, useId } from 'react';
import { TbLink } from 'react-icons/tb';
import { ToolbarItem } from './ToolbarItem';
import styles from './styles.module.scss';
import type { InputType } from '../../types';
import { Dialog } from '../Dialog';

const css = classnames.bind(styles);
type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

interface LinkToolbarProps {
  // eslint-disable-next-line no-unused-vars
  onClick: () => void;
  label: string;
  isActive: boolean;
  dialog?: {
    linkDialogRef: RefObject<HTMLDialogElement>;
    title: string;
    onClose: () => void;
    input: InputType;
    cancelButton: ButtonType;
    insertButton: ButtonType;
  };
}

export const LinkToolbar = ({ onClick, label, isActive, dialog }: LinkToolbarProps) => {
  const inputID = useId();
  return (
    <div style={{ '--utrecht-modal-dialog-min-inline-size': 'fit-content' } as any}>
      <ToolbarItem
        icon={
          <div className={css('utrecht-tiptap-toolbar__icon')}>
            <TbLink />
          </div>
        }
        label={label}
        isActive={isActive}
        onClick={onClick}
      />
      {dialog && (
        <Dialog
          ref={dialog.linkDialogRef}
          title={dialog.title}
          startAction={{
            label: dialog.cancelButton.label,
            onClick: dialog.cancelButton.onClick,
          }}
          endAction={{
            label: dialog.insertButton.label,
            onClick: dialog.insertButton.onClick,
            disabled: dialog.insertButton.disabled,
          }}
          closeButton={{
            onClick: dialog.cancelButton.onClick,
          }}
        >
          <FormField invalid type="text">
            <Paragraph className="utrecht-form-field__label">
              {dialog.input.label && <FormLabel htmlFor={inputID}>{dialog.input.label}</FormLabel>}
            </Paragraph>
            <Paragraph className="utrecht-form-field__input">
              <Textbox
                onChange={dialog.input.onChange}
                placeholder={dialog.input.placeholder}
                id={inputID}
                invalid={!!dialog.input?.error}
                name={dialog.input.name}
                required={dialog.input.disabled}
                aria-label={dialog.input.ariaLabel}
                type="text"
                value={dialog.input.value}
              />
            </Paragraph>
            {dialog.input?.hint && (
              <FormFieldDescription className="utrecht-form-field__description" id={`${inputID}-description`}>
                {dialog.input?.hint}
              </FormFieldDescription>
            )}
            {dialog.input?.error && (
              <FormFieldDescription className="utrecht-form-field__description" id={`${inputID}-error`} invalid>
                {dialog.input?.error}
              </FormFieldDescription>
            )}
          </FormField>
        </Dialog>
      )}
    </div>
  );
};
