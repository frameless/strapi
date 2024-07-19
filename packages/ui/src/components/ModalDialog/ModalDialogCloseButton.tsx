import { Button } from '@utrecht/component-library-react';
import type { ButtonProps } from '@utrecht/component-library-react';
import { UtrechtIconClose } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export interface ModalDialogCloseButtonProps extends Omit<ButtonProps, 'appearance'> {
  icon?: ReactNode;
}
export const ModalDialogCloseButton = forwardRef(
  ({ children, className, icon, ...restProps }: ModalDialogCloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <Button
      appearance="subtle-button"
      className={css(className, 'utrecht-modal-dialog__close-button')}
      ref={ref}
      {...restProps}
    >
      {icon ?? <UtrechtIconClose role="presentation" />} {children}
    </Button>
  ),
);
ModalDialogCloseButton.displayName = 'ModalDialogCloseButton';
