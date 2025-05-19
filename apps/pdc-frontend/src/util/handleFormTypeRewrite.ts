import { NextRequest, NextResponse } from 'next/server';

const detectFormTypeFromPath = (pathname: string): 'form' | 'formulier' | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[1] === 'formulier') return 'formulier';
  if (segments[1] === 'form') return 'form';
  return null;
};

export const handleFormTypeRewrite = (req: NextRequest, headers: Headers, responseHeaders: Record<string, string>) => {
  const formType = detectFormTypeFromPath(req.nextUrl.pathname);
  const isValid = formType === 'form' || formType === 'formulier';

  if (!isValid) return null;

  const url = req.nextUrl.clone();

  if (!url.searchParams.has('formType')) {
    url.searchParams.set('formType', formType);
    const rewriteResponse = NextResponse.rewrite(url, { headers: responseHeaders });
    rewriteResponse.cookies.set('formType', formType);
    return rewriteResponse;
  }

  return NextResponse.next({
    request: { headers },
    headers: responseHeaders,
  });
};
