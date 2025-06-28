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

export const getSessionCookie = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(Cookie_Session_Key);
};

export const RemoveSessionCookie = async () => {
    const cookieStore = await cookies();
    return cookieStore.delete(Cookie_Session_Key);
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name);
};

export const removeCookie = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.delete(name);
};
