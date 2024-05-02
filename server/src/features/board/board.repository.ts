import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
import { Board, DB } from "@generated/db/types.generated";
import {
  ExpressionBuilder,
  Insertable,
  Selectable,
  expressionBuilder,
  sql,
} from "kysely";
import { UserRepository } from "../user/user.repository";

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
      .values(({ eb, ref, selectFrom, fn }) => ({
        ...board,
        // Will fail if user is not associated with the team
        teamId: UserRepository.userBelongsToTeam(board.authorId, board.teamId),
      }))
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  static async delete(args: { userId: ID; teamId: ID; id: ID }) {
    const db = await getDb();
    return db
      .deleteFrom("Board")
      .where("id", "=", args.id)
      .where("teamId", "=", args.teamId)
      .where((eb) =>
        eb.exists(
          UserRepository.userBelongsToTeam(args.userId, args.teamId)
          // ebeb
          //   .selectFrom("TeamUser")
          //   .select("TeamUser.teamId")
          //   .where("TeamUser.teamId", "=", args.teamId)
          //   .where("TeamUser.userId", "=", args.userId)
        )
      )
      .executeTakeFirstOrThrow();
  }
}
