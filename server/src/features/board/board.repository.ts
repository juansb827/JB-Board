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
      .values(({ eb, ref, selectFrom, fn }) => ({
        ...board,
        // Will fail if user is not associated with the team
        teamId: eb
          .selectFrom("TeamUser")
          .select("TeamUser.teamId")
          .where("TeamUser.teamId", "=", board.teamId)
          .where("TeamUser.userId", "=", board.authorId),
      }))
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  static async delete(args: { userId: ID; id: ID }) {
    const db = await getDb();
    return db
      .deleteFrom("Board")
      .where("id", "=", args.id)
      .where((eb) =>
        eb.exists(
          eb
            .selectFrom("TeamUser")
            .select("TeamUser.teamId")
            .whereRef("TeamUser.teamId", "=", "Board.teamId")
            .where("TeamUser.userId", "=", args.userId)
        )
      )
      .executeTakeFirstOrThrow();
  }

  // static hasDogNamed(name: string): Expression<boolean> {
  //   const eb = expressionBuilder<DB, 'person'>()

  //   return eb.exists(
  //     eb.selectFrom('pet')
  //       .select('pet.id')
  //       .whereRef('pet.owner_id', '=', 'person.id')
  //       .where('pet.species', '=', 'dog')
  //       .where('pet.name', '=', name)
  //   )
  // }
}
