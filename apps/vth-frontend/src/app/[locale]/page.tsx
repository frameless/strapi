import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { GET_HOME_PAGE } from '@/query';
import { buildImgURL } from '@/util/buildImgURL';
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

  const { title, content } = data?.homepage?.data?.attributes;
  const themas = data?.themas?.data;

  return (
    <Grid className={'utrecht-grid--content-padding'}>
      <div className={'utrecht-grid__two-third'}>
        <Heading1>{title}</Heading1>
        <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
      </div>
      <Grid className={'utrecht-grid__full-width'}>
        {themas &&
          themas.map((thema: any) => {
            const { title, description, slug, previewImage: imageData } = thema.attributes;
            const imageUrl = imageData?.data?.attributes?.url;
            return (
              <Card
                className={'utrecht-grid__one-third'}
                key={`thema-${slug}`}
                title={title}
                description={description}
                image={{ url: imageUrl && buildImgURL(imageUrl), alt: '' }}
                link={{ href: `/themas/${slug}` }}
              />
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Home;
