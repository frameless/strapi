import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { GetProductBySlugQuery } from '../../../../gql/graphql';

import { GET_PRODUCT_BY_SLUG } from '@/query';
import { fetchData, getStrapiGraphqlURL } from '@/util';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');
  const segment = searchParams.get('segment');

  if (!slug) {
    return NextResponse.json({ localizations: [] });
  }

  const cookieStore = await cookies();
  cookieStore.set('slug', slug);
  const { data } = await fetchData<{ data: GetProductBySlugQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug: slug,
      locale: locale,
      status: 'PUBLISHED',
    },
  });

  if (!data || data?.products?.length === 0) {
    return NextResponse.json({ localizations: [] });
  }
  const localizations = data.products[0]?.localizations?.map((localization) => localization) || [];
  localizations.push({
    locale: data.products[0]?.locale,
    slug: data.products[0]?.slug as string,
  });

  const routeData = localizations.map((product) => ({
    pathname: `/${product?.locale}/${segment}/${product?.slug}`,
    locale: product?.locale,
  }));

  return NextResponse.json({ localizations: routeData });
}
