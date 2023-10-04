import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import {
  Heading1,
  Heading2,
  Link,
  Paragraph,
  UnorderedList,
  UnorderedListItem,
} from '@utrecht/component-library-react';
import { Metadata } from 'next';
import React from 'react';
import { useTranslation } from '@/app/i18n';
import { Grid } from '@/components/Grid';
import { Markdown } from '@/components/Markdown';
import { GET_CONTENT_BY_SLUG } from '@/query';

type Params = {
  params: {
    locale: string;
    contentSlug: string;
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

const Thema = async ({ params: { locale, contentSlug } }: Params) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_CONTENT_BY_SLUG,
    variables: { slug: contentSlug, locale: locale },
  });

  const { title, content, parents } = data.findSlug.data.attributes;

  return (
    <Grid className={'utrecht-grid--content-padding'}>
      <div className={'utrecht-grid__two-third'}>
        <Heading1>{title}</Heading1>
        <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
        <Heading2>Themas</Heading2>
        {parents.data[0] ? (
          <UnorderedList>
            {parents.data &&
              parents.data.map((content: any) => {
                const { title, slug: parentSlug } = content.attributes;
                return (
                  <UnorderedListItem key={`thema-${parentSlug}`}>
                    <Link href={`/themas/${parentSlug}`}>{title}</Link>
                  </UnorderedListItem>
                );
              })}
          </UnorderedList>
        ) : (
          <>
            <Paragraph>Geen thema paginas verbonden.</Paragraph>
          </>
        )}
      </div>
    </Grid>
  );
};

export default Thema;
