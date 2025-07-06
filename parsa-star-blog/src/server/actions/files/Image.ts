"use server";
import StatusCodes from "@/server/lib/constants";
import { v2 as cloudinary } from "cloudinary";

import { extractPublicId } from "cloudinary-build-url";
import { Readable } from "stream";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function imageUploadAction(file: File) {
    try {
        if (!file) {
            return {
                message: "No image provided",
                status: StatusCodes.badRequest,
            };
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const stream = Readable.from(buffer);

        const uploadResult = await new Promise<{
            secure_url: string;
        }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "your-folder-name", // optional
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result);
                }
            );

            stream.pipe(uploadStream);
        });

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

export async function ImageDeleteAction(url: string) {
    try {
        await cloudinary.uploader.destroy(extractPublicId(url));
        return {
            message: "Image deleted successfully",
            status: StatusCodes.success,
        };
    } catch (error) {
        console.error("[Cloudinary Delete Error]", error);
        return {
            message: "Failed to delete image",
            status: StatusCodes.internalServerError,
        };
    }
}
