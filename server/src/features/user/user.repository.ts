import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
import { DB } from "@generated/db/types.generated";
import {
  ExpressionBuilder,
  ReferenceExpression,
  SelectExpression,
  SelectQueryBuilder,
  expressionBuilder,
} from "kysely";

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

  /**
   * SQL expression that returns the teamId if the user is associated with the team
   */
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

  /**
   *
   * @param eb_ Just used for type inference
   * @param userId
   * @param teamIdRef Reference to the teamId in an outer query
   * @returns
   */
  static userBelongsToTeamRef<T, S extends keyof T>(
    eb_: ExpressionBuilder<T, S>,
    userId: ID,
    teamIdRef: ReferenceExpression<T, S>
  ) {
    // Using this syntax so that the query builder using this expression can be of any type
    // not just "User"
    const eb = expressionBuilder<DB, "TeamUser">();
    return eb
      .selectFrom("TeamUser")
      .select("TeamUser.userId")
      .whereRef("TeamUser.teamId", "=", teamIdRef as any)
      .where("TeamUser.userId", "=", userId);
  }
}
