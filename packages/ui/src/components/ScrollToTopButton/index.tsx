import { ButtonLink } from '@utrecht/component-library-react';
import classnames from 'classnames';
import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './index.module.css';

const css = classnames.bind(styles);

export interface ScrollToTopButtonProps extends ButtonHTMLAttributes<HTMLAnchorElement> {
  Icon?: React.ComponentType<HTMLAttributes<HTMLElement>>;
}

export const ScrollToTopButton = forwardRef(
  (
    { children, Icon, ...restProps }: PropsWithChildren<ScrollToTopButtonProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <ButtonLink
      className={css('utrecht-scroll-to-top-button')}
      appearance="subtle-button"
      ref={ref}
      href="#top"
      {...restProps}
    >
      <span className={css('utrecht-scroll-to-top-button__content')}>{children}</span>
      {Icon && <Icon className={css('utrecht-scroll-to-top-button__icon')} />}
    </ButtonLink>
  ),
);

ScrollToTopButton.displayName = 'ScrollToTopButton';
