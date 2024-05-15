'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { forwardRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Breadcrumbs, Button, Heading, Paragraph } from '@/components';
import { useTranslation } from '../../i18n/client';
import { fallbackLng } from '../../i18n/settings';
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

interface ErrorPageContentProps {
  title?: string;
  message?: string;
}

const ErrorPageContent = forwardRef(({ title, message }: PropsWithChildren<ErrorPageContentProps>) => (
  <>
    {title && <Heading level={1}>{title}</Heading>}
    {message && <Paragraph>{message}</Paragraph>}
  </>
));

ErrorPageContent.displayName = 'ErrorPageContent';

export default function Error({ error, reset }: ErrorPageProps) {
  const { locale } = useParams();
  const { t } = useTranslation((locale as string) || fallbackLng, 'server-error');
  const [errorMessage, setErrorMessage] = useState<Error>();
  const isProduction = process.env.NODE_ENV === 'production';
  useEffect(() => {
    setErrorMessage(error);
  }, [error, isProduction]);
  return (
    <>
      <Breadcrumbs
        label={
          t('components.breadcrumbs.ariaLabel', {
            defaultValue: 'Kruimelpad',
          }) as string
        }
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: '/',
            label: t('components.breadcrumbs.label.online-loket'),
            current: true,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.online-loket'),
          current: false,
        }}
        Link={Link}
      />
      <main id="main">
        <ErrorPageContent
          title={t('common.title') as string}
          message={isProduction ? (t('common.body') as string) : errorMessage?.message}
        />
        <Button appearance="secondary-action-button" onClick={() => reset()}>
          {t('actions.try-again')}
        </Button>
      </main>
    </>
  );
}
