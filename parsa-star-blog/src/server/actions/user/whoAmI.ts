"use server";
import { redis } from "@/db/redis/redis";
import StatusCodes from "@/server/lib/constants";
import { getSessionCookie } from "@/server/lib/cookies";
import { ShortResponses } from "@/server/lib/shortResponses";
import { userRolesArray } from "@/types/user/shared";
import { cache } from "react";
import { z } from "zod";
const sessionSchema = z.object({
    role: z.enum(userRolesArray),
    userId: z.string(),
});

type TUserSession = z.infer<typeof sessionSchema>;
export const getSessionOnEdge = cache(async (sessionId: string) => {
    const rawSession = await redis.get(`session:${sessionId}`);
    const { success, data } = sessionSchema.safeParse(rawSession);
    if (!success) {
        return ShortResponses.unAuthorized();
    }
    return {
        message: "session found successfully",
        status: StatusCodes.success,
        session: data,
    };
});

export const getCurrentUser = async (): Promise<{
    message: string;
    status: number;
    session?: TUserSession;
}> => {
    try {
        const sessionId = await getSessionCookie();
        if (!sessionId?.value) return ShortResponses.unAuthorized();
        const session = await getSessionOnEdge(sessionId.value);
        return session;
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
