CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`cpf` text NOT NULL UNIQUE,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`email_verificado` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wallet_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`amount` integer DEFAULT 0 NOT NULL,
	`userId` integer NOT NULL UNIQUE,
	CONSTRAINT `fk_wallet_table_userId_users_table_id_fk` FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`)
);
