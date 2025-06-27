import { logOutAction } from "@/server/actions/user/auth";
import { NextResponse } from "next/server";

export async function POST() {
    const result = await logOutAction();
    return NextResponse.json(result);
}
