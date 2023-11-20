import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import React from 'react';
import { AccordionProvider, Heading1 } from '@/components';
import { BreadcrumbNavigationElement } from '@/components/BreadcrumbNavigation';
import { BreadcrumbWithBacklink } from '@/components/BreadcrumbWithBacklink';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { LinkData, SideNavigation } from '@/components/SideNavigation';
import { GET_CONTENT_BY_SLUG } from '@/query';
import { SiblingData } from '@/types';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

type Params = {
  params: {
    locale: string;
    contentSlug: string;
  };
};

export async function generateMetadata({ params: { locale, contentSlug } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_CONTENT_BY_SLUG,
    variables: { slug: contentSlug, locale: locale },
  });
  return {
    title: data.findSlug.data.attributes.title,
    description: data.findSlug.data.attributes.description,
  };
}

const Thema = async ({ params: { locale, contentSlug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_CONTENT_BY_SLUG,
    variables: { slug: contentSlug, locale: locale },
  });

  const { title, content, themas, hoofditems } = data.findSlug.data.attributes;
  const parentThemaSlug = themas?.data[0]?.attributes?.slug;
  const parentHoofditemSlug = hoofditems?.data[0]?.attributes?.slug;

  const hasHoofditemParentOnly = !parentThemaSlug && parentHoofditemSlug;

  const siblingThemas: SiblingData[] = hasHoofditemParentOnly ? hoofditems?.data[0]?.attributes?.themas?.data : [];
  const siblingContent: SiblingData[] = hasHoofditemParentOnly
    ? hoofditems?.data[0]?.attributes?.contents?.data
    : themas?.data[0]?.attributes?.contents?.data;

  const themasLinks =
    siblingThemas?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/${locale}/thema/${slug}`,
      isCurrent: slug === contentSlug,
    })) || [];

  const contentLinks =
    siblingContent?.map(({ attributes: { slug, title } }: SiblingData) => ({
      title,
      slug,
      href: `/${locale}/content/${slug}`,
      isCurrent: slug === contentSlug,
    })) || [];

  const sideNavigationLinks: LinkData[] = [...themasLinks, ...contentLinks];

  const breadcrumbNavigationElements: BreadcrumbNavigationElement[] = [];

  if (themas?.data[0]?.attributes?.hoofditems?.data[0]) {
    breadcrumbNavigationElements.push({
      title: themas?.data[0]?.attributes?.hoofditems?.data[0]?.attributes?.title,
      href: `/${locale}/${themas?.data[0]?.attributes?.hoofditems?.data[0]?.attributes?.slug}`,
    });
  }

  const parentElement: BreadcrumbNavigationElement = hasHoofditemParentOnly
    ? {
        title: hoofditems?.data[0]?.attributes?.title,
        href: `/${locale}/${parentHoofditemSlug}`,
      }
    : {
        title: themas?.data[0]?.attributes?.title,
        href: `/thema/${parentThemaSlug}`,
      };

  breadcrumbNavigationElements.push(parentElement);

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
          backlinkProps={{
            title: parentElement.title,
            href: parentElement.href,
          }}
        />
      </div>
      <div className={'utrecht-grid__two-third'}>
        <Heading1>{title}</Heading1>
        <DynamicContent />
      </div>
      {sideNavigationLinks.length > 1 && (
        <div className={'utrecht-grid-mobile-hidden utrecht-grid__one-third'}>
          <SideNavigation links={sideNavigationLinks} />
        </div>
      )}
    </Grid>
  );
};

export default Thema;