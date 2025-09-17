import { Drawer } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import FocusTrap from 'focus-trap-react';
import type { ForwardedRef, HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { NavigationList } from './NavigationList';
import { NavToggleButton } from './NavigationToggleButton';
import styles from './index.module.scss';
import { useClickOutside, useScreenSize } from '../../hooks';
import { useLockBody } from '../../hooks/useLockBody';
const css = classnames.bind(styles);

export type NavigationListType = {
  textContent: string;
  href: string;
  isCurrent?: boolean;
  children?: NavigationListType[];
};

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  list: NavigationListType[];
  targetId?: string;
  mobileBreakpoint: number;
  toggleButton?: {
    openText?: string;
    closeText?: string;
  };
}

export const Navigation = forwardRef(
  (
    { list, mobileBreakpoint, toggleButton, targetId, ...restProps }: PropsWithChildren<NavigationProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const screenSize = useScreenSize();
    const [visible, setVisible] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const navigationListRef = useRef<HTMLUListElement | null>(null);
    const drawerRef = useRef<HTMLDialogElement | null>(null);
    const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

    const showModal = () => {
      if (drawerRef.current) {
        if (drawerRef.current.open) {
          drawerRef.current.close();
          setDrawerVisible(false);
        } else {
          setDrawerVisible(true);
          drawerRef.current.showModal();
        }
      }
    };
    useClickOutside(drawerRef, showModal);
    useLayoutEffect(() => {
      if (mobileBreakpoint && screenSize) {
        setVisible(screenSize < mobileBreakpoint);
      }
    }, [screenSize, mobileBreakpoint]);

    useLockBody({
      elementRef: navigationListRef,
      visible: drawerVisible && visible,
    });
    useLayoutEffect(() => {
      if (!visible && drawerRef?.current) {
        setDrawerVisible(false);
        drawerRef.current.close();
      }
    }, [visible, drawerRef.current]);

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
          ref={ref}
          {...restProps}
        >
          {!visible ? (
            <NavigationList id={targetId} list={list} mobile={visible} />
          ) : (
            <NavToggleButton
              id={targetId}
              text={toggleButton?.openText}
              icon="hamburger"
              ref={hamburgerButtonRef}
              className={css({ 'utrecht-navigation__toggle-button--start-end': !drawerVisible })}
              aria-expanded={drawerVisible}
              onClick={showModal}
            />
          )}
        </nav>
        <FocusTrap
          active={drawerVisible}
          focusTrapOptions={{
            escapeDeactivates: () => {
              showModal();
              return true;
            },
          }}
        >
          <Drawer align="inline-end" className={css('utrecht-drawer--nav')} ref={drawerRef}>
            <nav
              className={css('utrecht-navigation', {
                'utrecht-navigation--mobile': visible,
              })}
              ref={ref}
              {...restProps}
            >
              <NavigationList list={list} mobile={visible} ref={navigationListRef}>
                <NavToggleButton
                  text={toggleButton?.closeText}
                  id="nav-toggle-button-close"
                  icon="close"
                  aria-expanded={drawerVisible}
                  onClick={showModal}
                />
              </NavigationList>
            </nav>
          </Drawer>
        </FocusTrap>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
