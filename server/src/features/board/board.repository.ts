import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
import { Board } from "@generated/db/types.generated";
import { Insertable, Selectable, sql } from "kysely";

export class BoardRepository {
  static async findAll(args: { teamId: ID; userId: ID }) {
    return (await getDb())
      .selectFrom("Board")
      .selectAll()
      .where("Board.teamId", "=", args.teamId)
      .innerJoin("TeamUser", "TeamUser.teamId", "Board.teamId")
      .where("TeamUser.userId", "=", args.userId)
      .execute();
  }
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
