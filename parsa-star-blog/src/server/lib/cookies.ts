"use server";
import { cookies } from "next/headers";
import { Cookie_Session_Key, session_expiration_date } from "../constants";

export const setSessionCookie = async (sessionId: string) => {
    const cookieStore = await cookies();
    return cookieStore.set(Cookie_Session_Key, sessionId, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: session_expiration_date,
    });
};
