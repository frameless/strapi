import { Button } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export interface ScrollToTopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.ComponentType<HTMLAttributes<HTMLElement>>;
}

export const scrollToTop = () => {
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotionQuery.matches) {
    // If prefers-reduced-motion is set to reduce, instantly jump to the top
    window.scrollTo(0, 0);
  } else {
    // If not, use smooth scrolling animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const ScrollToTopButton = forwardRef(
  (
    { children, Icon, ...restProps }: PropsWithChildren<ScrollToTopButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <Button
      className={css('utrecht-scroll-to-top-button')}
      appearance="subtle-button"
      onClick={scrollToTop}
      ref={ref}
      {...restProps}
    >
      <span className={css('utrecht-scroll-to-top-button__content')}>{children}</span>
      {Icon && <Icon className={css('utrecht-scroll-to-top-button__icon')} />}
    </Button>
  ),
);

ScrollToTopButton.displayName = 'ScrollToTopButton';
