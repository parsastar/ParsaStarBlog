import { NextRequest, NextResponse } from "next/server";
import {
    IncomingForm,
    Files,
    Fields,
    File as FormidableFile,
} from "formidable";
import { readFile } from "fs/promises";

import StatusCodes from "@/server/lib/constants";
import {
    ImageDeleteAction,
    imageUploadAction,
} from "@/server/actions/files/Image";

export const dynamic = "force-dynamic";

// Convert formidable file to browser-like File
async function toBrowserFile(file: FormidableFile): Promise<File> {
    const buffer = await readFile(file.filepath);
    return new File([buffer], file.originalFilename ?? "upload.jpg", {
        type: file.mimetype ?? "image/jpeg",
    });
}

export async function POST(req: NextRequest) {
    const form = new IncomingForm({
        multiples: false,
        keepExtensions: true,
    });

    try {
        const { files } = await new Promise<{ fields: Fields; files: Files }>(
            (resolve, reject) => {
                // Required cast: Next.js Request doesn't expose IncomingMessage directly
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                form.parse(req as any, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            }
        );

        const imageFile = files.image;
        const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

        if (!file || !("filepath" in file)) {
            return Response.json({
                message: "No image provided",
                status: StatusCodes.badRequest,
            });
        }

        const browserFile = await toBrowserFile(file);
        const result = await imageUploadAction(browserFile);

        return Response.json(result);
    } catch (error) {
        console.error("[Cloudinary Upload Error]", error);
        return Response.json({
            message: "Failed to upload image",
            status: StatusCodes.internalServerError,
        });
    }
}

export async function DELETE(req: NextRequest) {
    const { url } = (await req.json()) as { url: string };
    const res = await ImageDeleteAction(url);
    return NextResponse.json(res);
}
