import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
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
  const { t } = await useTranslation(locale, ['home-page', 'common']);

  // todo: fetch theme data to display homepage cards

  return (
    <>
      <Heading1>{t('h1')}</Heading1>
      <p>
        Wat pakt Toezicht en Handhaving in 2022 allemaal op? En welke resultaten hebben we de afgelopen periode bereikt?
        Op deze website zie je in één oogopslag waarop we ons in 2023 richten, wat we de afgelopen jaren hebben gedaan
        en welke trends we zien. Van de handhaving op afval tot het controleren van bouwplannen en van evenementen tot
        de aanpak van huisjesmelkers.
      </p>
    </>
  );
};

export default Home;
