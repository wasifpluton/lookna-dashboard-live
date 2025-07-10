import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let url = request.nextUrl.clone();

  const authPaths = ["/", "/login"];

  const adminPaths = ["/", "/dashboard"];

  const cookieValue = request.cookies.get("lookna_admin")?.value;

  const userDetail = cookieValue ? JSON?.parse(cookieValue) : undefined;

  const isLoggin = userDetail ? true : false;

  const userType = userDetail?.data?.user?.role;

  if (isLoggin) {
    if (
      userType === "Admin" &&
      !(pathname === "/" || pathname === "/dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else if (!isLoggin && !authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/video/:path*"],
};
