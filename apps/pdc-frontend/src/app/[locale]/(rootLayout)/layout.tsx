import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { QueryClientProvider } from '@/client';
import {
  Footer,
  FooterData,
  Grid,
  GridCell,
  Logo,
  LogoImage,
  MatomoTagManager,
  Navigation,
  NavigationListType,
  Page,
  PageContent,
  PageHeader,
  PreviewAlert,
  SkipLink,
  Surface,
} from '@/components';
// import { ClientLanguageSwitcher } from '@/components/ClientLanguageSwitcher';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import { Main } from '@/components/Main';
import { SearchBar } from '@/components/SearchBar';
import 'react-loading-skeleton/dist/skeleton.css';
import { GET_TEMPLATE } from '@/query';
import { buildAlternateLinks, createStrapiURL, fetchData } from '@/util';
import {
  ComponentComponentsUtrechtFooter,
  ComponentComponentsUtrechtNavigation,
  GetTemplateDataQuery,
} from '../../../../gql/graphql';
import { getLiveSuggestions, onSearchSubmitAction } from '../../actions';
import { useTranslation } from '../../i18n/index';
import { languages } from '../../i18n/settings';
import '@frameless/ui/dist/bundle.css';
import '../../../styles/globals.css';

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

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'common');
  const url = `${process.env.FRONTEND_PUBLIC_URL}/${locale}`;
  return {
    title: {
      template: `%s | ${t('website-setting.website-name')}`,
      default: `${t('website-setting.website-name')}`,
    },
    icons: {
      icon: [
        {
          url: '/favicon/favicon.ico',
        },
        {
          url: '/favicon/android-chrome-192x192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          url: '/favicon/android-chrome-512x512.png',
          type: 'image/png',
          sizes: '512x512',
        },
        {
          url: '/favicon/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          url: '/favicon/favicon-16x16.png',
          type: 'image/png',
          sizes: '16x16',
        },
      ],
      apple: [{ url: '/favicon/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      type: 'website',
      locale,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      url,
    },
    metadataBase: new URL(process.env.FRONTEND_PUBLIC_URL || 'http://localhost:3000'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...buildAlternateLinks({ languages }),
      },
    },
  };
}

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  const nonce = headers().get('x-nonce') || '';
  const { t } = await useTranslation(locale, ['layout', 'common']);
  const { isEnabled } = draftMode();
  const { data } = await fetchData<{ data: GetTemplateDataQuery }>({
    url: createStrapiURL(),
    query: GET_TEMPLATE,
    variables: { locale },
  });

  const navigationData = data.pdcTemplate?.data?.attributes?.sections?.find(
    (component) => component?.__typename === 'ComponentComponentsUtrechtNavigation',
  ) as ComponentComponentsUtrechtNavigation;

  const footerData = data.pdcTemplate?.data?.attributes?.sections?.find(
    (component) => component?.__typename === 'ComponentComponentsUtrechtFooter',
  ) as ComponentComponentsUtrechtFooter;

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={classnames(
          'utrecht-theme',
          // Disable dark mode until it is completed and tested
          // 'utrecht-theme--media-query-color-scheme',
          'utrecht-document',
          'utrecht-pdc-theme',
        )}
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
          <Surface>
            <Page className="utrecht-custom-page">
              <PageHeader className="utrecht-custom-header">
                <SkipLink href="#main">{t('components.skip-link.main')}</SkipLink>
                <SkipLink href="#menu">{t('components.skip-link.menu')}</SkipLink>
                <SkipLink href="#search-input">{t('components.skip-link.search-input')}</SkipLink>
                <Grid>
                  <GridCell xs={6}>
                    <div className="utrecht-logo-wrapper">
                      <Link
                        href={`/${locale}`}
                        className="utrecht-link utrecht-link--html-a utrecht-link--box-content"
                        prefetch={false}
                        aria-label={
                          t('logo.aria-label', {
                            defaultValue: 'Gemeente Utrecht logo, ga naar homepagina',
                          }) || ''
                        }
                      >
                        <Logo>
                          <LogoImage />
                        </Logo>
                      </Link>
                    </div>
                  </GridCell>
                  {/* <GridCell xs={3}>
                      <ClientLanguageSwitcher locales={languages} currentLocale={locale} />
                    </GridCell> */}
                  <GridCell sm={12} md={6} justifyContent="flex-end" alignItems="center" order={3} orderMd={2}>
                    <div className="utrecht-search-bar-wrapper">
                      <SearchBar
                        locale={locale}
                        onSearchSubmit={onSearchSubmitAction}
                        onSearchChange={getLiveSuggestions}
                        submitButtonText={t('search-bar.search-submit')}
                        suggestionsTitle={t('search-bar.suggestions-title')}
                        hitsTitle={t('search-bar.hits-title')}
                      />
                    </div>
                  </GridCell>
                  {navigationData?.navigationList && navigationData?.navigationList?.length > 0 && (
                    <GridCell xs={6} md={12} order={2} orderMd={3}>
                      <Navigation
                        list={navigationData.navigationList as NavigationListType[]}
                        mobileBreakpoint={961}
                        toggleButton={{
                          openText: 'Menu',
                          closeText: 'Sluiten',
                        }}
                      />
                    </GridCell>
                  )}
                </Grid>
              </PageHeader>
              <PageContent className="utrecht-page-content--modifier">
                <Main id="main">{children}</Main>
              </PageContent>
            </Page>
            <div id="webchat" />
            <Footer data={footerData as FooterData} />
          </Surface>
        </QueryClientProvider>
        <MatomoTagManager
          nonce={nonce}
          src={`${process.env.MATOMO_HOST}/analytics/js/container_${process.env.MATOMO_SITE_ID}.js`}
        />
        <SiteImproveAnalytics nonce={nonce} />
        <Script
          defer
          id="chatwidget-script"
          crossOrigin="anonymous"
          src="https://virtuele-gemeente-assistent.nl/static/js/widget.js"
          nonce={nonce}
        />
      </body>
    </html>
  );
};
export default RootLayout;
