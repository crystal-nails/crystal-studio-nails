import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const hasCookie = request.cookies.get('admin_auth');

  if (isAdminPath && !hasCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};