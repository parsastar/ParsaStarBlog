// import { ZodObject, ZodRawShape } from "zod";

// type TTimeStamps = {
//     created_at?: boolean;
//     updated_at?: boolean;
// };

// export function removeTimeStampsFromSchema<T extends ZodRawShape>(
//     schema: any
// ): ZodObject<Omit<T, "created_at" | "updated_at">> {
//     const keysToOmit: TTimeStamps = {
//         created_at: undefined,
//         updated_at: undefined,
//     } as const;

//     if ("created_at" in schema.shape) keysToOmit.created_at = true;
//     if ("updated_at" in schema.shape) keysToOmit.updated_at = true;

//     return schema.omit(keysToOmit as TTimeStamps) as ZodObject<
//         Omit<T, "created_at" | "updated_at">
//     >;
// }
