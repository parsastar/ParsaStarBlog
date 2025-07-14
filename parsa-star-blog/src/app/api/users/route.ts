import { DashboardPagesDefaults, sortArray, TSort } from "@/constant/dashboard";
import { GetUsers, postUserAction } from "@/server/actions/user/user";
import { TFilterUsers } from "@/types/sharedSchema";
import { TPostUserPayload } from "@/types/user/api";
import { TUserRoles, userRolesArray } from "@/types/user/shared";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const userPayload: TPostUserPayload = await req.json();
    const res = await postUserAction(userPayload);
    return NextResponse.json(res);
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const { startPage, pageSize, sorting } = DashboardPagesDefaults.users;
    const params: TFilterUsers = {
        role: userRolesArray.includes(searchParams.get("role") as TUserRoles)
            ? (searchParams.get("role") as TUserRoles)
            : null, // to be changed
        page: Number(searchParams.get("page")) || startPage,
        pageSize: Number(searchParams.get("pageSize")) || pageSize,
        search: searchParams.get("search") || null,
        sort: sortArray.includes(searchParams.get("sort") as TSort)
            ? (searchParams.get("sort") as TSort)
            : sorting,
    };

    const res = await GetUsers(params);
    return NextResponse.json(res);
}
