import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import { Navigation, Page, PageContent, PageHeader } from '@/components';
import '@utrecht/component-library-css';
import '../../styles/globals.css';
import '@utrecht/design-tokens/dist/index.css';
import { Footer } from '@/components/Footer';
import { Grid } from '@/components/Grid';
import { Logo } from '@/components/Logo';
import 'react-loading-skeleton/dist/skeleton.css';
import { GET_HOOFD_THEMAS } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { useTranslation } from '../i18n/index';
import '@frameless/ui/dist/bundle.css';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => <main>{children}</main>;

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

type Params = {
  params: {
    locale: string;
  };
};

type ThemaData = {
  attributes: {
    title: string;
    slug: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'common');
  return {
    title: {
      template: `%s | ${t('website-setting.website-name')}`,
      default: `${t('website-setting.website-name')}`,
    },
  };
}

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  const { t } = await useTranslation(locale, ['layout']);
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_HOOFD_THEMAS,
    variables: { locale: locale },
  });

  const hoofdThemas: ThemaData[] = data?.themas?.data;

  const navListData = hoofdThemas?.map((thema) => {
    return {
      title: thema.attributes.title,
      link: `/themas/${thema.attributes.slug}`,
    };
  });

  const footerData = {
    title: t('footer.title'),
    list: [
      {
        title: t('footer.list.0.title'),
        items: [
          {
            title: t('footer.list.0.items.0.title'),
            link: 'tel:14030',
            external: false,
          },
          {
            title: t('footer.list.0.items.1.title'),
            link: 'https://utrecht.nl/contact/verkort-telefoonnummer-gemeente/',
            external: true,
          },
        ],
        paragraph: null,
        column: 6,
      },
      {
        title: t('footer.list.1.title'),
        items: [],
        paragraph: 'Stadskantoor\nStadsplateau 1\n3521AZ Utrecht',
        column: 6,
      },
      {
        title: null,
        items: [
          {
            title: t('footer.list.2.items.0.title'),
            link: 'https://utrecht.nl/contact/',
            external: true,
          },
        ],
        paragraph: null,
        column: 12,
      },
      {
        title: null,
        items: [
          {
            title: t('footer.list.3.items.0.title'),
            link: 'https://utrecht.nl/over-deze-website/',
            external: true,
          },
        ],
        paragraph: null,
        column: 12,
      },
    ],
    social_media: [
      {
        icon: 'facebook',
        link: 'https://www.facebook.com/GemeenteUtrecht',
        external: true,
        title: t('footer.social_media.0.title'),
      },
      {
        icon: 'instagram',
        link: 'https://www.instagram.com/GemeenteUtrecht',
        external: true,
        title: t('footer.social_media.1.title'),
      },
      {
        icon: 'linkedin',
        link: 'https://nl.linkedin.com/company/gemeente-utrecht',
        external: true,
        title: t('footer.social_media.2.title'),
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/gemeenteutrecht',
        external: true,
        title: t('footer.social_media.3.title'),
      },
      {
        icon: 'whatsapp',
        link: 'https://api.whatsapp.com/send?phone=31624927665',
        external: false,
        title: t('footer.social_media.4.title'),
      },
    ],
  };
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={classnames('utrecht-theme', 'utrecht-document', 'utrecht-surface')}
        suppressHydrationWarning={true}
      >
        <QueryClientProvider>
          <Page className="utrecht-page--full-width">
            <PageHeader>
              <Grid className={'utrecht-grid--content-padding'}>
                <Logo locale={locale} />
              </Grid>
            </PageHeader>
            <PageContent>
              <Navigation
                list={navListData}
                mobileBreakpoint={998}
                toggleButton={{
                  openText: 'Menu',
                  closeText: 'Sluiten',
                }}
              />
              <Main>{children}</Main>
            </PageContent>
            <Footer data={footerData} />
          </Page>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
