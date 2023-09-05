import React from 'react';
import { Alert, ButtonLink, Paragraph } from '@/components';

type LinkTypes = {
  href: string;
  text: string;
};

interface PreviewAlertProps {
  link: LinkTypes;
  message: string;
}

export const PreviewAlert = ({ link, message }: PreviewAlertProps) => (
  <Alert type="warning">
    <ButtonLink href={link.href}>{link.text}</ButtonLink>
    <Paragraph>{message}</Paragraph>
  </Alert>
);
