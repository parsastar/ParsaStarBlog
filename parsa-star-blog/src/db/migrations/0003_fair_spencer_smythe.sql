CREATE TYPE "public"."report_reasons" AS ENUM('legacy', 'copyright', 'violence', 'lie', 'racism', 'bad_language', 'others');--> statement-breakpoint
CREATE TYPE "public"."request_state" AS ENUM('pending', 'reject', 'verified');--> statement-breakpoint
CREATE TYPE "public"."account_status" AS ENUM('ok', 'restricted', 'banned', 'suspended');--> statement-breakpoint
CREATE TABLE "author_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "author_requests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"moderator_id" integer NOT NULL,
	"description" text,
	"state" "request_state" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report_blog" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "report_blog_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"blog_id" integer NOT NULL,
	"reporter_id" integer NOT NULL,
	"moderator_id" integer NOT NULL,
	"report_reasons" "report_reasons" DEFAULT 'others' NOT NULL,
	"description" text,
	"status" "request_state" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment_report" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comment_report_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"comment_id" integer NOT NULL,
	"reporter_id" integer NOT NULL,
	"moderator_id" integer NOT NULL,
	"report_reasons" "report_reasons" DEFAULT 'others' NOT NULL,
	"description" text,
	"status" "request_state" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "read_later_blogs" (
	"user_id" integer NOT NULL,
	"blog_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "read_later_blogs_user_id_pk" PRIMARY KEY("user_id")
);
--> statement-breakpoint
CREATE TABLE "blog_category" (
	"blog_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "blog_category_blog_id_category_id_pk" PRIMARY KEY("blog_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "blog_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_id" integer NOT NULL,
	"user_id" integer,
	"ip_address" varchar(50),
	"user_agent" varchar(500),
	"viewed_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(200) NOT NULL,
	"image" varchar(300),
	"icon_name" varchar(100),
	"parent_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_category" (
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "user_category_user_id_category_id_pk" PRIMARY KEY("user_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "account_status" "account_status" DEFAULT 'ok' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "suspension_ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "author_requests" ADD CONSTRAINT "author_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "author_requests" ADD CONSTRAINT "author_requests_moderator_id_users_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_blog" ADD CONSTRAINT "report_blog_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_blog" ADD CONSTRAINT "report_blog_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_blog" ADD CONSTRAINT "report_blog_moderator_id_users_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_report" ADD CONSTRAINT "comment_report_comment_id_blog_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."blog_comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_report" ADD CONSTRAINT "comment_report_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_report" ADD CONSTRAINT "comment_report_moderator_id_users_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "read_later_blogs" ADD CONSTRAINT "read_later_blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "read_later_blogs" ADD CONSTRAINT "read_later_blogs_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_category" ADD CONSTRAINT "blog_category_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_category" ADD CONSTRAINT "blog_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_views" ADD CONSTRAINT "blog_views_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_views" ADD CONSTRAINT "blog_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_parent_id_category_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "author_moderator_id_index" ON "author_requests" USING btree ("moderator_id");--> statement-breakpoint
CREATE INDEX "author_state_index" ON "author_requests" USING btree ("state");--> statement-breakpoint
CREATE INDEX "blog_reason_index" ON "report_blog" USING btree ("report_reasons");--> statement-breakpoint
CREATE INDEX "blog_state_index" ON "report_blog" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blog_moderator_id_index" ON "report_blog" USING btree ("moderator_id");--> statement-breakpoint
CREATE INDEX "comment_reason_index" ON "comment_report" USING btree ("report_reasons");--> statement-breakpoint
CREATE INDEX "comment_state_index" ON "comment_report" USING btree ("status");--> statement-breakpoint
CREATE INDEX "comment_moderator_id_index" ON "comment_report" USING btree ("moderator_id");--> statement-breakpoint
CREATE INDEX "blog_categories_category_id_index" ON "blog_category" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "blog_views_blog_id_index" ON "blog_views" USING btree ("blog_id");--> statement-breakpoint
CREATE UNIQUE INDEX "category_name_index" ON "category" USING btree (lower("name"));--> statement-breakpoint
CREATE INDEX "user_category_category_id_index" ON "user_category" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "blog_comments_user_id_index" ON "blog_comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "blog_comments_blog_id_index" ON "blog_comments" USING btree ("blog_id");--> statement-breakpoint
CREATE INDEX "blog_comments_reply_to_id_index" ON "blog_comments" USING btree ("reply_to_id");--> statement-breakpoint
CREATE INDEX "blog_user_id_index" ON "blogs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "blog_title_index" ON "blogs" USING btree ("title");