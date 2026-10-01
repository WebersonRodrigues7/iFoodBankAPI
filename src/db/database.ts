import Database from 'libsql';
import { drizzle } from 'drizzle-orm/libsql';
import { relations } from './schema';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:local.db',
});

export const db = drizzle({
  client,
  relations: relations,
});


export type Database = typeof db;
