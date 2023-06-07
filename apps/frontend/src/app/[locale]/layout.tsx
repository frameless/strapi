import { Article, Page, PageContent, PageFooter, PageHeader } from '@utrecht/component-library-react';
import { dir } from 'i18next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import { i18n, Locale } from '@/i18n-config';
import { ClientLanguageSwitcher } from './ClientLanguageSwitcher';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import '../../styles/globals.css';
import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';
import { getLiveSuggestions, onSearchSubmitAction } from './search/actions';
import 'react-loading-skeleton/dist/skeleton.css';

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
    locale: Locale;
  };
}

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={['utrecht-theme', 'utrecht-theme--media-query-color-scheme'].join(' ')}
        suppressHydrationWarning={true}
      >
        <QueryClientProvider>
          <Page className="utrecht-main-wrapper">
            <PageHeader>
              <nav>
                <Logo locale={locale} />
                <div className="utrecht-nav__content">
                  <ClientLanguageSwitcher locales={i18n.locales} currentLocale={locale} />
                  <SearchBar onSearchSubmit={onSearchSubmitAction} onSearchChange={getLiveSuggestions} />
                </div>
              </nav>
            </PageHeader>
            <PageContent className="utrecht-page-content--modifier" style={{ position: 'relative' }}>
              <Main>
                <Article>{children}</Article>
              </Main>
            </PageContent>
            <PageFooter />
          </Page>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
