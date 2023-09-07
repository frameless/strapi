import classnames from 'classnames/bind';
import React from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className={css('utrecht-main')}>{children}</main>
);
