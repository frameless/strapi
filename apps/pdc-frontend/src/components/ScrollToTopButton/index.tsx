'use client';

import classnames from 'classnames/bind';
import React from 'react';
import { Button } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface ScrollToTopButtonProps {
  children: React.ReactNode;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ children }) => {
  const getCurrentScroll = () => window.scrollY || document.documentElement.scrollTop;
  const scrollToTop = () => {
    const currenScroll = getCurrentScroll();
    if (currenScroll > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currenScroll - currenScroll / 8);
    }
  };

  return (
    <div className={css('utrecht-scroll-to-top-button')}>
      <Button className={css('utrecht-scroll-to-top-button__button')} appearance="subtle-button" onClick={scrollToTop}>
        <span className={css('utrecht-scroll-to-top-button__button-content')}>{children}</span>
      </Button>
    </div>
  );
};
