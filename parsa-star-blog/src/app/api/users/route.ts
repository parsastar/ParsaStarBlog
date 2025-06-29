import { dashBoardPageSizes } from "@/constant/dashboard";
import { GetUsers, postUserAction } from "@/server/actions/user/user";
import { TFilterUsers } from "@/types/sharedSchema";
import { TPostUserPayload } from "@/types/user/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const userPayload: TPostUserPayload = await req.json();
    const res = await postUserAction(userPayload);
    return NextResponse.json(res);
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const params: TFilterUsers = {
        page: Number(searchParams.get("page")) || 1,
        pageSize:
            Number(searchParams.get("pageSize")) || dashBoardPageSizes.users,
        search: searchParams.get("search"),
        sort: searchParams.get("sort") == "asc" ? "asc" : "dsc",
    };
    const res = await GetUsers(params);
    return NextResponse.json(res);
}
