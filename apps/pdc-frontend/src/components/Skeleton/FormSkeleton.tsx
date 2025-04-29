'use client';

import { LiveText } from '@frameless/ui';
import classnames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './FormSkeleton.module.css';

const css = classnames.bind(styles);

interface FormSkeletonProps {
  inputCount?: number;
  loadingMessage: string;
}

/**
 * FormSkeleton is a loading skeleton component designed to mimic the structure of a form.
 *
 * @param {FormSkeletonProps} props - The props for the FormSkeleton component.
 * @param {number} [props.inputCount=5] - The number of input skeletons to render.
 * @param {string} props.loadingMessage - The message to display while the form is loading.
 */
export const FormSkeleton = ({ inputCount = 5, loadingMessage }: FormSkeletonProps) => (
  <div role="status" aria-busy="true" aria-live="polite" className={css('utrecht-skeleton-form')}>
    {loadingMessage && (
      <LiveText className={css('utrecht-skeleton-form_title-visually-hidden')}>{loadingMessage}</LiveText>
    )}
    <Skeleton className={css('utrecht-skeleton-form__title')} />
    <Skeleton className={css('utrecht-skeleton-form__input')} count={inputCount} />
    <Skeleton className={css('utrecht-skeleton-form__textarea')} />
  </div>
);
