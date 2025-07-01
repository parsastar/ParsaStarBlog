
import { signUpAction } from "@/server/actions/user/auth";
import { TPostUserPayload } from "@/types/user/api";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = (await request.json()) as TPostUserPayload;
    const result = await signUpAction(payload);
    return NextResponse.json(result);
}
