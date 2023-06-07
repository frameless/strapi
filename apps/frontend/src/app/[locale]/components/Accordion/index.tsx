'use client';
import { Button, Heading3 } from '@utrecht/component-library-react';
import classnames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './index.module.css';

export interface AccordionProps {
  label?: string;
  body?: any;
  locale?: string;
}

const cx = classnames.bind(styles);

export const Accordion: React.FC<AccordionProps> = ({ label, body, locale }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={cx('utrecht-accordion')}>
      <Heading3 className={cx('utrecht-accordion__label')}>
        <Button
          dir={locale}
          className={cx('utrecht-accordion__button')}
          appearance="subtle-button"
          aria-expanded={expanded}
          aria-controls={`sect-${label}`}
          id={`${label}-id`}
          onClick={() => setExpanded(!expanded)}
        >
          {label}
        </Button>
      </Heading3>
      {expanded && (
        <div
          id={`sect-${label}`}
          role="region"
          aria-labelledby={`${label}-id`}
          className={cx('utrecht-accordion__body')}
        >
          {body}
        </div>
      )}
    </div>
  );
};
