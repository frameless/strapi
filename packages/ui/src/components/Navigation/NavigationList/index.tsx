import classnames from 'classnames/bind';
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { NavigationItem } from '../NavigationItem';
import { NavigationLink } from '../NavigationLink';

type NavigationListType = {
  title: string;
  link: string;
};

interface NavigationListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  list: NavigationListType[];
  mobile?: boolean;
}

const css = classnames.bind(styles);

export const NavigationList = forwardRef(
  (
    { list, mobile, children, ...restProps }: PropsWithChildren<NavigationListProps>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => (
    <ul
      className={css('utrecht-navigation__list', {
        'utrecht-navigation__list--mobile': mobile,
      })}
      ref={ref}
      {...restProps}
    >
      {children}

      {list &&
        list.length > 0 &&
        list.map((item, index) => (
          <NavigationItem key={index} mobile={mobile}>
            <NavigationLink mobile={mobile} href={item.link}>
              {item.title}
            </NavigationLink>
          </NavigationItem>
        ))}
    </ul>
  ),
);

NavigationList.displayName = 'NavigationList';
