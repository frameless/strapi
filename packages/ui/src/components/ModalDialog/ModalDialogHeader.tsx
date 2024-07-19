import classnames from 'classnames/bind';
import type { DetailedHTMLProps, DialogHTMLAttributes, ForwardedRef, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);
export interface ModalDialogHeaderProps
  extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalDialogHeader = forwardRef(
  (
    { children, className, ...restProps }: PropsWithChildren<ModalDialogHeaderProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div className={css(className, 'utrecht-modal-dialog__header')} ref={ref} {...restProps}>
      {children}
    </div>
  ),
);
ModalDialogHeader.displayName = 'ModalDialogHeader';
