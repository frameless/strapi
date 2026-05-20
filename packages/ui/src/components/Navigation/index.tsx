import { Drawer } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import FocusTrap from 'focus-trap-react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useRef, useState } from 'react';

import { useClickOutside } from '../../hooks';
import { useLockBody } from '../../hooks/useLockBody';

import { NavigationList } from './NavigationList';
import { NavToggleButton } from './NavigationToggleButton';
import styles from './index.module.scss';
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
  toggleButton?: {
    openText?: string;
    closeText?: string;
  };
}

export const Navigation = ({ list, toggleButton, targetId, ...restProps }: PropsWithChildren<NavigationProps>) => {
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

  useLockBody({
    elementRef: navigationListRef,
    visible: drawerVisible,
  });

  return (
    <>
      <nav className={css('utrecht-navigation', restProps.className)} {...restProps}>
        <div className={css('utrecht-navigation__desktop-list')}>
          <NavigationList id={targetId} list={list} mobile={false} />
        </div>
        <div className={css('utrecht-navigation__mobile-toggle')}>
          <NavToggleButton
            text={toggleButton?.openText}
            icon="hamburger"
            ref={hamburgerButtonRef}
            className={!drawerVisible ? 'utrecht-navigation__toggle-button--start-end' : undefined}
            aria-expanded={drawerVisible}
            onClick={showModal}
          />
        </div>
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
          <nav className={css('utrecht-navigation', 'utrecht-navigation--mobile')} {...restProps}>
            <NavigationList list={list} mobile ref={navigationListRef}>
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
};

Navigation.displayName = 'Navigation';
