import { Link } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { NavigationMarker } from '../NavigationMarker';

interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'placeholder'> {
  placeholder?: boolean;
  mobile?: boolean;
  isCurrent?: boolean;
}

const css = classnames.bind(styles);

export const NavigationLink = forwardRef(
  (
    { children, mobile, isCurrent, ...restProps }: PropsWithChildren<NavigationLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      aria-current={isCurrent ? 'page' : 'false'}
      className={css('utrecht-navigation__link', {
        'utrecht-navigation__link--mobile': mobile,
        'utrecht-navigation__link--is-current': isCurrent,
      })}
      ref={ref}
      {...restProps}
    >
      <NavigationMarker isCurrent={isCurrent} mobile={mobile} />
      {children}
    </Link>
  ),
);

NavigationLink.displayName = 'NavigationLink';
