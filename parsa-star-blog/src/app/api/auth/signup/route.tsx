import { signUpAction } from "@/server/actions/user/signup";
import { TCreateUserPayload } from "@/types/user/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = (await request.json()) as TCreateUserPayload;
    const result = await signUpAction(payload);
    return NextResponse.json(result);
}
