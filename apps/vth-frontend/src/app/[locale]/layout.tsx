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
  FooterData,
  Grid,
  GridCell,
  Logo,
  LogoImage,
  Navigation,
  NavigationListType,
  Page,
  PageHeader,
  PreviewAlert,
  SkipLink,
  Surface,
} from '@/components';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Editoria11y } from '@/components/Editoria11y';
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

  const navListData = navigationPages?.map((navigationPage) => {
    return {
      textContent: navigationPage.attributes.title,
      href: `/${navigationPage.attributes.slug}`,
    } satisfies NavigationListType;
  });

  const footerData = {
    title: t('footer.title'),
    list: {
      listItem: [
        {
          title: t('footer.list.listItem.0.title'),
          link: [
            {
              href: t('footer.list.listItem.0.link.0.href'),
              textContent: t('footer.list.listItem.0.link.0.textContent'),
            },
            {
              href: t('footer.list.listItem.0.link.1.href'),
              textContent: t('footer.list.listItem.0.link.1.textContent'),
            },
            {
              href: t('footer.list.listItem.0.link.2.href'),
              textContent: t('footer.list.listItem.0.link.2.textContent'),
            },
            {
              href: t('footer.list.listItem.0.link.3.href'),
              textContent: t('footer.list.listItem.0.link.3.textContent'),
            },
          ],
        },
      ],
    },
    address: t('footer.address'),
    socialMediaList: {
      link: [
        {
          href: t('footer.socialMediaList.link.0.href'),
          icon: t('footer.socialMediaList.link.0.icon'),
          textContent: t('footer.socialMediaList.link.0.textContent'),
        },
        {
          href: t('footer.socialMediaList.link.1.href'),
          icon: t('footer.socialMediaList.link.1.icon'),
          textContent: t('footer.socialMediaList.link.1.textContent'),
        },
        {
          href: t('footer.socialMediaList.link.2.href'),
          icon: t('footer.socialMediaList.link.2.icon'),
          textContent: t('footer.socialMediaList.link.2.textContent'),
        },
        {
          href: t('footer.socialMediaList.link.3.href'),
          icon: t('footer.socialMediaList.link.3.icon'),
          textContent: t('footer.socialMediaList.link.3.textContent'),
        },
        {
          href: t('footer.socialMediaList.link.4.href'),
          icon: t('footer.socialMediaList.link.4.icon'),
          textContent: t('footer.socialMediaList.link.4.textContent'),
        },
        {
          href: t('footer.socialMediaList.link.5.href'),
          icon: t('footer.socialMediaList.link.5.icon'),
          textContent: t('footer.socialMediaList.link.5.textContent'),
        },
      ],
    },
  };

  return (
    <html lang={locale} dir={dir(locale)} id="top" className="utrecht-scroll-to-top-container">
      <body
        className={classnames('utrecht-theme', 'utrecht-document', 'utrecht-vth-theme')}
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
            <Page className="utrecht-page--full-width">
              <PageHeader>
                <div className="utrecht-skip-link-container">
                  <SkipLink href="#main">Ga naar inhoud</SkipLink>
                </div>
                <Grid>
                  <GridCell xs={6}>
                    <Link
                      href={`/${locale}`}
                      className="utrecht-link utrecht-link--html-a utrecht-link--box-content utrecht-logo__wrapper"
                      prefetch={true}
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
              {isEnabled && <Editoria11y />}
              <Main id="main">{children}</Main>
            </Page>
          </Surface>
          <Footer data={footerData as FooterData} />
        </QueryClientProvider>
        <Script async src="https://siteimproveanalytics.com/js/siteanalyze_6006206.js"></Script>
      </body>
    </html>
  );
};
export default RootLayout;
