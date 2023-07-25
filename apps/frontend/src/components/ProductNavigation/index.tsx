'use client';

import { Button } from '@utrecht/component-library-react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const css = classNames.bind(styles);

export const ProductNavigation = ({
  pathname,
  component,
  currentLetter,
  alphabet,
}: {
  pathname?: string;
  component: 'link' | 'button';
  currentLetter?: string;
  alphabet: { letter: string; availability: boolean }[];
}) => {
  const { push } = useRouter();
  const handleLetterClick = (letter: string) => {
    push(letter.toLocaleLowerCase());
  };

  switch (component) {
    case 'button':
      return (
        <div className={css('utrecht-products-navigation')}>
          {alphabet.map(({ letter, availability }) => {
            return (
              <Button
                key={letter}
                appearance={currentLetter === letter ? 'primary-action-button' : 'subtle-button'} // Todo make a specific active CSS class
                disabled={!availability}
                onClick={() => handleLetterClick(letter)}
                aria-pressed={currentLetter === letter}
                style={{ fontWeight: currentLetter === letter ? 'bold' : 'normal' }}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      );
    case 'link':
      return (
        <div className={css('utrecht-products-navigation')}>
          {alphabet.map(({ letter, availability }) => (
            <Link
              href={`${pathname ? `${pathname}/` : ''}${letter.toLocaleLowerCase()}`}
              className={css('utrecht-button', 'utrecht-button--subtle', { 'utrecht-button--disabled': !availability })}
              style={{ pointerEvents: availability ? 'auto' : 'none' }}
              tabIndex={availability ? 0 : -1}
              key={letter}
              onClick={() => handleLetterClick(letter)}
              aria-pressed={currentLetter === letter}
              aria-disabled={!availability}
            >
              {letter}
            </Link>
          ))}
        </div>
      );
    default:
      return <></>;
  }
};
