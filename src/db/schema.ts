import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { defineRelations, type InferSelectModel } from 'drizzle-orm';
export const usersTable = sqliteTable('users_table', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  cpf: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  emailVerified: int('email_verificado', { mode: 'boolean' })
    .notNull()
    .default(false),
});

export const walletTable = sqliteTable('wallet_table', {
  id: int('id').primaryKey({ autoIncrement: true }),
  amount: int().notNull().default(0),
  userId: int()
    .notNull()
    .unique()
    .references(() => usersTable.id),
});

export const transfersTable = sqliteTable('transfers_table', {
    id: int('id').primaryKey({ autoIncrement: true}),
    payerId: int(),
    payeeCpf: text().notNull(),
    amount: int()
})

export const relations = defineRelations({ usersTable, walletTable }, (r) => ({
  walletTable: {
    owner: r.one.usersTable({
      from: r.walletTable.userId,
      to: r.usersTable.id,
    }),
  },
  usersTable: {
    wallet: r.one.walletTable({
      from: r.usersTable.id,
      to: r.walletTable.userId,
    }),
  },
}));

export type User = InferSelectModel<typeof usersTable>;
