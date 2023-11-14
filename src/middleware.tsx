import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req })
  console.log(`middleware:[${pathname}]:${token?.email}`)

  if (pathname.startsWith("/login")) {
    if (token) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    } else {
      return NextResponse.next()
    }
  }

  if (token) {
    return NextResponse.next()
  }

  // If no token, redirect to the login page
  const url = req.nextUrl.clone()
  url.pathname = "/login"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)",
}
