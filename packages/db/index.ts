import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from './schema/index';
export * from "./schema";

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the .env file');
}

const sql = postgres(
    process.env.DATABASE_URL!,
    {
        prepare: false
    }
);

export const db = drizzle(sql, { schema });