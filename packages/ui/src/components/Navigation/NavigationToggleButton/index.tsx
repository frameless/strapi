import { Button, ButtonGroup } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { NavigationIcon } from '../NavigationIcon';

interface NavToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: 'hamburger' | 'close';
  text?: string;
}

const css = classnames.bind(styles);

export const NavToggleButton = forwardRef(
  ({ icon, text, ...restProps }: PropsWithChildren<NavToggleButtonProps>, ref: ForwardedRef<HTMLButtonElement>) => (
    <ButtonGroup className={css('utrecht-navigation__toggle-button')}>
      <Button appearance="subtle-button" ref={ref} aria-haspopup="menu" aria-controls="menu" {...restProps}>
        <NavigationIcon name={icon} aria-hidden="true" />
        {text}
      </Button>
    </ButtonGroup>
  ),
);

NavToggleButton.displayName = 'NavToggleButton';
