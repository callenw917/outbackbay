import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    salt: 'next-auth',
  } as const);

  // Check if route starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token?.isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
