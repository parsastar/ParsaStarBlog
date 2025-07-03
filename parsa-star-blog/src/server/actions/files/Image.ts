("use server");
import StatusCodes from "@/server/lib/constants";
import { v2 as cloudinary } from "cloudinary";
import { IncomingForm, Fields, Files, File } from "formidable";
import fs from "fs";
import { NextRequest } from "next/server";
import { extractPublicId } from "cloudinary-build-url";

export const config = {
    api: {
        bodyParser: false,
    },
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function imageUploadAction(req: NextRequest) {
    const form = new IncomingForm({
        multiples: false,
        keepExtensions: true,
        uploadDir: "/tmp", // Use system tmp folder or make sure this exists
    });

    try {
        const { files } = await new Promise<{ fields: Fields; files: Files }>(
            (resolve, reject) => {
                form.parse(req as any, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            }
        );

        const imageFile = files.image;
        const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

        if (!file || !("filepath" in file)) {
            return {
                message: "No image provided",
                status: StatusCodes.badRequest,
            };
        }

        const uploadResult = await cloudinary.uploader.upload(file.filepath);

        // Delete temp file after upload
        fs.unlinkSync(file.filepath);

        return {
            message: "Uploaded successfully",
            url: uploadResult.secure_url,
            status: StatusCodes.success,
        };
    } catch (error) {
        console.error("[Cloudinary Upload Error]", error);
        return {
            message: "Failed to upload image",
            status: StatusCodes.internalServerError,
        };
    }
}

// src/server/actions/image/deleteImageAction.ts

export async function ImageDeleteAction(url: string): Promise<{
    message: string;
    status: "success" | "error";
}> {
    try {
        await cloudinary.uploader.destroy(extractPublicId(url));
        return {
            message: "Image deleted successfully",
            status: "success",
        };
    } catch (error) {
        console.error("[Cloudinary Delete Error]", error);
        return {
            message: "Failed to delete image",
            status: "error",
        };
    }
}
