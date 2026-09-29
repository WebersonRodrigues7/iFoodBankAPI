import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { relation } from "./schema";



const sqlite = new Database("local.db");

export const db = drizzle({
    client: sqlite,
    relations: relation
});