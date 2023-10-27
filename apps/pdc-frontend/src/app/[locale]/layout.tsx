import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import { Grid, GridCell, Navigation, Page, PageContent, PageHeader, SkipLink, Surface } from '@/components';
import { ClientLanguageSwitcher } from '@/components/ClientLanguageSwitcher';
import '@utrecht/component-library-css';
import '../../styles/globals.css';
import '@utrecht/design-tokens/dist/index.css';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { Main } from '@/components/Main';
import { SearchBar } from '@/components/SearchBar';
import { getLiveSuggestions, onSearchSubmitAction } from './search/actions';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from '../i18n/index';
import { languages } from '../i18n/settings';
import '@frameless/ui/dist/bundle.css';

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
        className={classnames('utrecht-theme', 'utrecht-theme--media-query-color-scheme', 'utrecht-document')}
        suppressHydrationWarning={true}
      >
        <QueryClientProvider>
          <Surface>
            <Page className="utrecht-main-wrapper">
              <PageHeader>
                <SkipLink href="#main">{t('components.skip-link.main')}</SkipLink>
                <SkipLink href="#menu">{t('components.skip-link.menu')}</SkipLink>
                <SkipLink href="#search-input">{t('components.skip-link.search-input')}</SkipLink>
                <Grid spacing="sm">
                  <GridCell xs={6}>
                    <Logo locale={locale} />
                  </GridCell>
                  <GridCell xs={6}>
                    <ClientLanguageSwitcher locales={languages} currentLocale={locale} />
                  </GridCell>
                  <GridCell sm={12} justifyContent="flex-end">
                    <SearchBar
                      locale={locale}
                      onSearchSubmit={onSearchSubmitAction}
                      onSearchChange={getLiveSuggestions}
                      submitButtonText={t('search-bar.search-submit')}
                      inputAriaLabel={t('search-bar.input-ariaLabel')}
                      suggestionsTitle={t('search-bar.suggestions-title')}
                      hitsTitle={t('search-bar.hits-title')}
                    />
                  </GridCell>
                </Grid>
              </PageHeader>
              <Navigation
                list={getNavListData(t)}
                mobileBreakpoint={768}
                toggleButton={{
                  openText: 'Menu',
                  closeText: 'Sluiten',
                }}
              />
              <PageContent className="utrecht-page-content--modifier">
                <Main id="main">{children}</Main>
              </PageContent>
              <Footer data={footerData} />
            </Page>
          </Surface>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
