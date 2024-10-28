import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
    const publicPaths = ['/auth/login', '/auth/signup','/']
    const isPublicPath = publicPaths.includes(path)
    const token = request.cookies.get("token")?.value || ''

    // If the user is logged in and trying to access a public path (login, signup, or homepage),
    // redirect them to the dashboard
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    // If the user is not authenticated and trying to access a protected path,
    // redirect them to the login page
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    // Continue with the request if none of the conditions match
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/auth/login',
        '/auth/signup',
        '/dashboard'
    ]
}
