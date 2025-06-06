import { cookies, draftMode } from 'next/headers';
import { useTranslation } from '@/app/i18n';
import { fallbackLng } from '@/app/i18n/settings';
import { Header, Heading1, Page, PageContent, RichText } from '@/components';
import { Main } from '@/components/Main';
import { Markdown } from '@/components/Markdown';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { config } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';
import { getNavData } from '@/util/getNavData';

const NotFoundPage = async () => {
  new Response(null, { status: 404 });
  const locale = cookies().get('i18next')?.value;
  const { t } = await useTranslation(locale || fallbackLng, ['common']);
  const { isEnabled } = draftMode();
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
  });
  const navList = await getNavData({ pageMode: isEnabled ? 'PREVIEW' : 'LIVE' });
  return (
    <>
      <Header
        navList={navList}
        logo={{
          href: config.homePageURL,
          ariaLabel:
            t('logo.aria-label', {
              defaultValue: 'Gemeente Utrecht logo, ga naar homepagina',
            }) || '',
        }}
      />
      <Page>
        <Main id="main">
          <PageContent className="utrecht-custom-page-content">
            <RichText>
              <Heading1>{data?.notFoundPage?.data?.attributes?.title}</Heading1>
              <Markdown imageUrl={getImageBaseUrl()}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
            </RichText>
          </PageContent>
        </Main>
      </Page>
    </>
  );
};

export default NotFoundPage;
