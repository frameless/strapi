import { useParams } from 'next/navigation';

import { FormSkeleton } from './FormSkeleton';

import { useTranslation } from '@/app/i18n/client';

export const DecisionTreeFormSkeleton = () => {
  const { locale } = useParams();
  const { t } = useTranslation(locale as string, ['product-page']);
  return <FormSkeleton loadingMessage={t('loadingDecisionForm')} />;
};
