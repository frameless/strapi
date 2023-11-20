import { Heading1 } from '@utrecht/component-library-react/dist/css-module';
import { Markdown } from '@/components/Markdown';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

const NotFoundPage = async () => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
  });
  return (
    <div>
      <Heading1>{data?.notFoundPage?.data?.attributes?.title}</Heading1>
      <Markdown imageUrl={getImageBaseUrl()}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
    </div>
  );
};

export default NotFoundPage;
