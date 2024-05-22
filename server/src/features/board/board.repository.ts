import { getDb } from "@/core/database";
import { ID, Maybe } from "@/shared/types";
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
  static async findOne(args: { userId: ID; id: ID }) {
    return (await getDb())
      .selectFrom("Board")
      .selectAll()
      .where(
        "id",
        "=",
        BoardRepository.boardAndUserAreAssociated(args.id, args.userId)
      )
      .executeTakeFirstOrThrow();
  }

  static async findAll(args: {
    teamId: ID;
    userId: ID;
    isFavorite?: Maybe<boolean>;
    search: Maybe<string>;
  }) {
    return (await getDb())
      .selectFrom("Board")
      .selectAll()
      .where("Board.teamId", "=", args.teamId)
      .innerJoin("TeamUser", "TeamUser.teamId", "Board.teamId")
      .where("TeamUser.userId", "=", args.userId)
      .$if(Boolean(args.search), (eb) =>
        // TODO: index or fts
        eb.where("Board.title", "like", "%" + args.search + "%")
      )
      .$if(Boolean(args.isFavorite), (eb) =>
        eb
          .innerJoin("UserBoard", "UserBoard.boardId", "Board.id")
          .where("UserBoard.userId", "=", args.userId)
          .where("UserBoard.isFavorite", "=", true)
      )
      .orderBy("Board.id", "desc")
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
        teamId: fn.coalesce(
          UserRepository.userBelongsToTeam(board.authorId, board.teamId),
          // default to  -1 to make this error out if the condition is null
          eb.val(-1)
        ),
      }))
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  static async delete(args: { userId: ID; teamId: ID; id: ID }) {
    return (await getDb()).transaction().execute(async (trx) => {
      return (
        trx
          .with("validated_board", (db) =>
            db
              .selectFrom("Board")
              .selectAll()
              .where("id", "=", args.id)
              .where("authorId", "=", args.userId)
          )
          .with("2", (db) =>
            db
              .deleteFrom("UserBoard")
              .where(
                "boardId",
                "=",
                db.selectFrom("validated_board").select("validated_board.id")
              )
          )
          // .with("last", (db) => {
          //   return db
          //     .deleteFrom("Board")
          //     .where(
          //       "Board.id",
          //       "=",
          //       db.selectFrom("validated_board").select("validated_board.id")
          //     );
          // })
          .deleteFrom("Board")
          .whereRef("Board.id", "=", (eb) =>
            eb.selectFrom("validated_board").select("validated_board.id")
          )
          .executeTakeFirst()
      );
    });
  }

  static async rename(args: { userId: ID; id: ID; name: string }) {
    const db = await getDb();
    return db
      .updateTable("Board")
      .set({
        title: args.name,
      })
      .where("id", "=", args.id)
      .where((eb) =>
        eb.exists(
          UserRepository.userBelongsToTeamRef(eb, args.userId, "Board.teamId")
        )
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
        boardId: BoardRepository.boardAndUserAreAssociated(
          userBoard.boardId,
          userBoard.userId
        ),
      }))
      .onConflict((oc) =>
        oc.columns(["boardId", "userId"]).doUpdateSet({
          ...userBoard,
        })
      )
      .returningAll()
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

  static async findUserBoardBatch({
    userId,
    boardIds,
  }: {
    userId: ID;
    boardIds: readonly ID[];
  }) {
    return (await getDb())
      .selectFrom("UserBoard")
      .selectAll()
      .where("UserBoard.userId", "=", userId)
      .where("UserBoard.boardId", "in", boardIds)
      .execute();
  }

  /**
   * Expression that returns the boardId if the user belongs to the team of the board
   */
  static boardAndUserAreAssociated(boardId: ID, userId: ID) {
    // Using this syntax so that the query builder using this expression can be of any type
    // not just "User"
    const eb = expressionBuilder<DB, "Board">(); // second type arg here doesn't matter
    return (
      // Using an alias just for example
      // every column ref in this expression must use the alias otherwise the query will fail
      eb
        .selectFrom("Board as aliasForBoardTable")
        .select("aliasForBoardTable.id")
        .where("aliasForBoardTable.id", "=", boardId)
        .where((eb) =>
          eb.exists(
            UserRepository.userBelongsToTeamRef(
              eb,
              userId,
              "aliasForBoardTable.teamId"
            )
          )
        )
    );
  }
}
