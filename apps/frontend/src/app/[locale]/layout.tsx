import { Article, Page, PageContent, PageFooter, PageHeader } from '@utrecht/component-library-react';
import { dir } from 'i18next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import { ClientLanguageSwitcher } from './components/ClientLanguageSwitcher';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import '../../styles/globals.css';
import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';
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

const RootLayout = async ({ children, params: { locale } }: LayoutProps) => {
  const { t } = await useTranslation(locale, 'layout');
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
                  <ClientLanguageSwitcher locales={languages} currentLocale={locale} />
                  <SearchBar
                    onSearchSubmit={onSearchSubmitAction}
                    onSearchChange={getLiveSuggestions}
                    submitButtonText={t('search-bar.search-submit')}
                    inputAriaLabel={t('search-bar.input-ariaLabel')}
                    suggestionsTitle={t('search-bar.suggestions-title')}
                    hitsTitle={t('search-bar.hits-title')}
                  />
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
