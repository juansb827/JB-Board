import { DB } from "@generated/db/types.generated"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { serverConfig } from "@/core/config";

const dialect = new PostgresDialect({
  pool: new Pool({
    // ssl: true,
    connectionString: serverConfig.databaseUrl,
    max: 10,
  }),
});

const db = new Kysely<DB>({
  dialect,
});

export async function getDb() {
  // TODO: Add soft delete plugin
  return db;
}
