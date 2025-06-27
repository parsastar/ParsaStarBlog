"use server";
import { redis } from "@/db/redis/redis";
import StatusCodes from "@/server/lib/constants";
import crypto from "crypto";
import { userRolesArray } from "@/types/user/shared";
import { z } from "zod";
import { setSessionCookie } from "@/server/lib/cookies";
import { session_expiration_date } from "@/server/constants";
import { ShortResponses } from "@/server/lib/shortResponses";

const sessionSchema = z.object({
    role: z.enum(userRolesArray),
    userId: z.string(),
});

type TUserSession = z.infer<typeof sessionSchema>;
export const createSession = async (user: TUserSession) => {
    const { data, success, error } = sessionSchema.safeParse(user);
    if (!success) {
        return ShortResponses.schemaError(error, "Invalid Data for session");
    }

    try {
        const sessionId = crypto.randomBytes(512).toString("hex").normalize();
        await redis.set(`session:${sessionId}`, data, {
            ex: session_expiration_date,
        });
        await setSessionCookie(sessionId);
    } catch (error) {}
};
