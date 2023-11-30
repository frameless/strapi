import { convertJsonToXML } from '@frameless/samenwerkende-catalogi';
import { NextRequest, NextResponse } from 'next/server';
import { GET_SAMENWERKENDECATALOGI } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetSamenwerkendecatalogiQuery } from '../../../../gql/graphql';

export async function GET(_request: NextRequest, ctx: any) {
  const { data } = await fetchData<{ data: GetSamenwerkendecatalogiQuery }>({
    url: createStrapiURL(),
    query: GET_SAMENWERKENDECATALOGI,
    variables: {
      locale: ctx.params.locale,
    },
  });

  if (data && data.products && data.products?.data.length > 0) {
    const xml = convertJsonToXML(data.products.data as [], process.env.FRONTEND_PUBLIC_URL as string);
    return new Response(xml, {
      status: 200,
      headers: {
        'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
        'content-type': 'application/xml; charset=utf-8',
      },
    });
  }
  return NextResponse.redirect(new URL(process.env.FRONTEND_PUBLIC_URL as string));
}
