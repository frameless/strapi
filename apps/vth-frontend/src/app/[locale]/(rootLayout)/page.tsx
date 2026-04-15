import { createStrapiURL } from '@frameless/vth-frontend/src/util/createStrapiURL';
import { fetchData } from '@frameless/vth-frontend/src/util/fetchData';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

import { GetHomepageQuery } from '../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import {
  Grid,
  GridCell,
  Heading1,
  Page,
  PageContent,
  RichText,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { Card } from '@/components/Card';
import { Markdown } from '@/components/Markdown';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { GET_HOMEPAGE } from '@/query';

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
  const { t } = await useTranslation(locale, ['common']);
  const { data } = await fetchData<GetHomepageQuery>({
    url: createStrapiURL(),
    query: GET_HOMEPAGE,
    variables: { locale: locale, pageMode: isEnabled ? 'DRAFT' : 'PUBLISHED' },
  });

  if (!data?.homepage) return notFound();
  const navigationPages = data?.navigationPages;
  const bannerImage = data?.homepage?.bannerImage;

  return (
    <>
      <Page>
        <PageContent className="utrecht-page-content--full-width utrecht-custom-page-content ">
          {bannerImage?.url && (
            <Image
              width={1200}
              height={400}
              src={`${getImageBaseUrl()}${bannerImage.url}`}
              alt={bannerImage.alternativeText || ''}
              priority
              className={'utrecht-image utrecht-image--banner'}
            />
          )}
        </PageContent>
        <PageContent className="utrecht-custom-page-content">
          <Grid spacing="sm">
            <GridCell md={12}>
              <Grid>
                <GridCell md={8}>
                  <RichText>
                    <Heading1>{data?.homepage?.title}</Heading1>
                    <Markdown imageUrl={getImageBaseUrl()}>{data?.homepage?.content ?? ''}</Markdown>
                  </RichText>
                </GridCell>
              </Grid>
            </GridCell>
            {navigationPages &&
              navigationPages.map((navigationPage) => {
                if (!navigationPage) return null;
                const { title, description, slug, previewImage } = navigationPage;
                const imageUrl = previewImage?.url;
                const imageAlt = previewImage?.alternativeText ?? '';

                return (
                  <GridCell sm={6} md={4} key={`hoofditem-${slug}`}>
                    <Card
                      title={title!}
                      description={description!}
                      image={{
                        url: imageUrl ? `${getImageBaseUrl()}${imageUrl}` : '',
                        alt: imageAlt,
                      }}
                      link={{ href: `/${locale}/${slug}` }}
                    />
                  </GridCell>
                );
              })}
          </Grid>
          <Grid spacing="lg">
            <GridCell md={12} justifyContent="flex-end">
              <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
            </GridCell>
          </Grid>
        </PageContent>
      </Page>
    </>
  );
};

export default Home;
