import { Drawer } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import {
  createRef,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { NavigationList } from './NavigationList';
import { NavToggleButton } from './NavigationToggleButton';
import styles from './index.module.scss';
import { useClickOutside, useScreenSize } from '../../hooks';
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
    const navigationListRef = createRef<HTMLUListElement>();
    const drawerRef = useRef<HTMLDialogElement>(null);
    const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

    useClickOutside(drawerRef, hamburgerButtonRef);

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

    useLayoutEffect(() => {
      if (mobileBreakpoint && screenSize) {
        setVisible(screenSize < mobileBreakpoint);
      }
    }, [screenSize, mobileBreakpoint]);

    useLayoutEffect(() => {
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

    useLayoutEffect(() => {
      if (!visible && drawerRef.current) {
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
              aria-expanded={drawerVisible}
              onClick={showModal}
            />
          )}
        </nav>
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
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
