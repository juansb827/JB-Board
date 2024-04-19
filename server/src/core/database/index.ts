import { DB } from "@generated/db/types"; // this is the Database interface we defined earlier
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

export const db = new Kysely<DB>({
  dialect,
});
