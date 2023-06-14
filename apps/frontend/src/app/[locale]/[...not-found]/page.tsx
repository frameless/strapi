import { Heading1 } from '@utrecht/component-library-react/dist/css-module';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { fetchData } from '@/util/fetchData';
import { Markdown } from '../components/Markdown';

const NotFoundPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
    query: GET_NOT_FOUND_PAGE,
    variables: { locale: locale },
  });
  const { origin } = new URL(process.env.STRAPI_BACKEND_URL as string);

  return (
    <div>
      <Heading1>{data?.notFoundPage?.data?.attributes?.title}</Heading1>
      <Markdown strapiBackendURL={origin}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
    </div>
  );
};

export default NotFoundPage;
