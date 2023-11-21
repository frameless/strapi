import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import {GET_ARTICLE_BY_SLUG, GET_HOMEPAGE, GET_NAVIGATION_PAGE_BY_SLUG, GET_THEME_BY_SLUG} from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return new Response('Invalid token', { status: 401 });
  } else if (!slug || !type) {
    return new Response('Missing required parameters', { status: 422 });
  }

  const getCurrentPage = (type: string) => {
    switch (type) {
      case 'Homepage':
        return {
          path: '/',
          query: GET_HOMEPAGE,
        };
      case 'Hoofditem':
        return {
          path: `/${slug}`,
          query: GET_NAVIGATION_PAGE_BY_SLUG,
        };
      case 'ThemaContent':
        return {
          path: `/content/${slug}`,
          query: GET_ARTICLE_BY_SLUG,
        };
      case 'Thema':
        return {
          path: `/thema/${slug}`,
          query: GET_THEME_BY_SLUG,
        };
      default:
        return {};
    }
  };

  const { data } = await fetchData({
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
