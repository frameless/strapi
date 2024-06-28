import classnames from 'classnames/bind';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);
export interface RichTextProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const RichText = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<RichTextProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div className={css('utrecht-rich-text')} ref={ref} {...restProps}>
      {children}
    </div>
  ),
);

RichText.displayName = 'RichText';
