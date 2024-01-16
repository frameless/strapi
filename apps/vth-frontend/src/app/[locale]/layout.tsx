import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { QueryClientProvider } from '@/client';
import {
  Footer,
  Grid,
  GridCell,
  Logo,
  LogoImage,
  Navigation,
  NavigationListType,
  Page,
  PageContent,
  PageHeader,
  PreviewAlert,
  SkipLink,
} from '@/components';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Main } from '@/components/Main';
import { GET_NAVIGATION_PAGES } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { useTranslation } from '../i18n/index';
import '@frameless/ui/dist/bundle.css';
import '../../styles/globals.css';

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

type PageData = {
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
  const { t } = await useTranslation(locale, ['layout', 'common']);
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NAVIGATION_PAGES,
    variables: { pageMode: isEnabled ? 'PREVIEW' : 'LIVE' },
  });

  const navigationPages: PageData[] = data?.navigationPages?.data;

  navigationPages?.sort((a, b) => {
    return a.attributes.title.localeCompare(b.attributes.title);
  });

  const navListData = navigationPages?.map((navigationPage) => {
    return {
      title: navigationPage.attributes.title,
      link: `/${navigationPage.attributes.slug}`,
    } satisfies NavigationListType;
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
        icon: 'x',
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
        className={classnames('utrecht-theme', 'utrecht-document', 'utrecht-surface', 'utrecht-vth-theme')}
        suppressHydrationWarning={true}
      >
        {isEnabled && (
          <PreviewAlert
            link={{
              href: '/api/clear-preview',
              text: t('preview-alert.link'),
            }}
            message={t('preview-alert.message')}
          />
        )}
        <QueryClientProvider>
          <Page className="utrecht-page--full-width">
            <PageHeader>
              <div className="utrecht-skip-link-container">
                <SkipLink href="#main">Ga naar inhoud</SkipLink>
              </div>
              <Grid spacing="md">
                <GridCell xs={6}>
                  <Link
                    href={`/${locale}`}
                    className="utrecht-link utrecht-link--html-a utrecht-link--box-content utrecht-logo__wrapper"
                    prefetch={true}
                    aria-label="Ga naar home pagina"
                  >
                    <Logo>
                      <LogoImage />
                    </Logo>
                  </Link>
                </GridCell>
                <GridCell xs={6} md={12}>
                  <Navigation
                    list={navListData}
                    mobileBreakpoint={998}
                    toggleButton={{
                      openText: 'Menu',
                      closeText: 'Sluiten',
                    }}
                  />
                </GridCell>
              </Grid>
            </PageHeader>
            <PageContent>
              <Main id="main">{children}</Main>
            </PageContent>
            <Footer data={footerData} />
          </Page>
        </QueryClientProvider>
        <Script async src="https://siteimproveanalytics.com/js/siteanalyze_6006206.js"></Script>
      </body>
    </html>
  );
};
export default RootLayout;
