import { sql, SQL } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const lower = (column: t.AnyPgColumn): SQL => sql`lower(${column})`;

export const defaultTimeStamps = {
    updated_at: t
        .timestamp()
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    created_at: t.timestamp().defaultNow().notNull(),
    // deleted_at: t.timestamp(),
};


export const generateIndexName  = (table: string, field: string) => `${table}_${field}_index`;