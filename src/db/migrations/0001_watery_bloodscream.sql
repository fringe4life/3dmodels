CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "models" RENAME COLUMN "category" TO "category_slug";--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_category_slug_categories_slug_fk" FOREIGN KEY ("category_slug") REFERENCES "public"."categories"("slug") ON DELETE no action ON UPDATE no action;