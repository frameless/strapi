import { Link as UtrechtLink } from '@utrecht/component-library-react';
import type { LinkProps as UtrechtLinkProps } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import React, { ComponentType, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './index.module.scss';

type T = keyof typeof mappedLocales;
const mappedLocales = { nl: 'Netherlands', en: 'English' };
type LanguageSwitcherItemsType = { pathname: string; locale: string };

export interface LanguageSwitcherProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onClick'> {
  items: LanguageSwitcherItemsType[];
  currentLocale: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<UtrechtLinkProps>;
  Link?: ComponentType<any>;
}

const css = classnames.bind(styles);

const sortAlphabetical = (items: any[]) => items?.sort((a, b) => a.locale.localeCompare(b.locale));

export const LanguageSwitcher = forwardRef(
  (
    {
      items,
      currentLocale,
      loading,
      onClick,
      Link = UtrechtLink,
      ...restProps
    }: PropsWithChildren<LanguageSwitcherProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div className={css('utrecht-language-switcher')} ref={ref} {...restProps}>
      {items &&
        sortAlphabetical(items)?.map(({ locale, pathname }, index: number) =>
          loading ? (
            <LanguageSwitcherSkeleton key={index} />
          ) : (
            <span key={locale} className={css('utrecht-language-switcher__item')}>
              <Link
                href={pathname}
                onClick={onClick}
                className={css('utrecht-language-switcher__link', 'utrecht-link', 'utrecht-link--html-a', {
                  'utrecht-language-switcher__link--current': locale === currentLocale,
                })}
                hrefLang={locale}
                locale={locale}
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
  ),
);

LanguageSwitcher.displayName = 'LanguageSwitcher';

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
