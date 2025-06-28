import { redis } from "@/db/redis/redis";
import StatusCodes from "@/server/lib/constants";
import { getSessionCookie, RemoveSessionCookie } from "@/server/lib/cookies";
import { ShortResponses } from "@/server/lib/shortResponses";
import { userRolesArray } from "@/types/user/shared";
import { cache } from "react";
import { z } from "zod";
const sessionSchema = z.object({
    role: z.enum(userRolesArray),
    userId: z.string(),
});

type TUserSession = z.infer<typeof sessionSchema>;
export const getSessionOnEdge = async (sessionId: string) => {
    const session: TUserSession | undefined | null = await redis.get(
        `session:${sessionId}`
    );

    if (!session) {
        await RemoveSessionCookie();
        return ShortResponses.unAuthorized();
    }

    return {
        status: StatusCodes.success,
        session,
    };
};

export const getCurrentUser = cache(async () => {
    try {
        const sessionId = await getSessionCookie();
        if (!sessionId || !sessionId.value) return ShortResponses.unAuthorized();
        const session = await getSessionOnEdge(sessionId.value);
        return session;
    } catch (error) {
        return ShortResponses.severError(error);
    }
});
