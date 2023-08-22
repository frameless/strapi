'use client';

import { Button, Heading1, Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/client';
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
  const { t } = useTranslation(locale, 'server-error');
  return (
    <>
      <Heading1>{t('common.title')}</Heading1>
      {process.env.NODE_ENV === 'production' && <Paragraph>{t('common.body')}</Paragraph>}
      <Paragraph>{process.env.NODE_ENV === 'development' && errorMessage?.message}</Paragraph>
      <Paragraph />
      <Button appearance="secondary-action-button" onClick={() => reset()}>
        {t('actions.try-again')}
      </Button>
    </>
  );
}
