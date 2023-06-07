import { RedirectType } from 'next/dist/client/components/redirect';
import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { GET_PRODUCT_BY_SLUG_AND_LOCALE_FETCH } from '@/query';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type');
  const locale = searchParams.get('locale');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_PRODUCT_BY_SLUG_AND_LOCALE_FETCH,
      variables: {
        slug: slug,
        locale,
        pageMode: secret ? 'PREVIEW' : 'LIVE',
      },
    }),
  });

  const { data } = await response.json();

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!data || data.products.data.length === 0) {
    return new Response('Invalid slug', { status: 401 });
  }

  const path = `/${locale}/${type}/${data.products?.data[0]?.attributes.slug}?secret=${process.env.PREVIEW_SECRET_TOKEN}`;
  // Enable Draft Mode by setting the cookie
  cookies().set('secret', secret);

  draftMode().enable();
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(path, RedirectType.replace);
}
