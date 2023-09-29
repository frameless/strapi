import classnames from 'classnames/bind';
import { ForwardedRef, forwardRef, LiHTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface NavigationItemProps extends LiHTMLAttributes<HTMLLIElement> {
  mobile?: boolean;
}
export const NavigationItem = forwardRef(
  ({ children, mobile, ...restProps }: PropsWithChildren<NavigationItemProps>, ref: ForwardedRef<HTMLLIElement>) => (
    <li
      className={css('utrecht-navigation__item', {
        'utrecht-navigation__item--mobile': mobile,
        'utrecht-navigation__item-icon': mobile,
      })}
      ref={ref}
      {...restProps}
    >
      {children}
    </li>
  ),
);

NavigationItem.displayName = 'NavigationItem';
