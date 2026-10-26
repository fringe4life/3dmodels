CREATE INDEX `models_category_date_added_id_idx` ON `models` (`category_slug`,`date_added`,`id`);--> statement-breakpoint
CREATE INDEX `models_category_likes_id_idx` ON `models` (`category_slug`,`likes`,`id`);--> statement-breakpoint
CREATE INDEX `models_category_name_id_idx` ON `models` (`category_slug`,`name`,`id`);