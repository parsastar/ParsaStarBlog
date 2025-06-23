import { TMultiPages, TServerResponse } from "@/types/shared";
import { TUserRoles, userSocials } from "./shared";

// actual user type that we use for the client
export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    role: TUserRoles;
    email: string;
    about?: string;
    socials?: userSocials;
    phoneNumber?: string;
    website?: string;
    password: string;
};
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
export type TCreateUserPayload = Omit<TUser, "id">;
export type TPutUserPayload = Omit<TUser, "id" | "password">;
export type TChangeUserPasswordPayload = TUser["password"];
