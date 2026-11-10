import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL ?? process.env.DATABASE_URL_3 ?? process.env.POSTGRES_URL ?? process.env.POSTGRES_URL_3

// A missing database is an unavailable dependency, never a reason to fabricate records.
export const pool: Pool | null = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ...(process.env.NODE_ENV === 'production' ? { ssl: { rejectUnauthorized: true } } : {}),
    })
  : null

export const db = pool ? drizzle(pool, { schema }) : null

export function getDb() {
  return db
}
