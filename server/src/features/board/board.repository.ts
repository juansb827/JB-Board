import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
import { Board, DB, UserBoard } from "@generated/db/types.generated";
import {
  ExpressionBuilder,
  Insertable,
  Selectable,
  Updateable,
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
        eb.exists(UserRepository.userBelongsToTeam(args.userId, args.teamId))
      )
      .executeTakeFirstOrThrow();
  }

  static async rename(args: { userId: ID; teamId: ID; id: ID; name: string }) {
    const db = await getDb();
    return db
      .updateTable("Board")
      .set({
        title: args.name,
      })
      .where("id", "=", args.id)
      .where("teamId", "=", args.teamId)
      .where((eb) =>
        eb.exists(UserRepository.userBelongsToTeam(args.userId, args.teamId))
      )
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  static async upsertUserBoardAssociation(args: {
    teamId: ID;
    userBoard: Insertable<UserBoard>;
  }) {
    const { teamId, userBoard } = args;
    const db = await getDb();
    return db
      .insertInto("UserBoard")
      .values(() => ({
        ...userBoard,
        boardId: BoardRepository.boardAndUserBelongToTeam(
          userBoard.boardId,
          userBoard.userId,
          teamId
        ),
      }))
      .onConflict((oc) =>
        oc.columns(["boardId", "userId"]).doUpdateSet({
          ...userBoard,
        })
      )
      .executeTakeFirstOrThrow();
    // .where("teamId", "=", args.teamId)
    // .where((eb) =>
    //   eb.exists(UserRepository.userBelongsToTeam(args.userId, args.teamId))
    // )
    // .returningAll()
    // .executeTakeFirstOrThrow();
  }
  static async updateOrThrow(args: {
    userId: ID;
    teamId: ID;
    id: ID;
    board: Updateable<Board>;
  }) {
    const db = await getDb();
    return db
      .updateTable("Board")
      .set(args.board)
      .where("id", "=", args.id)
      .where("teamId", "=", args.teamId)
      .where((eb) =>
        eb.exists(UserRepository.userBelongsToTeam(args.userId, args.teamId))
      )
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /**
   * Returns the boardId if the board and the user belongs to the team
   */
  static boardAndUserBelongToTeam(boardId: ID, userId: ID, teamId: ID) {
    // Using this syntax so that the query builder using this expression can be of any type
    // not just "User"
    const eb = expressionBuilder<DB, "Board">(); // second type arg here doesn't matter
    return eb
      .selectFrom("Board")
      .select("Board.id")
      .where("Board.id", "=", boardId)
      .where("Board.teamId", "=", teamId)
      .where(eb.exists(UserRepository.userBelongsToTeam(userId, teamId)));
  }
}
