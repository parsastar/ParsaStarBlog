import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL as string);
export const db = drizzle({ client: sql, casing: "snake_case", logger: true });
