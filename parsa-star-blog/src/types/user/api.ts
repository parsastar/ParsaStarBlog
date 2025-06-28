import { TMultiPages, TServerResponse } from "@/types/shared";
import { z } from "zod";
import { userServerSchema } from "./schemas/serverSchema";

const {
    profile: _profile,
    auth: _auth,
    admin: _admin,
} = userServerSchema; // we use server zod validators to create the payload type of user actions

// actual user type that we use for the client
export type TUser = z.infer<typeof _admin.update>;
// server responses types
export type TGetUser = TServerResponse & {
    user: Omit<TUser, "password">;
};
export type TGetUsers = TMultiPages & {
    users: Omit<TUser, "password">[];
};
export type TPostUserResponse = TServerResponse & {
    user: Omit<TUser, "password">;
};

// request payloads for post
export type TCreateUserPayload = z.infer<typeof _auth.signUp>;
export type TSignInPayload = z.infer<typeof _auth.logIn>
export type TEditUserPayload = z.infer<typeof _admin.update>;
export type TUserProfilePayload = z.infer<typeof _profile.profile>;
export type TChangeUserPasswordPayload = z.infer<typeof _profile.changePassword>;
