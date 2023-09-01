import { createStrapiURL } from '@frameless/pdc-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/pdc-frontend/src/util/fetchData';
import { Heading1, Heading2, Link, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
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

  const { title, content } = data.homepage.data.attributes;
  const themas = data.themas.data;

  return (
    <>
      <Heading1>{title}</Heading1>
      <Markdown>{content}</Markdown>
      <Heading2>Themas</Heading2>
      <UnorderedList>
        {themas &&
          themas.map((thema: any) => {
            const { title, slug } = thema.attributes;
            return (
              <UnorderedListItem key={`thema-${slug}`}>
                <Link href={`/themas/${slug}`}>{title}</Link>
              </UnorderedListItem>
            );
          })}
      </UnorderedList>
    </>
  );
};

export default Home;
