import { createStrapiURL } from '@frameless/pdc-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/pdc-frontend/src/util/fetchData';
import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import { Markdown } from '@/components/Markdown';
import { GET_HOME_PAGE } from '@/query';
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
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOME_PAGE,
    variables: { locale: locale },
  });

  const { Title, Content } = data.homepage.data.attributes;

  return (
    <>
      <Heading1>{Title}</Heading1>
      <Markdown>{Content}</Markdown>
    </>
  );
};

export default Home;
