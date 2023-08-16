import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import { Article, Page, PageContent, PageHeader } from '@/components';
import { ClientLanguageSwitcher } from '@/components/ClientLanguageSwitcher';
import '@utrecht/component-library-css';
import '../../styles/globals.css';
import '@utrecht/design-tokens/dist/index.css';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { SearchBar } from '@/components/SearchBar';
import { getLiveSuggestions, onSearchSubmitAction } from './search/actions';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from '../i18n/index';
import { languages } from '../i18n/settings';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => <main>{children}</main>;

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
  return {
    title: {
      template: `%s | ${t('website-setting.website-name')}`,
      default: `${t('website-setting.website-name')}`,
    },
  };
}

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  const { t } = await useTranslation(locale, 'layout');

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
          <Page className="utrecht-main-wrapper">
            <PageHeader>
              <div className="utrecht-header">
                <Logo locale={locale} />
                <div className="utrecht-nav__content">
                  <ClientLanguageSwitcher locales={languages} currentLocale={locale} />
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
              </div>
              <nav className="utrecht-topnav">
                <ul className="utrecht-topnav__list">
                  <li className="utrecht-topnav__item">
                    <a className="utrecht-topnav__link" href="https://www.utrecht.nl/wonen-en-leven">
                      Wonen en leven
                    </a>
                  </li>
                  <li className="utrecht-topnav__item">
                    <a className="utrecht-topnav__link" href="https://www.utrecht.nl/zorg-en-onderwijs">
                      Zorg en onderwijs
                    </a>
                  </li>
                  <li className="utrecht-topnav__item">
                    <a className="utrecht-topnav__link" href="https://www.utrecht.nl/werk-en-inkomen">
                      Werk en inkomen
                    </a>
                  </li>
                  <li className="utrecht-topnav__item">
                    <a className="utrecht-topnav__link" href="https://www.utrecht.nl/ondernemen">
                      Ondernemen
                    </a>
                  </li>
                  <li className="utrecht-topnav__item">
                    <a className="utrecht-topnav__link" href="https://www.utrecht.nl/bestuur-en-organisatie">
                      Bestuur en organisatie
                    </a>
                  </li>
                </ul>
              </nav>
            </PageHeader>
            <PageContent className="utrecht-page-content--modifier" style={{ position: 'relative' }}>
              <Main>
                <Article>{children}</Article>
              </Main>
            </PageContent>
            <Footer data={footerData} />
          </Page>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
