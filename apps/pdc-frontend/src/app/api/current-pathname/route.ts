import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { GET_PRODUCT_BY_SLUG } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetProductBySlugQuery } from '../../../../gql/graphql';

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
  const { data } = await fetchData<{ data: GetProductBySlugQuery }>({
    url: createStrapiURL(),
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug: slug,
      locale: locale,
      pageMode: 'LIVE',
    },
  });

  if (!data || data?.products?.data?.length === 0) {
    return NextResponse.json({ localizations: [] });
  }
  const localizations =
    data.products?.data[0]?.attributes?.localizations?.data.map(({ attributes }) => attributes) || [];
  localizations.push({
    locale: data.products?.data[0]?.attributes?.locale,
    slug: data.products?.data[0]?.attributes?.slug as string,
  });

  const routeData = localizations.map((product) => ({
    pathname: `/${product?.locale}/${segment}/${product?.slug}`,
    locale: product?.locale,
  }));

  return NextResponse.json({ localizations: routeData });
}
