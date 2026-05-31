import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { schema } from './schema/index';
export * from "./schema";

console.log(
    "DATABASE_URL:",
    process.env.DATABASE_URL
);

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the .env file');
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });