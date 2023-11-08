import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import React from 'react';
import { AccordionProvider, Heading1, Markdown } from '@/components';
import { BreadcrumbNavigationElement } from '@/components/BreadcrumbNavigation';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { LinkData, SideNavigation } from '@/components/SideNavigation';
import { GET_THEMA_BY_SLUG } from '@/query';
import { SiblingData } from '@/types';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type Params = {
  params: {
    locale: string;
    hoofdItemSlug: string;
  };
};

export async function generateMetadata({ params: { locale, hoofdItemSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEMA_BY_SLUG,
    variables: { slug: hoofdItemSlug, locale: locale },
  });
  return {
    title: data.findSlug.data.attributes.title,
    description: data.findSlug.data.attributes.description,
  };
}

const Thema = async ({ params: { locale, hoofdItemSlug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_THEMA_BY_SLUG,
    variables: { slug: hoofdItemSlug, locale: locale },
  });

  const { title, content, parents, child_themas, child_contents } = data.findSlug.data.attributes;
  const parentSlug = parents?.data[0]?.attributes?.slug;
  const siblingThemas: SiblingData[] = parents?.data[0]?.attributes?.child_themas?.data || [];
  const siblingContent: SiblingData[] = parents?.data[0]?.attributes?.child_contents?.data || [];

  const themasLinks =
    siblingThemas?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/themas/${slug}`,
      isCurrent: slug === hoofdItemSlug,
    })) || [];

  const contentLinks =
    siblingContent?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/themas/${parentSlug}/content/${slug}`,
      isCurrent: slug === hoofdItemSlug,
    })) || [];

  const sideNavigationLinks: LinkData[] = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements: BreadcrumbNavigationElement[] = [];

  const parentElement: BreadcrumbNavigationElement = parents?.data[0] && {
    title: parents?.data[0]?.attributes?.title,
    href: `/themas/${parentSlug}`,
  };

  if (parentElement) {
    breadcrumbNavigationElements.push(parentElement);
  }

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
          breadcrumbProps={{ navigationElements: breadcrumbNavigationElements }}
          backlinkProps={{ title: parentElement?.title || 'Home', href: parentElement?.href || '/' }}
        />
      </div>
      <Grid className={'utrecht-grid__two-third'}>
        <div className={'utrecht-grid__full-width'}>
          <Heading1>{title}</Heading1>
          <DynamicContent />
        </div>
        <Grid className={'utrecht-grid__full-width'}>
          {child_themas.data[0] &&
            child_themas.data.map((thema: any) => {
              const { title, description, slug: childSlug, previewImage: imageData } = thema.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
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
              const { title, description, slug: contentSlug, previewImage: imageData } = content.attributes;
              const imageUrl = imageData?.data?.attributes?.url;
              return (
                <Card
                  className={'utrecht-grid__half-width'}
                  title={title}
                  description={description}
                  key={`thema-${contentSlug}`}
                  image={{ url: imageUrl && `${getImageBaseUrl()}${imageUrl}`, alt: '' }}
                  link={{ href: `/themas/${hoofdItemSlug}/content/${contentSlug}` }}
                />
              );
            })}
        </Grid>
      </Grid>
      {sideNavigationLinks.length > 0 && (
        <div className={'utrecht-grid-mobile-hidden utrecht-grid__one-third'}>
          <SideNavigation links={sideNavigationLinks} />
        </div>
      )}
    </Grid>
  );
};

export default Thema;
