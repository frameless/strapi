import classnames from 'classnames/bind';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, DialogHTMLAttributes, ForwardedRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface ModalDialogProps
  extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> {}
export const ModalDialog = forwardRef(
  (
    { children, className, ...restProps }: PropsWithChildren<ModalDialogProps>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => (
    <dialog className={css(className, 'utrecht-modal-dialog')} ref={ref} {...restProps}>
      {children}
    </dialog>
  ),
);

ModalDialog.displayName = 'ModalDialog';
