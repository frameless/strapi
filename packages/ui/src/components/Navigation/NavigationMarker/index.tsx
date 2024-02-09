import classnames from 'classnames/bind';
import { forwardRef, PropsWithChildren, SVGProps } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface NavigationMarkerProps extends SVGProps<SVGSVGElement> {
  isCurrent?: boolean;
  mobile?: boolean;
}

export const NavigationMarker = forwardRef(
  ({ isCurrent, mobile, ...restProps }: PropsWithChildren<NavigationMarkerProps>) =>
    mobile ? (
      <svg
        className={css('utrecht-navigation__marker', {
          'utrecht-navigation__marker--current': isCurrent,
        })}
        viewBox="0 0 100 100"
        width="8"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
        {...restProps}
      >
        <circle cx="50" cy="50" r="50" fill="currentColor" />
      </svg>
    ) : null,
);

NavigationMarker.displayName = 'NavigationMarker';
