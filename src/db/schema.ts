import { int, sqliteTable, text,  } from "drizzle-orm/sqlite-core";
import { defineRelations, type InferSelectModel } from "drizzle-orm";
export const usersTable = sqliteTable("users_table", {
    id: int("id").primaryKey({ autoIncrement: true}),
    name: text().notNull(),
    cpf: text().notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
    emailVerified: int("email_verificado", {mode: "boolean"}).notNull().default(false)
})


export const walletTable = sqliteTable("wallet_table", {
    id: int("id").primaryKey({ autoIncrement: true}),
    value: int(),
    userId: int()
})


export const relation = defineRelations({ usersTable, walletTable} , (r) => ({
    walletTable: {
        owner: r.one.usersTable({
            from: r.walletTable.userId,
            to: r.usersTable.id
        })
    }
}))

export type User = InferSelectModel<typeof usersTable>