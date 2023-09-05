import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Heading1 } from '@/components';
import { Markdown } from '@/components/Markdown';
import { GET_SEARCH_TIP_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const getSearchTipsPage = async (locale: string) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_SEARCH_TIP_PAGE,
    variables: { locale: locale },
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
  const data = await getSearchTipsPage(locale);
  const title = `${data?.searchTip?.data?.attributes?.seo?.title} "${query}"`;
  const description = data?.searchTip?.data?.attributes?.seo?.description;
  return {
    title,
    description,
  };
}

const SearchTips = async ({ params: { locale, query } }: any) => {
  const data = await getSearchTipsPage(locale);

  if (!data?.searchTip?.data || data?.searchTip?.data === null) {
    notFound();
  }

  const title = data?.searchTip?.data?.attributes?.title;
  const body = data?.searchTip?.data?.attributes?.body;
  return (
    <>
      <Heading1>{`${title} "${query}"`}</Heading1>
      <Markdown strapiBackendURL={process.env.STRAPI_PUBLIC_URL}>{body}</Markdown>
    </>
  );
};

export default SearchTips;
