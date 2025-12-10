import type { ModalDialogProps } from '@frameless/ui';
import {
  ModalDialog,
  ModalDialogBody,
  ModalDialogCloseButton,
  ModalDialogFooter,
  ModalDialogHeader,
} from '@frameless/ui';
import { Button, ButtonGroup, Heading } from '@utrecht/component-library-react';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';

interface ActionButton {
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface DialogProps extends Omit<ModalDialogProps, 'children' | 'title'> {
  children?: ReactNode;
  title?: ReactNode;
  closeButton?: ActionButton;
  startAction?: ActionButton;
  endAction?: ActionButton;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, closeButton, endAction, startAction, title, ...restProps }, ref: ForwardedRef<HTMLDialogElement>) => (
    <ModalDialog ref={ref} {...restProps}>
      <ModalDialogHeader>
        {title && <Heading level={1}>{title}</Heading>}
        <ModalDialogCloseButton onClick={closeButton?.onClick}>{closeButton?.label}</ModalDialogCloseButton>
      </ModalDialogHeader>
      {children && <ModalDialogBody>{children}</ModalDialogBody>}
      <ModalDialogFooter>
        <ButtonGroup>
          {startAction && (
            <Button appearance="secondary-action-button" onClick={startAction.onClick} disabled={startAction.disabled}>
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
  ),
);

Dialog.displayName = 'Dialog';
