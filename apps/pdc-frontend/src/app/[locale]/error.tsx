'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Heading, Paragraph } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { useTranslation } from '../i18n/client';
import { fallbackLng } from '../i18n/settings';
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const [errorMessage, setErrorMessage] = useState<Error>();

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);
  const { locale } = useParams();
  const { t } = useTranslation((locale as string) || fallbackLng, 'server-error');
  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: true,
          },
        ]}
      />
      <Heading level={1}>{t('common.title')}</Heading>
      {process.env.NODE_ENV === 'production' && <Paragraph>{t('common.body')}</Paragraph>}
      <Paragraph>{process.env.NODE_ENV === 'development' && errorMessage?.message}</Paragraph>
      <Paragraph />
      <Button appearance="secondary-action-button" onClick={() => reset()}>
        {t('actions.try-again')}
      </Button>
    </>
  );
}
