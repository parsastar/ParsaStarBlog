("use server");

import { db } from "@/db";
import { TCreateUserPayload } from "@/types/user/api";

export const signUpAction = (data: TCreateUserPayload) => {
    const { email, firstName, lastName, password, phoneNumber } = data;
    const alreadyUser = db.query.userT.findFirst({});
};
