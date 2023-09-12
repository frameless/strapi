import classnames from 'classnames/bind';
import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface MainProps extends React.HTMLAttributes<HTMLElement> {}

export const Main = ({ children, ...restProps }: PropsWithChildren<MainProps>) => (
  <main className={css('utrecht-main')} {...restProps}>
    {children}
  </main>
);
