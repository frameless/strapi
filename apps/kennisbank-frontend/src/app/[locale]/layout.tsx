import classnames from 'classnames';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import React from 'react';
import { QueryClientProvider } from '@/client';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import { useTranslation } from '../i18n/index';
import '@frameless/ui/dist/bundle.css';

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
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={classnames('utrecht-theme', 'utrecht-document', 'utrecht-surface')}
        suppressHydrationWarning={true}
      >
        <QueryClientProvider>
          <div>{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
