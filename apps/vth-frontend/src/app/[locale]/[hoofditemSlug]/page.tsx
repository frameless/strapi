import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { AccordionProvider, Heading1, Markdown } from '@/components';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { GET_HOOFDITEM_BY_SLUG } from '@/query';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type Params = {
  params: {
    locale: string;
    hoofditemSlug: string;
  };
};

export async function generateMetadata({ params: { locale, hoofditemSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOOFDITEM_BY_SLUG,
    variables: { slug: hoofditemSlug, locale },
  });
  return {
    title: data.findSlug?.data?.attributes?.title,
    description: data.findSlug?.data?.attributes?.description,
  };
}

const Hoofditem = async ({ params: { locale, hoofditemSlug } }: Params) => {
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOOFDITEM_BY_SLUG,
    variables: { slug: hoofditemSlug, locale, pageMode: isEnabled ? 'preview' : 'live' },
  });
  const hoofditemData = data.findSlug?.data;
  if (!hoofditemData) return notFound();
  const hoofditemContent = hoofditemData?.attributes?.content;
  const hoofditemContents = hoofditemData?.attributes?.contents?.data;
  const hoofditemTitle = hoofditemData?.attributes?.title;
  const hoofditemThemas = hoofditemContent?.attributes?.themas.data;

  const DynamicContent = () =>
    hoofditemContent &&
    hoofditemContent?.length > 0 &&
    hoofditemContent?.map((component: any, index: number) => {
      switch (component?.__typename) {
        case 'ComponentComponentsBlockContent':
          return component.content ? (
            <Markdown imageUrl={getImageBaseUrl()} key={index}>
              {component.content}
            </Markdown>
          ) : null;
        case 'ComponentComponentsAccordionSection':
          return (
            <AccordionProvider
              sections={component.item.map(({ id, title, body }: any) => ({
                id,
                label: title,
                headingLevel: 3,
                body: <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>,
              }))}
            />
          );
        default:
          return null;
      }
    });

  return (
    <Grid className={'utrecht-grid--content-padding'}>
      <div className={'utrecht-grid__full-width'}>
        <BreadcrumbWithBacklink
          breadcrumbProps={{ navigationElements: [] }}
          backlinkProps={{ title: 'Home', href: '/' }}
        />
      </div>
      <Grid className={'utrecht-grid__two-third'}>
        <div className={'utrecht-grid__full-width'}>
          <Heading1>{hoofditemTitle}</Heading1>
          <DynamicContent />
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {hoofditemThemas?.length > 0 &&
            hoofditemThemas.map((thema: any) => {
              const imageUrl = thema?.attributes?.imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  title={hoofditemTitle}
                  description={thema?.attributes?.description}
                  key={`thema-${thema?.attributes?.childSlug}`}
                  link={{ href: `/${locale}/thema/${thema?.attributes?.childSlug}` }}
                />
              );
            })}
          {hoofditemContents?.length > 0 &&
            hoofditemContents.map((content: any) => {
              const { title, description, slug: contentSlug, previewImage: imageData } = content.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  title={title}
                  description={description}
                  key={`thema-${contentSlug}`}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `/${locale}/content/${contentSlug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hoofditem;
