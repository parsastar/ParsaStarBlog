"use server";
import { redis } from "@/db/redis/redis";
import StatusCodes from "@/server/lib/constants";
import crypto from "crypto";
import { userRolesArray } from "@/types/user/shared";
import { z } from "zod";
import { setSessionCookie } from "@/server/lib/cookies";
import { session_expiration_date } from "@/server/constants";

const sessionSchema = z.object({
    role: z.enum(userRolesArray),
    userId: z.string(),
});

type TUserSession = z.infer<typeof sessionSchema>;
export const createSession = async (user: TUserSession) => {
    const { data, success, error } = sessionSchema.safeParse(user);
    if (!success) {
        return {
            status: StatusCodes.badRequest,
            error: error.issues.map((error) => error.message),
            message: "given data for session is not passing the schema",
        };
    }

    try {
        const sessionId = crypto.randomBytes(512).toString("hex").normalize();
        await redis.set(`session:${sessionId}`, data, {
            ex: session_expiration_date,
        });
        await setSessionCookie(sessionId);
    } catch (error) {}
};
