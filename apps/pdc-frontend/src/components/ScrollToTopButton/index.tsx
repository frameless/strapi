'use client';

import classnames from 'classnames/bind';
import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { Button } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface ScrollToTopButtonProps {
  children: React.ReactNode;
}
const getCurrentScroll = () => window.scrollY || document.documentElement.scrollTop;

const scrollToTop = () => {
  const currentScroll = getCurrentScroll();
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (currentScroll > 0) {
    if (reduceMotionQuery.matches) {
      // If prefers-reduced-motion is set to reduce, instantly jump to the top
      window.scrollTo(0, 0);
    } else {
      // If not, use smooth scrolling animation
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentScroll - currentScroll / 8);
    }
  }
};

export const ScrollToTopButton = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<ScrollToTopButtonProps>, ref: ForwardedRef<HTMLButtonElement>) => (
    <div className={css('utrecht-scroll-to-top-button')}>
      <Button
        className={css('utrecht-scroll-to-top-button__button')}
        appearance="subtle-button"
        onClick={scrollToTop}
        ref={ref}
        {...restProps}
      >
        <span className={css('utrecht-scroll-to-top-button__button-content')}>{children}</span>
      </Button>
    </div>
  ),
);

ScrollToTopButton.displayName = 'ScrollToTopButton';
