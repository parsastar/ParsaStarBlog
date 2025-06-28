import { NextRequest, NextResponse } from "next/server";
import { Cookie_Session_Key } from "./server/constants";

export async function middleware(req: NextRequest) {
    return await middlewareAuth(req);
}

const authPaths = ["/signin", "/signup"];
const dashboardPath = "/dashboard";

const middlewareAuth = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const sessionCookie = req.cookies.get(Cookie_Session_Key)?.value;
    if (sessionCookie && authPaths.includes(pathname)) {
        console.log(1);
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (!sessionCookie && pathname.startsWith(dashboardPath)) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next(); 
};

export const config = {
    matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
