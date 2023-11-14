import { Metadata } from 'next';
import React from 'react';
import { useTranslation } from '../i18n';

export interface Fields {
  title: string;
  body: string;
}

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'home-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}

const Home = async ({ params: { locale } }: { params: any }) => {
  const { t } = await useTranslation(locale, 'home-page');
  return (
    <div>
      <h1>{t('h1')}</h1>
    </div>
  );
};

export default Home;
