import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { GET_PRODUCT_BY_SLUG_AND_LOCALE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');
  const locale = searchParams.get('locale');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return new Response('Invalid token', { status: 401 });
  } else if (!slug || !type) {
    return new Response('Missing required parameters', { status: 422 });
  }

  const getCurrentPage = (type: string) => {
    switch (type) {
      case 'products':
        return {
          path: `/${locale}/${type}/${slug}`,
          query: GET_PRODUCT_BY_SLUG_AND_LOCALE,
        };
      default:
        return {};
    }
  };

  const { data } = await fetchData<{ data: any }>({
    url: createStrapiURL(),
    query: getCurrentPage(type).query,
    variables: {
      pageMode: 'PREVIEW',
    },
  });

  if (!data) {
    return new Response('Invalid slug', { status: 401 });
  }

  const path = getCurrentPage(type).path;

  // Enable Draft Mode by setting the cookie
  draftMode().enable();
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(path ? path : '/');
}
