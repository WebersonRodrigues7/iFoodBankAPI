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
  id: int('id').primaryKey({ autoIncrement: true }),
  payerId: int().references(() => usersTable.id),
  payeeCpf: text().notNull(),
  amount: int(),
});

export const piggyTable = sqliteTable('piggy_table', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  amount: int().notNull(),
  ownerId: int()
    .notNull()
    .unique()
    .references(() => usersTable.id),
});

export const relations = defineRelations(
  { usersTable, walletTable, piggyTable, transfersTable },
  (r) => ({
    walletTable: {
      owner: r.one.usersTable({
        from: r.walletTable.userId,
        to: r.usersTable.id,
      }),
    },
    transfersTable: {
      userTransfer: r.one.usersTable({
        from: r.transfersTable.payerId,
        to: r.usersTable.id,
      }),
    },
    piggyTable: {
      owner: r.one.usersTable({
        from: r.piggyTable.ownerId,
        to: r.usersTable.id,
      }),
    },
    usersTable: {
      wallet: r.one.walletTable({
        from: r.usersTable.id,
        to: r.walletTable.userId,
      }),
      piggy: r.one.piggyTable({
        from: r.usersTable.id,
        to: r.piggyTable.ownerId,
      }),
      transfers: r.many.transfersTable({
        from: r.usersTable.id,
        to: r.transfersTable.payerId,
      }),
    },
  }),
);

export type User = InferSelectModel<typeof usersTable>;
