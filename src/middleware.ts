import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't need authentication
  const publicPaths = ['/login'];
  const isPublicPath = publicPaths.includes(path);
  
  // Get authentication status from cookies
  const token = request.cookies.get('token')?.value || '';
  
  // Redirect logic
  if (!isPublicPath && !token) {
    // Redirect to login if accessing protected route without token
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isPublicPath && token) {
    // Redirect to dashboard if already logged in but trying to access login page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
  ],
};