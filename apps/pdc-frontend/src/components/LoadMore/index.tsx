'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Button } from '@/components';
import styles from './index.module.scss';
interface LoadMoreProps {
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (pageIndex: number) => Promise<void>;
  locale: string;
  busy?: boolean;
}

const cx = classNames.bind(styles);
export const LoadMore = ({ disabled, busy, onClick, locale }: LoadMoreProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { t } = useTranslation(locale, ['load-more-button']);
  return (
    <div className={cx('utrecht-load-more')}>
      <Button
        onClick={() => {
          setPageIndex((prevPageIndex) => prevPageIndex + 1);
          onClick(pageIndex);
        }}
        disabled={disabled}
        busy={busy}
        type="button"
        appearance="secondary-action-button"
      >
        {t('load-more')}
      </Button>
    </div>
  );
};
