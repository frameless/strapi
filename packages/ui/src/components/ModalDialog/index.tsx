import { Heading } from '@utrecht/component-library-react';
import type { ButtonProps } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, DialogHTMLAttributes, ForwardedRef, PropsWithChildren, ReactNode } from 'react';
import { ModalDialogBody } from './ModalDialogBody';
import { ModalDialogCloseButton } from './ModalDialogCloseButton';
import { ModalDialogFooter } from './ModalDialogFooter';
import { ModalDialogHeader } from './ModalDialogHeader';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface ModalDialogProps
  extends DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> {
  footer?: ReactNode;
  header?: {
    title?: string;
    headingLevel?: HeadingLevel;
    closeButton?: Omit<ButtonProps, 'appearance'> & { icon?: ReactNode };
  };
}

export const ModalDialog = forwardRef(
  (
    { header, footer, children, className, ...restProps }: PropsWithChildren<ModalDialogProps>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => (
    <dialog className={css(className, 'utrecht-modal-dialog')} ref={ref} {...restProps}>
      {header && (
        <ModalDialogHeader>
          {header?.title && <Heading level={header?.headingLevel || 1}>{header.title}</Heading>}
          {header?.closeButton && (
            <ModalDialogCloseButton icon={header.closeButton.icon} {...header.closeButton}>
              {header.closeButton.children}
            </ModalDialogCloseButton>
          )}
        </ModalDialogHeader>
      )}
      {children && <ModalDialogBody>{children}</ModalDialogBody>}
      {footer && <ModalDialogFooter>{footer}</ModalDialogFooter>}
    </dialog>
  ),
);

ModalDialog.displayName = 'ModalDialog';
