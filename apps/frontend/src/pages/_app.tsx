import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import SearchState from '../context/search/state';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <div className="utrecht-theme utrecht-theme--media-query-color-scheme">
      <SearchState>
        <Component {...pageProps} />
      </SearchState>
    </div>
  );
}

export default appWithTranslation(MyApp);
