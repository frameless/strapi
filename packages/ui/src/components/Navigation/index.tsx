import classnames from 'classnames/bind';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { NavigationList } from './NavigationList';
import { NavToggleButton } from './NavigationToggleButton';
import styles from './index.module.scss';
import { useClickOutside, useKeyboardEvent, useScreenSize } from '../../hooks';
import { Drawer } from '../Drawer';
import { Portal } from '../Portal';
const css = classnames.bind(styles);

export type NavigationListType = {
  textContent: string;
  href: string;
  children?: NavigationListType[];
};

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  list: NavigationListType[];
  mobileBreakpoint: number;
  toggleButton?: {
    openText?: string;
    closeText?: string;
  };
}

export const Navigation = forwardRef(
  (
    { list, mobileBreakpoint, toggleButton, ...restProps }: PropsWithChildren<NavigationProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const screenSize = useScreenSize();
    const [visible, setVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const navigationListRef = useRef<HTMLUListElement>(null);
    useKeyboardEvent('Escape', () => setDrawerVisible(false));
    useClickOutside(navigationListRef, () => setDrawerVisible(false));

    useEffect(() => {
      if (mobileBreakpoint && screenSize) {
        setVisible(screenSize < mobileBreakpoint);
      }
    }, [screenSize, mobileBreakpoint]);

    useEffect(() => {
      // TODO improve the scroll body lock when the menu is open
      // this is one of the packages that maybe fix the issue https://github.com/willmcpo/body-scroll-lock#readme
      if (drawerVisible && visible) {
        if (typeof window === 'undefined') return () => {};
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        document.body.style.overflow = 'hidden';
        if (navigationListRef.current) {
          navigationListRef.current.style.overflow = 'auto';
        }
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        if (drawerVisible && visible) {
          document.body.style.overflow = 'auto';
        }
      };
    }, [visible, drawerVisible]);

    return (
      <>
        <nav
          className={css(
            'utrecht-navigation',
            {
              'utrecht-navigation--mobile': visible,
            },
            restProps.className,
          )}
          id="menu"
          ref={ref}
          {...restProps}
        >
          {!visible ? (
            <NavigationList list={list} mobile={visible} />
          ) : !drawerVisible ? (
            <NavToggleButton
              text={toggleButton?.openText}
              icon="hamburger"
              aria-expanded={visible}
              aria-label="Open menu"
              onClick={() => setDrawerVisible(!drawerVisible)}
            />
          ) : null}
        </nav>
        {visible && drawerVisible && (
          <Portal>
            <Drawer onDrawerClose={() => setDrawerVisible(!drawerVisible)} open={drawerVisible}>
              <nav
                className={css('utrecht-navigation', {
                  'utrecht-navigation--mobile': visible,
                })}
                id="menu"
                ref={ref}
                {...restProps}
              >
                <NavigationList list={list} mobile={visible} ref={navigationListRef}>
                  <NavToggleButton
                    text={toggleButton?.closeText}
                    icon="close"
                    aria-expanded={visible}
                    aria-label="Close menu"
                    onClick={() => setDrawerVisible(!drawerVisible)}
                  />
                </NavigationList>
              </nav>
            </Drawer>
          </Portal>
        )}
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
