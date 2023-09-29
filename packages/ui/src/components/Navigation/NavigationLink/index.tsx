import { Link } from '@utrecht/component-library-react/dist/css-module';
import classnames from 'classnames/bind';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'placeholder'> {
  placeholder?: boolean;
  mobile?: boolean;
}

const css = classnames.bind(styles);

export const NavigationLink = forwardRef(
  (
    { children, mobile, ...restProps }: PropsWithChildren<NavigationLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <Link
      className={css('utrecht-navigation__link', {
        'utrecht-navigation__link--mobile': mobile,
      })}
      ref={ref}
      {...restProps}
    >
      {children}
    </Link>
  ),
);

NavigationLink.displayName = 'NavigationLink';
