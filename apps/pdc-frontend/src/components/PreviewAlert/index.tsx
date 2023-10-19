import classnames from 'classnames/bind';
import React from 'react';
import { Alert, Link, Paragraph } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

type LinkTypes = {
  href: string;
  text: string;
};

interface PreviewAlertProps {
  link: LinkTypes;
  message: string;
}

export const PreviewAlert = ({ link, message }: PreviewAlertProps) => (
  <Alert type="warning" className={css('utrecht-preview-mode')}>
    <Paragraph>
      {message} <Link href={link.href}>{link.text}</Link>
    </Paragraph>
  </Alert>
);
