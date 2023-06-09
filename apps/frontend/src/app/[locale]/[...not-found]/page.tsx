import { Heading1 } from '@utrecht/component-library-react/dist/css-module';
import { cookies } from 'next/headers';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { Markdown } from '../components/Markdown';

const getNotFoundPage = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value as string;
  try {
    const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_NOT_FOUND_PAGE,
        variables: {
          locale,
        },
      }),
    });
    // TODO CHECK ANOTHER ERROR HERE

    const { data } = await response.json();

    return data?.notFoundPage?.data;
  } catch (error) {
    // TODO ADD ERROR MESSAGES TO I18N
    throw new Error(
      'Oops! Something went wrong on our server. We apologize for the inconvenience. Please try again later.',
    );
  }
};

const NotFoundPage = async () => {
  const data = await getNotFoundPage();
  const { origin } = new URL(process.env.STRAPI_BACKEND_URL as string);

  return (
    <div>
      <Heading1>{data?.attributes?.title}</Heading1>
      <Markdown strapiBackendURL={origin}>{data?.attributes?.body}</Markdown>
    </div>
  );
};

export default NotFoundPage;
