import { Button, ButtonGroup } from '@utrecht/component-library-react';
import { UtrechtIconCross, UtrechtIconHamburgerMenu } from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';

interface NavToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: 'hamburger' | 'close';
  text?: string;
}

const css = classnames.bind(styles);

export const NavToggleButton = forwardRef(
  (
    { icon, text, className, ...restProps }: PropsWithChildren<NavToggleButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <ButtonGroup className={css('utrecht-navigation__toggle-button', className)}>
        <Button
          className={css({ 'utrecht-navigation__toggle-button-close': icon === 'close' })}
          appearance="subtle-button"
          ref={ref}
          aria-haspopup="menu"
          aria-controls="menu"
          {...restProps}
        >
          {icon === 'hamburger' ? (
            <UtrechtIconHamburgerMenu class={css('utrecht-icon-custom')} aria-hidden="true" />
          ) : (
            <UtrechtIconCross class={css('utrecht-icon-custom')} aria-hidden="true" />
          )}
          {text}
        </Button>
      </ButtonGroup>
    );
  },
);

NavToggleButton.displayName = 'NavToggleButton';
