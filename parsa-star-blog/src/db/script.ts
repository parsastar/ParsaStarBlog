import "dotenv/config";
import { db } from "@/db";
import { sql } from "drizzle-orm";

async function resetDatabase() {
  try {
    await db.execute(sql`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          -- Disable referential integrity temporarily
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS "' || r.tablename || '" CASCADE';
          END LOOP;
      END $$;
    `);

    console.log("✅ All tables dropped.");
  } catch (error) {
    console.error("❌ Failed to reset database:", error);
  } finally {
    process.exit();
  }
}

resetDatabase();