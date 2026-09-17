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
INSERT INTO `__new_models` (
	`category_slug`,
	`date_added`,
	`description`,
	`id`,
	`image`,
	`likes`,
	`name`,
	`slug`,
	`user_id`
)
SELECT
	`category_slug`,
	`date_added`,
	`description`,
	lower(
		substr(printf('%012x', `date_added`), 1, 8)
		|| '-'
		|| substr(printf('%012x', `date_added`), 9, 4)
		|| '-'
		|| '7'
		|| substr(`rand_hex`, 1, 3)
		|| '-'
		|| substr('89ab', 1 + abs(random()) % 4, 1)
		|| substr(`rand_hex`, 4, 3)
		|| '-'
		|| substr(`rand_hex`, 7, 12)
	),
	`image`,
	`likes`,
	`name`,
	`slug`,
	`user_id`
FROM (
	SELECT
		`models`.*,
		lower(hex(randomblob(10))) AS `rand_hex`
	FROM `models`
);
--> statement-breakpoint
DROP TABLE `models`;--> statement-breakpoint
ALTER TABLE `__new_models` RENAME TO `models`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `models_date_added_id_idx` ON `models` (`date_added`,`id`);--> statement-breakpoint
CREATE INDEX `models_likes_id_idx` ON `models` (`likes`,`id`);--> statement-breakpoint
CREATE INDEX `models_name_id_idx` ON `models` (`name`,`id`);
