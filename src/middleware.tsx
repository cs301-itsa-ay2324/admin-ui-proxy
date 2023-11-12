import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow if it's a request for the login page or next-auth session & provider fetching
  if (pathname.includes('/login') || pathname.includes('/api/auth')) {
    return NextResponse.next();
  }

  // If the token exists, allow the request
  const token = await getToken({ req });
  if (token) {
    return NextResponse.next();
  }

  // If no token, redirect to the login page
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = { matcher: "/((?!.*\\.).*)" };