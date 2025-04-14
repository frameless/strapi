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

export const ProductListPaginationInfo = forwardRef<HTMLLIElement, ProductListPaginationInfoProps>(
  ({ children, ...restProps }, ref) => {
    if (!children) return null;
    return (
      <li ref={ref} className={css('utrecht-product-list__pagination-info')} role="separator" {...restProps}>
        {children}
      </li>
    );
  },
);

ProductListPaginationInfo.displayName = 'ProductListPaginationInfo';

export interface ProductListItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {}

export const ProductListItem = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<ProductListItemProps>, ref: ForwardedRef<HTMLLIElement>) => (
    <li className={css('utrecht-product-list__item')} ref={ref} {...restProps}>
      {children}
    </li>
  ),
);

ProductListItem.displayName = 'ProductListItem';
