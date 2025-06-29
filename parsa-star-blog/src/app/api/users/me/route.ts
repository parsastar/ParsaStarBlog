import { getCurrentUser } from "@/server/actions/user/whoAmI";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await getCurrentUser();
    return NextResponse.json(res);
}
