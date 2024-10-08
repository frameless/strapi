import { Heading1, Page, PageContent, RichText } from '@/components';
import { Markdown } from '@/components/Markdown';
import { GET_NOT_FOUND_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { getImageBaseUrl } from '@/util/getImageBaseUrl';

const NotFoundPage = async () => {
  new Response(null, { status: 404 });
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_NOT_FOUND_PAGE,
  });
  return (
    <Page>
      <PageContent className="utrecht-custom-page-content">
        <RichText>
          <Heading1>{data?.notFoundPage?.data?.attributes?.title}</Heading1>
          <Markdown imageUrl={getImageBaseUrl()}>{data?.notFoundPage?.data?.attributes?.body}</Markdown>
        </RichText>
      </PageContent>
    </Page>
  );
};

export default NotFoundPage;
