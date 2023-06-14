import { Heading1 } from '@utrecht/component-library-react/dist/css-module';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GET_SEARCH_TIP_PAGE } from '@/query';
import { fetchData } from '@/util/fetchData';
import { Markdown } from '../../../components/Markdown';

const getSearchTipsPage = async (locale: string) => {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
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

  if (!data.searchTip.data || data.searchTip.data === null) {
    notFound();
  }

  const title = data?.searchTip?.data?.attributes?.title;
  const body = data?.searchTip?.data?.attributes?.body;
  const { origin } = new URL(process.env.STRAPI_BACKEND_URL as string);
  return (
    <>
      <Heading1>{`${title} "${query}"`}</Heading1>
      <Markdown strapiBackendURL={origin}>{body}</Markdown>
    </>
  );
};

export default SearchTips;
