CREATE TABLE `account` (
	`access_token` text,
	`access_token_expires_at` integer,
	`account_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`id` text PRIMARY KEY,
	`id_token` text,
	`password` text,
	`provider_id` text NOT NULL,
	`refresh_token` text,
	`refresh_token_expires_at` integer,
	`scope` text,
	`updated_at` integer NOT NULL,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `session` (
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`expires_at` integer NOT NULL,
	`id` text PRIMARY KEY,
	`ip_address` text,
	`token` text NOT NULL UNIQUE,
	`updated_at` integer NOT NULL,
	`user_agent` text,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer DEFAULT false NOT NULL,
	`id` text PRIMARY KEY,
	`image` text,
	`name` text NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`expires_at` integer NOT NULL,
	`id` text PRIMARY KEY,
	`identifier` text NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`created_at` integer NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`model_slug` text NOT NULL,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_likes_model_slug_models_slug_fk` FOREIGN KEY (`model_slug`) REFERENCES `models`(`slug`) ON DELETE CASCADE,
	CONSTRAINT `fk_likes_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
	CONSTRAINT `unique_user_model` UNIQUE(`user_id`,`model_slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`display_name` text NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `models` (
	`category_slug` text NOT NULL,
	`date_added` integer NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`likes` integer DEFAULT 0 NOT NULL,
	`name` text NOT NULL UNIQUE,
	`slug` text PRIMARY KEY,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_models_category_slug_categories_slug_fk` FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`),
	CONSTRAINT `fk_models_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);