import { getDb } from "@/core/database";
import { Team } from "@generated/db/types.generated";
import { Insertable } from "kysely";

export class TeamRepository {
  static async create(input: Insertable<Team>) {
    return (await getDb())
      .insertInto("Team")
      .values(input)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
