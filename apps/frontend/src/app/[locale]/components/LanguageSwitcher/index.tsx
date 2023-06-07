'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Locale } from '@/i18n-config';
import './index.style.css';

type T = keyof typeof mappedLocales;
const mappedLocales = { nl: 'Netherlands', en: 'English' };
type LanguageSwitcherItemsType = { pathname: string; locale: Locale };

interface LanguageSwitcherProps {
  items: LanguageSwitcherItemsType[];
  currentLocale: Locale;
  loading?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ items, currentLocale, loading }) => (
  <div className="utrecht-language-switcher">
    {items &&
      items
        .sort((a, b) => a.locale.localeCompare(b.locale))
        .map(({ locale, pathname }) =>
          loading ? (
            <LanguageSwitcherSkeleton key={locale} />
          ) : (
            <span key={locale} className="utrecht-language-switcher_item">
              <Link
                href={pathname}
                locale={locale}
                className={clsx('utrecht-link', {
                  'utrecht-language-switcher_item--current': locale === currentLocale,
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
  <div className="utrecht-language-switcher__skeleton">
    <Skeleton
      containerClassName="utrecht-language-switcher__skeleton-container"
      duration={1000}
      height="100%"
      className="utrecht-language-switcher__skeleton-body"
    />
  </div>
);
