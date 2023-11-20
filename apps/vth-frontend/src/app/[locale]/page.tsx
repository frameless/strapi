import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { GET_HOMEPAGE } from '@/query';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
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
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOMEPAGE,
    variables: { locale: locale, pageMode: isEnabled ? 'PREVIEW' : 'LIVE' },
  });

  const hoofditems = data?.hoofditems?.data;
  const bannerAttributes = data?.homepage?.data?.attributes?.bannerImage?.data?.attributes;
  if (!data.homepage.data) return notFound();
  return (
    <div>
      {bannerAttributes?.url && (
        <Image
          width={1200}
          height={400}
          src={`${getImageBaseUrl()}${bannerAttributes.url}`}
          alt={bannerAttributes.alternativeText || ''}
          priority
          className={'utrecht-image utrecht-image--banner'}
        />
      )}
      <Grid className={'utrecht-grid--content-padding'}>
        <div className={'utrecht-grid__two-third'}>
          <Heading1>{data?.homepage?.data?.attributes?.title}</Heading1>
          <Markdown imageUrl={getImageBaseUrl()}>{data?.homepage?.data?.attributes?.content}</Markdown>
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {hoofditems &&
            hoofditems.map((hoofditem: any) => {
              const { title, description, slug, previewImage: imageData } = hoofditem.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__one-third'}
                  key={`hoofditem-${slug}`}
                  title={title}
                  description={description}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `/${locale}/${slug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
