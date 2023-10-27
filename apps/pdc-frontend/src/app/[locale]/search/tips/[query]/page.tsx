import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/app/i18n';
import { Markdown, PageTitle } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { GET_SEARCH_TIP_PAGE } from '@/query';
import { getImageBaseUrl } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const getSearchTipsPage = async (locale: string) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_SEARCH_TIP_PAGE,
    variables: { locale },
  });
  return data;
};

type Params = {
  params: {
    locale: string;
    query: string;
  };
};

export async function generateMetadata({ params: { locale, query } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);

  const data = await getSearchTipsPage(locale);
  const title = `${data?.searchTip?.data?.attributes?.seo?.title} "${query}"`;
  const description = data?.searchTip?.data?.attributes?.seo?.description;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url: `${process.env.FRONTEND_PUBLIC_URL}/${locale}/search/tips/${query}`,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}

const SearchTips = async ({ params: { locale, query } }: any) => {
  const data = await getSearchTipsPage(locale);
  const { t } = await useTranslation(locale, ['common']);
  if (!data?.searchTip?.data || data?.searchTip?.data === null) {
    notFound();
  }

  const title = data?.searchTip?.data?.attributes?.title;
  const body = data?.searchTip?.data?.attributes?.body;
  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: `/search/tips/${query}`,
            label: t('components.breadcrumbs.label.search-tips'),
            current: true,
          },
        ]}
      />
      <PageTitle>{`${title} "${query}"`}</PageTitle>
      <Markdown imageUrl={getImageBaseUrl()}>{body}</Markdown>
    </>
  );
};

export default SearchTips;
