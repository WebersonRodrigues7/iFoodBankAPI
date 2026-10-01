PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_wallet_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`amount` integer DEFAULT 0,
	`userId` integer NOT NULL UNIQUE,
	CONSTRAINT `fk_wallet_table_userId_users_table_id_fk` FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_wallet_table`(`id`, `amount`, `userId`) SELECT `id`, `amount`, `userId` FROM `wallet_table`;--> statement-breakpoint
DROP TABLE `wallet_table`;--> statement-breakpoint
ALTER TABLE `__new_wallet_table` RENAME TO `wallet_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;