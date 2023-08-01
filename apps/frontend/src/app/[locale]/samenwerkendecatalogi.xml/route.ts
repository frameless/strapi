import { convertJsonToXML } from '@frameless/samenwerkende-catalogi';
import { NextRequest, NextResponse } from 'next/server';
import { GET_SAMENWERKENDECATALOGI_FETCH } from '@/query';
import { fetchData } from '@/util/fetchData';

export async function GET(_request: NextRequest, ctx: any) {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
    query: GET_SAMENWERKENDECATALOGI_FETCH,
    variables: {
      locale: ctx.params.locale,
    },
  });

  if (data && data.products && data.products?.data.length > 0) {
    const xml = convertJsonToXML(data.products.data, process.env.FRONTEND_DOMAIN as string);
    return new Response(xml, {
      status: 200,
      headers: {
        'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
        'content-type': 'application/xml; charset=utf-8',
      },
    });
  }
  return NextResponse.redirect(new URL(process.env.FRONTEND_DOMAIN as string));
}
