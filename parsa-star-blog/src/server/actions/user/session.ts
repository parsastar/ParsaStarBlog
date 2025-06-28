"use server";
import { redis } from "@/db/redis/redis";

import crypto from "crypto";
import { userRolesArray } from "@/types/user/shared";
import { z } from "zod";
import { RemoveSessionCookie, setSessionCookie } from "@/server/lib/cookies";
import { session_expiration_date } from "@/server/constants";
import { ShortResponses } from "@/server/lib/shortResponses";
import StatusCodes from "@/server/lib/constants";

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

export const getSession = async (sessionId: string) => {
    const session = (await redis.get(`session:${sessionId}`)) as
        | TUserSession
        | undefined;
    if (!session) {
        await RemoveSessionCookie();
        return ShortResponses.unAuthorized();
    }

    return {
        status: StatusCodes.success,
        session,
    };
};

export const RemoveSession = async (sessionId: string) => {
    await RemoveSessionCookie();
    try {
        await redis.del(`session:${sessionId}`);
        return {
            message: "logged out successfully",
            status: StatusCodes.success,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
