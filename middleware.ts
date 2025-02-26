import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = !!token;

    // Define paths that don't require authentication
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/signup');

    // Define paths that require authentication
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/profile') ||
        request.nextUrl.pathname.startsWith('/billing') ||
        request.nextUrl.pathname.startsWith('/reports');

    // Check for fake auth in localStorage (for debug purposes)
    const hasFakeAuth = request.cookies.get('fakeAuth')?.value === 'true';

    // If it's an auth page and user is already logged in, redirect to dashboard
    if (isAuthPage && (isAuthenticated || hasFakeAuth)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If it's a protected route and user is not logged in, redirect to login
    if (isProtectedRoute && !isAuthenticated && !hasFakeAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/signup',
        '/dashboard/:path*',
        '/admin/:path*',
        '/profile/:path*',
        '/billing/:path*',
        '/reports/:path*',
    ],
};