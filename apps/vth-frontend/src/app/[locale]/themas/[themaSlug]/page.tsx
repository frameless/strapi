import { createStrapiURL } from '@frameless/pdc-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/pdc-frontend/src/util/fetchData';
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
import { GET_THEMA_BY_SLUG } from '@/query';

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

  const { title, content, parents, child_themas, child_contents } = data.findSlug.data.attributes;

  return (
    <Grid>
      <div className={'two-thirds'}>
        <Heading1>{title}</Heading1>
        <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{content}</Markdown>
      </div>
      <div className={'two-thirds'}>
        <Heading2>Hoofd-themas</Heading2>
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
            <Paragraph>Geen content paginas verbonden.</Paragraph>
          </>
        )}
      </div>
      <div className={'two-thirds'}>
        <Heading2>Sub-themas</Heading2>
        {child_themas.data[0] ? (
          <UnorderedList>
            {child_themas.data.map((thema: any) => {
              const { title, slug: childSlug } = thema.attributes;
              return (
                <UnorderedListItem key={`thema-${childSlug}`}>
                  <Link href={`/themas/${childSlug}`}>{title}</Link>
                </UnorderedListItem>
              );
            })}
          </UnorderedList>
        ) : (
          <>
            <Paragraph>Geen sub-themas verbonden.</Paragraph>
          </>
        )}
      </div>
      <div className={'two-thirds'}>
        <Heading2>Content paginas</Heading2>
        {child_contents.data[0] ? (
          <UnorderedList>
            {child_contents.data &&
              child_contents.data.map((content: any) => {
                const { title, slug: contentSlug } = content.attributes;
                return (
                  <UnorderedListItem key={`thema-${contentSlug}`}>
                    <Link href={`/themas/${themaSlug}/content/${contentSlug}`}>{title}</Link>
                  </UnorderedListItem>
                );
              })}
          </UnorderedList>
        ) : (
          <>
            <Paragraph>Geen content paginas verbonden.</Paragraph>
          </>
        )}
      </div>
    </Grid>
  );
};

export default Thema;
