import { z } from "zod";

export type TServerResponse = {
    status: number;
    message: string;
};
export type TMultiPages = TServerResponse & {
    totalPages: number;
    currentPage: number;
};

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const imageFileSchema = {
    imageFile: z
        .any()
        .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            "maximum file size should be  5mb"
        )
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "accepted file types are :  jpg/jpeg/png/webp"
        )
        .nullable()
        .optional(),
};
