import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { FormSkeleton } from './FormSkeleton';

export const DecisionTreeFormSkeleton = () => {
  const { locale } = useParams();
  const { t } = useTranslation(locale as string, ['product-page']);
  return <FormSkeleton loadingMessage={t('loadingDecisionForm')} />;
};
