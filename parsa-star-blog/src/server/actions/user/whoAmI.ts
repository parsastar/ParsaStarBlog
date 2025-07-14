"use server";
import { db } from "@/db";
import { redis } from "@/db/redis/redis";
import { userT } from "@/db/schema";
import StatusCodes from "@/server/lib/constants";
import { getSessionCookie } from "@/server/lib/cookies";
import { ShortResponses } from "@/server/lib/shortResponses";
import { userRolesArray } from "@/types/user/shared";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { z } from "zod";
const sessionSchema = z.object({
    role: z.enum(userRolesArray),
    userId: z.string(),
});

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

export const getCurrentUser = async () => {
    try {
        const sessionId = await getSessionCookie();
        if (!sessionId?.value) return ShortResponses.unAuthorized();
        const session = await getSessionOnEdge(sessionId.value);
        if (session.status !== StatusCodes.success) {
            return session;
        }
        const userId = session.session.userId;
        const user = await db.query.userT.findFirst({
            columns: {
                salt: false,
                password: false,
            },
            where: eq(userT.id, Number(userId)),
        });
        if (!user) {
            return ShortResponses.notFoundError("user");
        }
        return {
            status: StatusCodes.success,
            message: "current user information has been sent successfully",
            user,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
