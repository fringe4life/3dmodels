CREATE TABLE "models" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL,
	"date_added" timestamp with time zone DEFAULT now() NOT NULL
);
