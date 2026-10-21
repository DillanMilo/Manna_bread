import { NextResponse, type NextRequest } from 'next/server';
import { isKitchenMomentsPreview } from '@/lib/kitchenMomentsPreview';

export function proxy(request: NextRequest) {
  if (!isKitchenMomentsPreview()) return NextResponse.next();

  const { pathname } = request.nextUrl;
  let response: NextResponse;

  if (pathname === '/') {
    const destination = request.nextUrl.clone();
    destination.pathname = '/kitchen-moments';
    response = NextResponse.redirect(destination);
  } else if (pathname === '/kitchen-moments') {
    response = NextResponse.next();
  } else if (!pathname.startsWith('/api/') && ['GET', 'HEAD'].includes(request.method)) {
    // Only Kitchen Moments is hosted here; ordinary site links open the live site.
    // Do not forward preview/share query parameters to the live site.
    const destination = new URL('https://mannabread.com');
    destination.pathname = pathname;
    response = NextResponse.redirect(destination);
  } else {
    response = new NextResponse('Not found', { status: 404 });
  }

  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
}

export const config = {
  matcher: ['/((?!_next/|images/|favicon.ico).*)'],
};
