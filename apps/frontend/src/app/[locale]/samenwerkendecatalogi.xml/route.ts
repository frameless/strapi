import { convertJsonToXML } from '@frameless/samenwerkende-catalogi';
import { NextRequest, NextResponse } from 'next/server';
import { GET_SAMENWERKENDECATALOGI_FETCH } from '@/query';

export async function GET(_request: NextRequest, ctx: any) {
  const response = await fetch(process.env.STRAPI_BACKEND_URL as string, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_SAMENWERKENDECATALOGI_FETCH,
      variables: {
        locale: ctx.params.locale,
      },
    }),
  });

  const { data } = await response.json();

  if (data && data.products && data.products?.data.length > 0) {
    const xml = convertJsonToXML(data.products.data, process.env.STRAPI_FRONTEND_URL as string);
    return new Response(xml, {
      status: 200,
      headers: {
        'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
        'content-type': 'application/xml',
      },
    });
  }
  return NextResponse.redirect(new URL(process.env.STRAPI_FRONTEND_URL as string));
}
