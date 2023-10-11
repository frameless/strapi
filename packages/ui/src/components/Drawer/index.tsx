import classnames from 'classnames/bind';
import FocusTrap from 'focus-trap-react';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './index.module.scss';
interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  onDrawerClose: () => void;
  open: boolean;
  initialFocus?: string | false;
}

const css = classnames.bind(styles);

export const Drawer = forwardRef(
  (
    { children, open, initialFocus = false, ...restProps }: PropsWithChildren<DrawerProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const focusTrapOptions = {
      checkCanFocusTrap: (trapContainers: Element[]) => {
        const results = trapContainers.map((trapContainer) => {
          return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
              if (getComputedStyle(trapContainer).opacity !== '0') {
                resolve();
                clearInterval(interval);
              }
            }, 10);
          });
        });
        // Return a promise that resolves when all the trap containers are able to receive focus
        return Promise.all(results);
      },
      initialFocus,
    } as any;
    return (
      <FocusTrap active={open} focusTrapOptions={focusTrapOptions}>
        <div className={css('utrecht-drawer-custom', restProps.className)} ref={ref} {...restProps}>
          {children}
        </div>
      </FocusTrap>
    );
  },
);

Drawer.displayName = 'Drawer';
