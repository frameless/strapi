import { Link as UtrechtLink } from '@utrecht/component-library-react';
import { UtrechtIconArrow, UtrechtIconChevronLeft } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import React, { ComponentType, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface AdvancedLinkProps extends React.ComponentProps<typeof UtrechtLink> {
  color?: 'red';
  icon?: 'arrow' | 'chevronLeft';
  Link?: ComponentType<any>;
}

const mappedIcons = {
  arrow: UtrechtIconArrow,
  chevronLeft: UtrechtIconChevronLeft,
};

export const AdvancedLink = forwardRef(
  (
    { href, children, icon, color, Link = UtrechtLink, ...restProps }: PropsWithChildren<AdvancedLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const Icon = mappedIcons[icon as keyof typeof mappedIcons];
    const DefaultLinkComponent = Link;
    const LinkComponent = Link || DefaultLinkComponent;

    return (
      <LinkComponent
        ref={ref}
        className={css('utrecht-advanced-link', {
          'utrecht-advanced-link--with-icon': icon,
          'utrecht-advanced-link--color-red': color === 'red',
        })}
        href={href}
        {...restProps}
      >
        {icon && <Icon className={css('utrecht-advanced-link__icon')} />}
        {children}
      </LinkComponent>
    );
  },
);

AdvancedLink.displayName = 'AdvancedLink';
