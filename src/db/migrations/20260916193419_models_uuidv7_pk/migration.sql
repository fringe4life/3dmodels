PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_models` (
	`category_slug` text NOT NULL,
	`date_added` integer NOT NULL,
	`description` text NOT NULL,
	`id` text(36) PRIMARY KEY,
	`image` text NOT NULL,
	`likes` integer DEFAULT 0 NOT NULL,
	`name` text NOT NULL UNIQUE,
	`slug` text NOT NULL UNIQUE,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_models_category_slug_categories_slug_fk` FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`),
	CONSTRAINT `fk_models_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
DROP TABLE `likes`;--> statement-breakpoint
DROP TABLE `models`;--> statement-breakpoint
ALTER TABLE `__new_models` RENAME TO `models`;--> statement-breakpoint
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
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `models_date_added_id_idx` ON `models` (`date_added`,`id`);--> statement-breakpoint
CREATE INDEX `models_likes_id_idx` ON `models` (`likes`,`id`);--> statement-breakpoint
CREATE INDEX `models_name_id_idx` ON `models` (`name`,`id`);
