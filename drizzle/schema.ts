import { sqliteTable, primaryKey, unique, integer, text } from "drizzle-orm/sqlite-core"
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

