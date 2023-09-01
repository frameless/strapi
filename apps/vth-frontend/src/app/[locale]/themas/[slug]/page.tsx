import { createStrapiURL } from '@frameless/pdc-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/pdc-frontend/src/util/fetchData';
import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Markdown } from '@/components/Markdown';
import { GET_THEMA } from '@/query';

type Params = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'thema');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}

const Thema = async ({ params: { locale, slug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEMA,
    variables: { slug: slug, locale: locale },
  });

  const { title, content } = data.themas.data[0].attributes;

  return (
    <>
      <Heading1>{title}</Heading1>
      <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
    </>
  );
};

export default Thema;
