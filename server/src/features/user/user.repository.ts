import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
import { DB } from "@generated/db/types.generated";
import { expressionBuilder } from "kysely";

export class UserRepository {
  static async findOne(id: ID) {
    return (await getDb())
      .selectFrom("User")
      .selectAll()
      .where("id", "=", +id)
      .executeTakeFirstOrThrow();
  }

  static async findByIdBatch(ids: readonly ID[]) {
    return (await getDb())
      .selectFrom("User")
      .selectAll()
      .where("id", "in", ids)
      .execute();
  }

  static userBelongsToTeam(userId: ID, teamId: ID) {
    // Using this syntax so that the query builder using this expression can be of any type
    // not just "User"
    const eb = expressionBuilder<DB, "TeamUser">(); // second type arg here doesn't matter
    return eb
      .selectFrom("TeamUser")
      .select("TeamUser.teamId")
      .where("TeamUser.teamId", "=", teamId)
      .where("TeamUser.userId", "=", userId);
  }
}
