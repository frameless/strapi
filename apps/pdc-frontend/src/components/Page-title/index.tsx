import classnames from 'classnames/bind';
import React, { PropsWithChildren } from 'react';
import { Heading1 } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const PageTitle = ({ children, ...restProps }: PropsWithChildren<PageTitleProps>) => (
  <Heading1 className={css('utrecht-page-title')} {...restProps}>
    {children}
  </Heading1>
);
