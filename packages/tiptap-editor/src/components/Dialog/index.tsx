import {
  ModalDialog,
  ModalDialogBody,
  ModalDialogCloseButton,
  ModalDialogFooter,
  ModalDialogHeader,
  ModalDialogProps,
} from '@frameless/ui';
import { Button, ButtonGroup, Heading } from '@utrecht/component-library-react';
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';

type ButtonType = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
};

interface DialogProps extends Omit<ModalDialogProps, 'ref'> {
  title?: string;
  closeButton?: Omit<ButtonType, 'disabled'>;
  startAction: ButtonType;
  endAction: ButtonType;
}

export const Dialog = forwardRef(
  (
    { children, closeButton, endAction, startAction, title, ...restProps }: PropsWithChildren<DialogProps>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
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
              <Button appearance="primary-action-button" onClick={startAction.onClick} disabled={startAction.disabled}>
                {startAction.label}
              </Button>
            )}
            {endAction && (
              <Button appearance="secondary-action-button" onClick={endAction.onClick} disabled={endAction.disabled}>
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
