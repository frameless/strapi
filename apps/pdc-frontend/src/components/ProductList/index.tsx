'use client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './index.module.scss';
import { Markdown } from '../index';

const cx = classNames.bind(styles);

export const ProductsList = ({ children }: { children: ReactNode }) => {
  return <ul className={cx('utrecht-product-list')}>{children}</ul>;
};

export const ProductListPaginationInfo = ({ paginationTitle }: { paginationTitle: string }) =>
  paginationTitle ? (
    <li
      ref={(ref) => {
        if (ref) {
          ref.tabIndex = 0;
          ref?.focus();
        }
      }}
      className={cx('utrecht-product-list__pagination-info')}
      role="separator"
    >
      {paginationTitle}
    </li>
  ) : null;

export const ProductListItem = ({
  href,
  text,
  locale,
  body,
}: {
  href: string;
  text: string;
  locale: string;
  body?: string;
}) => {
  return (
    <li className={cx('utrecht-product-list__item')}>
      <Link className="utrecht-link" href={href} locale={locale} dangerouslySetInnerHTML={{ __html: text }} />
      {body && <Markdown>{body}</Markdown>}
    </li>
  );
};
