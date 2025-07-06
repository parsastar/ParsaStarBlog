"use client";
import {
    ImageDeleteAction,
    imageUploadAction,
} from "@/server/actions/files/Image";
import StatusCodes from "@/server/lib/constants";

// How many images to upload in parallel per batch
const CHUNK_SIZE = 3;

// Type for a single image upload item
export type ImageUploadItem<TPath extends string> = {
    imageFile?: File | null; //  Image File : file we want to upload
    imageUrl?: string | null; //  ImageUrl : which is the url in our state ( could ne null or a string url
    initialImageUrl?: string | null; //  initialImageUrl default image url come from the api and set for the default data of the state
    filePath: TPath; // file path: this is for the react hook form or any stateFull form to update after upload
    imagePath: TPath; // imagePath : this is for the react hook form or any stateFull form to update the new  sending image url after upload
};

// Return type for uploaded image
type UploadedImage<TPath extends string> = {
    imageUrl?: string | null;
    filePath: TPath;
    imagePath: TPath;
};

// MAIN HANDLER
export async function ImageUploadHandler<TPath extends string>(
    images: ImageUploadItem<TPath>[]
): Promise<UploadedImage<TPath>[]> {
    // make the array given to chunks this helps our requests to face failure less
    // the number of images trying to be uploaded parallel will be handled by chunk size
    const chunks = chunkArray(images, CHUNK_SIZE);
    const uploaded: UploadedImage<TPath>[] = [];

    try {
        for (const chunk of chunks) {
            const result = await uploadImageChunk(chunk);
            uploaded.push(...result);
        }

        return uploaded;
    } catch (error) {
        console.error("Image upload failed:", error);
        return [];
    }
}

// Upload a chunk (parallelized)
async function uploadImageChunk<TPath extends string>(
    chunk: ImageUploadItem<TPath>[]
): Promise<UploadedImage<TPath>[]> {
    return Promise.all(
        chunk.map(
            async ({
                imageFile,
                imageUrl,
                filePath,
                imagePath,
                initialImageUrl,
            }) => {
                try {
                    // this is the actual logic of this function first we chick if theres a need to delete any Image
                    // if the initialImageUrl exist it means we had an image in our db and so if its not equal to the image Url or if the image File exists theres a delete to be handled (the image is going to be changed or deleted in both scenarios we should delete the image )
                    if (
                        initialImageUrl &&
                        (imageFile || imageUrl != initialImageUrl)
                    ) {
                        const res = await ImageDeleteAction(initialImageUrl);

                        if (res.status !== StatusCodes.success) {
                            throw new Error("Image deletion failed");
                        }
                    }
                    // check if theres no image file so we don not need to upload a new image
                    if (!imageFile) {
                        return { imageUrl: null, filePath, imagePath };
                    }

                    // Upload new image
                    const uploadRes = await imageUploadAction(imageFile);
                    if (uploadRes.status !== StatusCodes.success) {
                        throw new Error("Image upload failed");
                    }

                    return {
                        imageUrl: uploadRes.url,
                        filePath,
                        imagePath,
                    };
                } catch (error) {
                    console.error("Chunk upload error:", error);
                    return { imageUrl, filePath, imagePath }; // fallback: return original state
                }
            }
        )
    );
}

// Helper: Split array into chunks
function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}
