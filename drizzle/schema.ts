import { sqliteTable, foreignKey, primaryKey, unique, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const usersTable = sqliteTable("users_table", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	cpf: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	emailVerificado: integer("email_verificado", {"mode":"boolean"}).default(false).notNull(),
},
(table) => [unique("users_table_cpf_unique").on(table.cpf),
unique("users_table_email_unique").on(table.email),
]);

export const walletTable = sqliteTable("wallet_table", {
	id: integer().primaryKey({ autoIncrement: true }),
	amount: integer().default(0).notNull(),
	userId: integer().notNull().references(() => usersTable.id),
},
(table) => [unique("wallet_table_userId_unique").on(table.userId),
]);

export const transfersTable = sqliteTable("transfers_table", {
	id: integer().primaryKey({ autoIncrement: true }),
	payerId: integer(),
	payeeCpf: text().notNull(),
	amount: integer(),
});

