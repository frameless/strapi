import classnames from 'classnames/bind';
import type { DetailedHTMLProps, DialogHTMLAttributes, ForwardedRef, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export interface ModalDialogBodyProps extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalDialogBody = forwardRef(
  (
    { children, className, ...restProps }: PropsWithChildren<ModalDialogBodyProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div className={css(className, 'utrecht-modal-dialog__body')} ref={ref} {...restProps}>
      {children}
    </div>
  ),
);
ModalDialogBody.displayName = 'ModalDialogBody';
