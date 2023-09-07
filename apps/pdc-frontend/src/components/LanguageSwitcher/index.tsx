'use client';

import classnames from 'classnames/bind';
import Link from 'next/link';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './index.module.scss';

type T = keyof typeof mappedLocales;
const mappedLocales = { nl: 'Netherlands', en: 'English' };
type LanguageSwitcherItemsType = { pathname: string; locale: string };

interface LanguageSwitcherProps {
  items: LanguageSwitcherItemsType[];
  currentLocale: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const css = classnames.bind(styles);

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ items, currentLocale, loading, onClick }) => (
  <div className={css('utrecht-language-switcher')}>
    {items &&
      items
        .sort((a, b) => a.locale.localeCompare(b.locale))
        .map(({ locale, pathname }) =>
          loading ? (
            <LanguageSwitcherSkeleton key={locale} />
          ) : (
            <span key={locale} className={css('utrecht-language-switcher__item')}>
              <Link
                href={pathname}
                locale={locale}
                onClick={onClick}
                className={css('utrecht-language-switcher__link', 'utrecht-link', {
                  'utrecht-language-switcher__link--current': locale === currentLocale,
                })}
                hrefLang={locale}
                lang={locale}
                rel={locale !== currentLocale ? 'alternate' : ''}
                title={mappedLocales[locale as T]}
              >
                {locale.toUpperCase()}
              </Link>
            </span>
          ),
        )}
  </div>
);

export const LanguageSwitcherSkeleton = () => (
  <div className={css('utrecht-language-switcher__skeleton')}>
    <Skeleton
      containerClassName={css('utrecht-language-switcher__skeleton-container')}
      duration={1000}
      height="100%"
      className={css('utrecht-language-switcher__skeleton-body')}
    />
  </div>
);
