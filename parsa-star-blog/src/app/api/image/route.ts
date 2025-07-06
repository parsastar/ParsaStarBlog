import StatusCodes from "@/server/lib/constants";
import { Fields, Files } from "formidable";
import IncomingForm from "formidable/Formidable";
import { NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
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
    } catch (error) {
        console.error("[Cloudinary Upload Error]", error);
        return {
            message: "Failed to upload image",
            status: StatusCodes.internalServerError,
        };
    }
}
