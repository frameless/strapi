import Tippy from '@tippyjs/react';
import { Button, ButtonProps } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import { ForwardedRef, forwardRef, type ReactNode } from 'react';
import styles from './styles.module.scss';

const css = classnames.bind(styles);

interface ToolbarItemProps extends ButtonProps {
  isActive?: boolean;
  icon?: ReactNode;
  label: string;
}

export const ToolbarItem = forwardRef(
  ({ icon, isActive, label, ...restProps }: ToolbarItemProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <Tippy content={label}>
      <Button ref={ref} appearance={isActive ? 'primary-action-button' : 'secondary-action-button'} {...restProps}>
        {icon && <div className={css('utrecht-tiptap-toolbar__icon')}>{icon}</div>}
      </Button>
    </Tippy>
  ),
);

ToolbarItem.displayName = 'ToolbarItem';
