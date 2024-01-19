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
import { getLiveSuggestions, onSearchSubmitAction } from '../actions';
import { useTranslation } from '../i18n/index';
import { languages } from '../i18n/settings';
import '@frameless/ui/dist/bundle.css';
import '../../styles/globals.css';

// eslint-disable-next-line no-unused-vars
const getNavListData = (t: (text: string) => string) => [
  {
    title: t('navigation.list.0.title'),
    link: t('navigation.list.0.link'),
  },
  {
    title: t('navigation.list.1.title'),
    link: t('navigation.list.1.link'),
  },
  {
    title: t('navigation.list.2.title'),
    link: t('navigation.list.2.link'),
  },
  {
    title: t('navigation.list.3.title'),
    link: t('navigation.list.3.link'),
  },
  {
    title: t('navigation.list.4.title'),
    link: t('navigation.list.4.link'),
  },
];

const escapeComment = (data: any) => String(data).replace(/--/g, '-\u200B-');

const HTMLComment = ({ data }: any) => (
  <noscript dangerouslySetInnerHTML={{ __html: `<!--${escapeComment(data)}-->` }} />
);

export const SearchIndexContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <HTMLComment data="TYPO3SEARCH_begin" />
    {children}
    <HTMLComment data="TYPO3SEARCH_end" />
  </>
);

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
  const convertLanguagesArrayToObject = languages.reduce((a, v) => ({ ...a, [v]: v }), {});
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
      url: `${process.env.FRONTEND_PUBLIC_URL}/${locale}`,
    },
    metadataBase: new URL(process.env.FRONTEND_PUBLIC_URL || ''),
    alternates: {
      canonical: '/',
      languages: {
        ...convertLanguagesArrayToObject,
      },
    },
  };
}

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  const { t } = await useTranslation(locale, ['layout', 'common']);
  const { isEnabled } = draftMode();
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
        icon: t('footer.social_media.0.icon'),
        link: t('footer.social_media.0.link'),
        external: true,
        title: t('footer.social_media.0.title'),
      },
      {
        icon: t('footer.social_media.1.icon'),
        link: t('footer.social_media.1.link'),
        external: true,
        title: t('footer.social_media.1.title'),
      },
      {
        icon: t('footer.social_media.2.icon'),
        link: t('footer.social_media.2.link'),
        external: true,
        title: t('footer.social_media.2.title'),
      },
      {
        icon: t('footer.social_media.3.icon'),
        link: t('footer.social_media.3.link'),
        external: true,
        title: t('footer.social_media.3.title'),
      },
      {
        icon: t('footer.social_media.4.icon'),
        link: t('footer.social_media.4.link'),
        external: true,
        title: t('footer.social_media.4.title'),
      },
      {
        icon: t('footer.social_media.5.icon'),
        link: t('footer.social_media.5.link'),
        external: true,
        title: t('footer.social_media.5.title'),
      },
    ],
  };
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={classnames(
          'utrecht-theme',
          'utrecht-theme--media-query-color-scheme',
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
                <Grid spacing="sm">
                  <GridCell xs={6}>
                    <div className="utrecht-logo-wrapper">
                      <Link
                        href={`/${locale}`}
                        className="utrecht-link utrecht-link--html-a utrecht-link--box-content"
                        prefetch={false}
                        aria-label="Ga naar home pagina"
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
                        inputAriaLabel={t('search-bar.input-ariaLabel')}
                        suggestionsTitle={t('search-bar.suggestions-title')}
                        hitsTitle={t('search-bar.hits-title')}
                      />
                    </div>
                  </GridCell>
                  <GridCell xs={6} md={12} order={2} orderMd={3}>
                    <div className="utrecht-nav-wrapper">
                      <Navigation
                        list={getNavListData(t)}
                        mobileBreakpoint={961}
                        toggleButton={{
                          openText: 'Menu',
                          closeText: 'Sluiten',
                        }}
                      />
                    </div>
                  </GridCell>
                </Grid>
              </PageHeader>

              <PageContent className="utrecht-page-content--modifier">
                <Main id="main">{children}</Main>
              </PageContent>
            </Page>
            <Footer data={footerData} />
          </Surface>
        </QueryClientProvider>
        <Script async src="https://siteimproveanalytics.com/js/siteanalyze_6006206.js"></Script>
      </body>
    </html>
  );
};
export default RootLayout;
