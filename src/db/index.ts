import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzleNodePg } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Production remains on Neon HTTP. The node-postgres path is intentionally
// limited to local Postgres hosts so sandbox verification cannot alter the
// production database adapter.
let dbInstance: ReturnType<typeof drizzleNeon<typeof schema>> | ReturnType<typeof drizzleNodePg<typeof schema>> | null = null;
let localPool: Pool | null = null;

export function getDb() {
  if (!dbInstance) {
    const url = process.env.DATABASE_URL?.trim();
    if (!url) {
      throw new Error('CRITICAL: DATABASE_URL is missing or empty during runtime execution.');
    }

    const parsedUrl = new URL(url);
    const isLocalPostgres =
      (parsedUrl.protocol === 'postgres:' || parsedUrl.protocol === 'postgresql:') &&
      ['localhost', '127.0.0.1', '::1'].includes(parsedUrl.hostname);

    if (isLocalPostgres) {
      localPool = new Pool({ connectionString: url });
      dbInstance = drizzleNodePg(localPool, { schema });
    } else {
      dbInstance = drizzleNeon(neon(url), { schema });
    }
  }
  return dbInstance;
}

export async function closeDb() {
  if (localPool) {
    await localPool.end();
    localPool = null;
  }
  dbInstance = null;
}
