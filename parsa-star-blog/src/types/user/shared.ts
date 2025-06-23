export type TUserRoles = "user" | "author" | "admin";
export const userRolesArray = ["user", "author", "admin"] as const;
export type userSocials = {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
};
