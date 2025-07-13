import {
    getCategories,
    postCategoryAction,
} from "@/server/actions/category/category";
import { TPostCategoryPayload } from "@/types/categories/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const res = await getCategories();
    return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
    const payload: TPostCategoryPayload = await req.json();
    const res = await postCategoryAction(payload);
    return NextResponse.json(res);
}
