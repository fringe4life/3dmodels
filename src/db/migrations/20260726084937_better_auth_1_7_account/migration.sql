PRAGMA foreign_keys=OFF;--> statement-breakpoint
ALTER TABLE `account` RENAME TO `__old_account`;--> statement-breakpoint
CREATE TABLE `account` (
	`access_token` text,
	`access_token_expires_at` integer,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`id` text PRIMARY KEY,
	`id_token` text,
	`issuer` text NOT NULL,
	`password` text,
	`provider_account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`refresh_token` text,
	`refresh_token_expires_at` integer,
	`scope` text,
	`updated_at` integer NOT NULL,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);--> statement-breakpoint
INSERT INTO `account` (
	`access_token`,
	`access_token_expires_at`,
	`created_at`,
	`id`,
	`id_token`,
	`issuer`,
	`password`,
	`provider_account_id`,
	`provider_id`,
	`refresh_token`,
	`refresh_token_expires_at`,
	`scope`,
	`updated_at`,
	`user_id`
)
SELECT
	`access_token`,
	`access_token_expires_at`,
	`created_at`,
	`id`,
	`id_token`,
	CASE
		WHEN `provider_id` = 'credential' THEN 'local:credential'
		ELSE 'local:oauth:' || `provider_id`
	END,
	`password`,
	`account_id`,
	`provider_id`,
	`refresh_token`,
	`refresh_token_expires_at`,
	`scope`,
	`updated_at`,
	`user_id`
FROM `__old_account`;--> statement-breakpoint
DROP TABLE `__old_account`;--> statement-breakpoint
CREATE UNIQUE INDEX `account_issuer_providerAccountId_uidx` ON `account` (`issuer`,`provider_account_id`);--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
PRAGMA foreign_keys=ON;
