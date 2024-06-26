import { getDb } from "@/core/database";
import { ID } from "@/shared/types";
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

  static async findAll(args: { userId: ID }) {
    return (await getDb())
      .selectFrom("Team")
      .selectAll()
      .innerJoin("TeamUser", "TeamUser.teamId", "Team.id")
      .where("TeamUser.userId", "=", +args.userId)
      .execute();
  }

  static async loadAll(args: { userId: ID }) {
    return (await getDb())
      .selectFrom("Team")
      .selectAll()
      .innerJoin("TeamUser", "TeamUser.teamId", "Team.id")
      .where("TeamUser.userId", "in", [+args.userId])
      .execute();
  }

  static async findByIdBatch(ids: readonly ID[]) {
    // TODO restrict to teams that user is part of
    return (await getDb())
      .selectFrom("Team")
      .selectAll()
      .where("id", "in", ids)
      .execute();
  }
}
