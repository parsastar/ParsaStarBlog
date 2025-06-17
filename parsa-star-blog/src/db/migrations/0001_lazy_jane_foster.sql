ALTER TABLE "users" ADD COLUMN "password" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "salt" varchar(100) NOT NULL;