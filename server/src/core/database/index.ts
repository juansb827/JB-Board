import { DB } from "@generated/db/types.generated"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, LOG_LEVELS, PostgresDialect } from "kysely";
import { serverConfig } from "@/core/config";

const dialect = new PostgresDialect({
  pool: new Pool({
    // ssl: true,
    connectionString: serverConfig.databaseUrl,
    idleTimeoutMillis: 8000,
    connectionTimeoutMillis: 8000,
    query_timeout: 20000,
  }),
});

const db = new Kysely<DB>({
  log: ["error", "query"],
  dialect,
});

export async function getDb() {
  // TODO: Add soft delete plugin
  return db;
}
