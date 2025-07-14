import {
    DeleteCategoryAction,
    getCategoryById,
    putCategoryAction,
} from "@/server/actions/category/category";
import { TPutCategoryPayload } from "@/types/categories/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ categoryId: string }>;
    }
) {
    const { categoryId } = await params;
    const res = await getCategoryById(Number(categoryId));
    return NextResponse.json(res);
}

export async function DELETE(
    _req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ categoryId: string }>;
    }
) {
    const { categoryId } = await params;
    const res = DeleteCategoryAction(Number(categoryId));
    return NextResponse.json(res);
}

export async function PUT(
    _req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ categoryId: string }>;
    }
) {
    const { categoryId } = await params;
    const payload: TPutCategoryPayload = await _req.json();
    const res = putCategoryAction(payload, Number(categoryId));

    return NextResponse.json(res);
}
