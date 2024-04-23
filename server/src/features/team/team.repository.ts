import { getDb } from "@/core/database";
import { Team } from "@generated/db/types.generated";
import { Insertable } from "kysely";

export class TeamRepository {
  static async create(input: { team: Insertable<Team>; userId: number }) {
    return (await getDb()).transaction().execute(async (tx) => {
      const team = await tx
        .insertInto("Team")
        .values(input.team)
        .returningAll()
        .executeTakeFirstOrThrow();
      await tx
        .insertInto("TeamUser")
        .values({ teamId: team.id, userId: input.userId })
        .execute();
      return team;
    });
  }

  static async findAll(args: { userId: number }) {
    return (await getDb())
      .selectFrom("Team")
      .selectAll()
      .innerJoin("TeamUser", "TeamUser.teamId", "Team.id")
      .where("TeamUser.userId", "=", args.userId)
      .execute();
  }
}
