import { Heading1 } from '@utrecht/component-library-react/dist/css-module';
import { cookies } from 'next/headers';
import { Markdown } from '@/components/Markdown';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { fetchData } from '@/util/fetchData';

const NotFoundPage = async () => {
  const locale = cookies().get('i18next')?.value;
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
