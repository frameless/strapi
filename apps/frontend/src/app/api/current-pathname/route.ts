import { draftMode } from 'next/headers';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { GET_PRODUCT_BY_SLUG_FETCH } from '@/query';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');
  const segment = searchParams.get('segment');

  if (!slug) {
    return NextResponse.json({ localizations: [] });
  }

  const cookieStore = cookies();
  cookieStore.set('slug', slug);
  const { isEnabled } = draftMode();
  const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_PRODUCT_BY_SLUG_FETCH,
      variables: {
        slug: slug,
        locale: locale,
        pageMode: isEnabled ? 'PREVIEW' : 'LIVE',
      },
    }),
  });

  const { data } = await response.json();

  if (!data || data?.products?.data?.length === 0) {
    return NextResponse.json({ localizations: [] });
  }
  const localizations =
    data.products.data[0]?.attributes?.localizations.data.map(({ attributes }: any) => attributes) || [];
  localizations.push({
    locale: data.products.data[0]?.attributes.locale,
    slug: data.products.data[0]?.attributes.slug,
  });

  const routeData = localizations.map((product: any) => ({
    pathname: `/${product.locale}/${segment}/${product.slug}`,
    locale: product.locale,
  }));

  return NextResponse.json({ localizations: routeData });
}
