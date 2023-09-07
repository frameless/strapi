import { createStrapiURL } from '@frameless/pdc-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/pdc-frontend/src/util/fetchData';
import { Heading1, Heading2, Link, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Markdown } from '@/components/Markdown';
import { GET_THEMA_BY_SLUG } from '@/query';

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
    query: GET_THEMA_BY_SLUG,
    variables: { slug: slug, locale: locale },
  });

  const { title, content, child_themas, child_contents } = data.findSlug.data.attributes;

  return (
    <>
      <Heading1>{title}</Heading1>
      <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
      <Heading2>Themas</Heading2>
      <UnorderedList>
        {child_themas &&
          child_themas.map((thema: any) => {
            const { title, slug: childSlug } = thema.attributes;
            return (
              <UnorderedListItem key={`thema-${slug}`}>
                <Link href={`/themas/${slug}/${childSlug}`}>{title}</Link>
              </UnorderedListItem>
            );
          })}
        {child_contents &&
          child_contents.map((content: any) => {
            const { title, slug: childSlug } = content.attributes;
            return (
              <UnorderedListItem key={`thema-${slug}`}>
                <Link href={`/themas/${slug}/${childSlug}`}>{title}</Link>
              </UnorderedListItem>
            );
          })}
      </UnorderedList>
    </>
  );
};

export default Thema;
