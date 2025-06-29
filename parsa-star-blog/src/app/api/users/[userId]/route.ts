import {
    deleteUserAction,
    GetUserById,
    putUserAction,
} from "@/server/actions/user/user";
import { TPutUserPayload } from "@/types/user/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const res = await GetUserById(Number(userId));
    return NextResponse.json(res);
}

export async function DELETE({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const res = await deleteUserAction(Number(userId));
    return NextResponse.json(res);
}

export async function PUT(
    req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ userId: string }>;
    }
) {
    const { userId } = await params;
    const payload: TPutUserPayload = await req.json();
    const res = await putUserAction({ ...payload, id: Number(userId) });
    return NextResponse.json(res);
}
