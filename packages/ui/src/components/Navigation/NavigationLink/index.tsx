import { Link } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react';
import styles from './index.module.scss';

interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'placeholder'> {
  placeholder?: boolean;
  mobile?: boolean;
  isCurrent?: boolean;
  marker?: ReactNode;
}

const css = classnames.bind(styles);

export const NavigationLink = forwardRef(
  (
    { children, mobile, marker, isCurrent, ...restProps }: PropsWithChildren<NavigationLinkProps>,
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
      {marker}
      {children}
    </Link>
  ),
);

NavigationLink.displayName = 'NavigationLink';
