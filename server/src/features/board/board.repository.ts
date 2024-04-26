import { getDb } from "@/core/database";
import { Board } from "@generated/db/types.generated";
import { Insertable, Selectable, sql } from "kysely";

export class BoardRepository {
  static async create({
    board,
  }: {
    board: Insertable<Board>;
  }): Promise<Selectable<Board>> {
    const db = await getDb();
    return db
      .insertInto("Board")
      .values(({ ref, selectFrom, fn }) => ({
        ...board,
        // Will fail if user is not associated with the team
        teamId: selectFrom("Team")
          .select("Team.id")
          .innerJoin("TeamUser", "TeamUser.teamId", "Team.id")
          .where("Team.id", "=", board.teamId)
          .where("TeamUser.userId", "=", board.authorId),
      }))
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
