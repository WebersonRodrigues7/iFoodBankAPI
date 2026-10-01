import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	walletTable: {
		usersTable: r.one.usersTable({
			from: r.walletTable.userId,
			to: r.usersTable.id
		}),
	},
	usersTable: {
		walletTables: r.one.walletTable(),
		piggyTables: r.one.piggyTable(),
	},
	piggyTable: {
		usersTable: r.one.usersTable({
			from: r.piggyTable.ownerId,
			to: r.usersTable.id
		}),
	},
}))