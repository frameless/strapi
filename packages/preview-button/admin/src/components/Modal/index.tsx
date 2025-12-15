import {
  ModalDialog,
  ModalDialogBody,
  ModalDialogCloseButton,
  ModalDialogFooter,
  ModalDialogHeader,
} from '@frameless/ui';
import { Button, ButtonGroup, Heading } from '@utrecht/component-library-react';
import { forwardRef, ReactNode } from 'react';

export interface ActionButton {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DialogProps {
  children?: ReactNode;
  closeButton?: ActionButton;
  endAction?: ActionButton;
  startAction?: ActionButton;
  title?: string;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, closeButton, endAction, startAction, title, ...restProps }, ref) => {
    return (
      <ModalDialog ref={ref} {...restProps}>
        <ModalDialogHeader>
          {title && <Heading level={1}>{title}</Heading>}
          <ModalDialogCloseButton onClick={closeButton?.onClick}>{closeButton?.label}</ModalDialogCloseButton>
        </ModalDialogHeader>
        {children && <ModalDialogBody>{children}</ModalDialogBody>}
        <ModalDialogFooter>
          <ButtonGroup>
            {startAction && (
              <Button
                appearance="secondary-action-button"
                onClick={startAction.onClick}
                disabled={startAction.disabled}
              >
                {startAction.label}
              </Button>
            )}
            {endAction && (
              <Button appearance="primary-action-button" onClick={endAction.onClick} disabled={endAction.disabled}>
                {endAction.label}
              </Button>
            )}
          </ButtonGroup>
        </ModalDialogFooter>
      </ModalDialog>
    );
  },
);
Dialog.displayName = 'Dialog';
