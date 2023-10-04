import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Heading1 } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { GET_THEMA_BY_SLUG } from '@/query';
import {buildImgURL} from "@/util/buildImgURL";

type Params = {
  params: {
    locale: string;
    themaSlug: string;
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

const Thema = async ({ params: { locale, themaSlug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEMA_BY_SLUG,
    variables: { slug: themaSlug, locale: locale },
  });

  const { title, content, child_themas, child_contents } = data.findSlug.data.attributes;

  return (
    <Grid className={'utrecht-grid--content-padding'}>
      <div className={'utrecht-grid__two-third'}>
        <Heading1>{title}</Heading1>
        <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
      </div>
      <Grid className={'utrecht-grid__full-width'}>
        {child_themas.data[0] &&
          child_themas.data.map((thema: any) => {
            const { title, description, slug: childSlug, previewImage } = thema.attributes;
            return (
              <Card
                className={'utrecht-grid__one-third'}
                image={{ url: previewImage && buildImgURL(previewImage), alt: '' }}
                title={title}
                description={description}
                key={`thema-${childSlug}`}
                link={{ href: `/themas/${childSlug}` }}
              />
            );
          })}
        {child_contents.data[0] &&
          child_contents.data &&
          child_contents.data.map((content: any) => {
            const { title, description, slug: contentSlug, previewImage } = content.attributes;
            return (
              <Card
                className={'utrecht-grid__one-third'}
                title={title}
                description={description}
                key={`thema-${contentSlug}`}
                image={{ url: previewImage && buildImgURL(previewImage), alt: '' }}
                link={{ href: `/themas/${themaSlug}/content/${contentSlug}` }}
              />
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Thema;
