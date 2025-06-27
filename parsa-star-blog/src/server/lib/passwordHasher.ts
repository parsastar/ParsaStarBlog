import crypto from "crypto";
export const hashPassword = (password: string, salt: string): Promise<string> =>
    new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
            if (error) reject(error);
            resolve(hash.toString("hex").normalize());
        });
    });

export const generateSalt = async () =>
    crypto.randomBytes(16).toString("hex").normalize();

export const comparePassword = async ({
    password,
    hashedPassword,
    salt,
}: {
    password: string;
    salt: string;
    hashedPassword: string;
}): Promise<boolean> => {
    const hashedGivenPass = await hashPassword(password, salt);
    return crypto.timingSafeEqual(
        Buffer.from(hashedGivenPass, "hex"),
        Buffer.from(hashedPassword, "hex")
    );
};
