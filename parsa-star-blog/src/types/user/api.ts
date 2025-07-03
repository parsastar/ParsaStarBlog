import { TMultiPages, TServerResponse } from "@/types/shared";
import { z } from "zod";
import { userServerSchema } from "./schemas/serverSchema";

const { profile: _profile, auth: _auth, admin: _admin } = userServerSchema; // we use server zod validators to create the payload type of user actions

// actual user type that we use for the client
export type TUser = z.infer<typeof _admin.update>;
export type TUserWithoutPassword = Omit<TUser, "password">;
// server responses types
export type TGetUser = TServerResponse & {
    user: TUserWithoutPassword;
};
export type TGetUsers = TMultiPages & {
    users: TUserWithoutPassword[];
};
export type TPostUserResponse = TServerResponse & {
    user: TUserWithoutPassword;
};

// request payloads for post
export type TSingUpPayload = z.infer<typeof _auth.signUp>;
export type TSignInPayload = z.infer<typeof _auth.signin>;
export type TPutUserPayload = Omit<z.infer<typeof _admin.update>, "imageFile">;
export type TPostUserPayload = Omit<z.infer<typeof _admin.create>, "imageFile">;
export type TUserProfilePayload = z.infer<typeof _profile.profile>;
export type TChangeUserPasswordPayload = z.infer<
    typeof _profile.changePassword
>;
