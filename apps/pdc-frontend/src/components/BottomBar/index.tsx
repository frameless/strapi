import classnames from 'classnames/bind';
import React from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export const BottomBar = ({ children }: { children: React.ReactNode }) => (
  <div className={css('utrecht-bottom-bar')}>{children}</div>
);
export const BottomBarItem = ({ children }: { children: React.ReactNode }) => (
  <div className={css('utrecht-bottom-bar__item')}>{children}</div>
);
