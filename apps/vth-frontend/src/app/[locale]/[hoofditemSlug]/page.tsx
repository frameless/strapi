import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
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
    variables: { slug: hoofditemSlug, locale: locale },
  });
  return {
    title: data.findSlug.data.attributes.title,
    description: data.findSlug.data.attributes.description,
  };
}

const Hoofditem = async ({ params: { locale, hoofditemSlug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOOFDITEM_BY_SLUG,
    variables: { slug: hoofditemSlug, locale: locale },
  });

  const { title, content, themas, contents } = data.findSlug.data.attributes;

  const DynamicContent = () =>
    content &&
    content.length > 0 &&
    content?.map((component: any, index: number) => {
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
          <Heading1>{title}</Heading1>
          <DynamicContent />
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {themas.data[0] &&
            themas.data.map((thema: any) => {
              const { title, description, slug: childSlug, previewImage: imageData } = thema.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  title={title}
                  description={description}
                  key={`thema-${childSlug}`}
                  link={{ href: `${locale}/thema/${childSlug}` }}
                />
              );
            })}
          {contents.data[0] &&
            contents.data.map((content: any) => {
              const { title, description, slug: contentSlug, previewImage: imageData } = content.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  title={title}
                  description={description}
                  key={`thema-${contentSlug}`}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `${locale}/content/${contentSlug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hoofditem;
