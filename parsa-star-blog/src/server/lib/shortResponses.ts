import { ZodError } from "zod";
import StatusCodes from "./constants";

const severSchemaErrorResponse = (errors: ZodError, message?: string) => ({
    message: message || "Invalid data",
    status: StatusCodes.badRequest,
    errors: errors.issues.map((error) => error.message),
});
const notFoundError = (name: string) => ({
    status: StatusCodes.notFound,
    message: `${name} not found`,
});
const severError = (error: unknown) => ({
    status: StatusCodes.internalServerError,
    message: "Server error",
    error,
});
export const ShortResponses = {
    notFoundError,
    schemaError: severSchemaErrorResponse,
    severError
};
