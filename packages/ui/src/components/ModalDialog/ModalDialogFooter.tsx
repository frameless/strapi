import classnames from 'classnames/bind';
import type { DetailedHTMLProps, DialogHTMLAttributes, ForwardedRef, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export interface ModalDialogFooterProps
  extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ModalDialogFooter = forwardRef(
  (
    { children, className, ...restProps }: PropsWithChildren<ModalDialogFooterProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div className={css(className, 'utrecht-modal-dialog__footer')} ref={ref} {...restProps}>
      {children}
    </div>
  ),
);
ModalDialogFooter.displayName = 'ModalDialogFooter';
