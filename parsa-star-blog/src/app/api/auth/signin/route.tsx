import { SignInAction } from "@/server/actions/user/singin";

import { TSignInPayload } from "@/types/user/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = (await request.json()) as TSignInPayload;
    const result = await SignInAction(payload);

    return NextResponse.json(result);
}
