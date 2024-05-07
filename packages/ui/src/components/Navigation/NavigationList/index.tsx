import classnames from 'classnames/bind';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import { FocusEvent } from 'react';
import styles from './index.module.scss';
import { NavigationItem } from '../NavigationItem';
import { NavigationLink } from '../NavigationLink';
import { NavigationListType } from '../index';

interface NavigationListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  list: NavigationListType[];
  mobile?: boolean;
  sideNav?: boolean;
}

const css = classnames.bind(styles);

export const NavigationList = forwardRef(
  ({ list, mobile, sideNav, children, ...restProps }: PropsWithChildren<NavigationListProps>) => {
    const navListRef = useRef<HTMLUListElement>(null);
    const navLinkRef = useRef<HTMLAnchorElement>(null);

    // focus on first link in list when list is focused
    const onNavListLinkFocusHandler = (event: FocusEvent<HTMLUListElement, Element>) => {
      if (event.target !== navListRef.current) return; // ignore bubbling focus event in React

      if (navListRef.current && navLinkRef?.current) {
        navLinkRef.current.focus();
      }
    };

    return (
      <ul
        className={css('utrecht-navigation__list', {
          'utrecht-navigation__list--mobile': mobile,
          'utrecht-navigation__list--side-nav': sideNav,
        })}
        ref={navListRef}
        tabIndex={-1}
        onFocus={onNavListLinkFocusHandler}
        {...restProps}
      >
        {children}

        {Array.isArray(list) &&
          list.map((item, index) => {
            const isTheFirstElement = index === 0;
            return (
              <NavigationItem key={index} mobile={mobile}>
                <NavigationLink
                  mobile={mobile}
                  href={item.href}
                  isCurrent={item.isCurrent}
                  ref={isTheFirstElement ? navLinkRef : null}
                >
                  {item.textContent}
                </NavigationLink>
                {mobile && item.children && item.children.length > 0 && (
                  <NavigationList list={item.children} mobile={mobile} />
                )}
              </NavigationItem>
            );
          })}
      </ul>
    );
  },
);

NavigationList.displayName = 'NavigationList';
