import { NextRequest, NextResponse } from "next/server";
import { Cookie_Session_Key } from "./server/constants";
import { getSessionOnEdge } from "./server/actions/user/whoAmI";
import StatusCodes from "./server/lib/constants";

export async function middleware(req: NextRequest) {
    return await middlewareAuth(req);
}

const authPaths = ["/signin", "/signup"];
const dashboardPath = "/dashboard";

const middlewareAuth = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const sessionCookie = req.cookies.get(Cookie_Session_Key)?.value;

    if (sessionCookie && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname.startsWith(dashboardPath)) {
        if (!sessionCookie)
            return NextResponse.redirect(new URL("/signin", req.url));
        else {
            const res = await getSessionOnEdge(sessionCookie);
            if (res.status !== StatusCodes.success) {
                const res = NextResponse.redirect(new URL("/signin", req.url));
                res.cookies.delete(Cookie_Session_Key);
                return res;
            }
        }
    }
    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
