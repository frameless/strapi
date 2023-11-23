import classNames from 'classnames/bind';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  PropsWithChildren,
} from 'react';
import styles from './index.module.scss';

const css = classNames.bind(styles);

export interface ProductListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {}

export const ProductsList = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<ProductListProps>, ref: ForwardedRef<HTMLUListElement>) => {
    return (
      <ul className={css('utrecht-product-list')} ref={ref} {...restProps}>
        {children}
      </ul>
    );
  },
);

ProductsList.displayName = 'ProductsList';

export interface ProductListPaginationInfoProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export const ProductListPaginationInfo = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<ProductListPaginationInfoProps>) =>
    children ? (
      <li
        ref={(ref) => {
          if (ref) {
            ref.tabIndex = 0;
            ref?.focus();
          }
        }}
        className={css('utrecht-product-list__pagination-info')}
        role="separator"
        {...restProps}
      >
        {children}
      </li>
    ) : null,
);

ProductListPaginationInfo.displayName = 'ProductListPaginationInfo';

export interface ProductListItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export const ProductListItem = forwardRef(({ children, ...restProps }: PropsWithChildren<ProductListItemProps>) => (
  <li className={css('utrecht-product-list__item')} {...restProps}>
    {children}
  </li>
));

ProductListItem.displayName = 'ProductListItem';
