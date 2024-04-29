import { Button, ButtonGroup } from '@utrecht/component-library-react';
import classNames from 'classnames/bind';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useState } from 'react';
import styles from './index.module.scss';

export interface LoadMoreButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onLoadMoreClick: (pageIndex: number) => Promise<void>;
  locale: string;
  busy?: boolean;
  initialPageIndex?: number;
}

const css = classNames.bind(styles);

export const LoadMoreButton = forwardRef(
  (
    { busy, onLoadMoreClick, initialPageIndex = 1, children, ...restProps }: PropsWithChildren<LoadMoreButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [pageIndex, setPageIndex] = useState(initialPageIndex);

    return (
      <ButtonGroup className={css('utrecht-load-more-button')}>
        <Button
          ref={ref}
          onClick={() => {
            setPageIndex((prevPageIndex) => prevPageIndex + 1);
            onLoadMoreClick(pageIndex);
          }}
          busy={busy}
          type="button"
          appearance="primary-action-button"
          {...restProps}
        >
          {children}
        </Button>
      </ButtonGroup>
    );
  },
);
LoadMoreButton.displayName = 'LoadMoreButton';
