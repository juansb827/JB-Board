import { Team } from "@generated/graphql/graphql.generated";
import { FeaturesModule } from "../generated-types/module-types";
import { TeamRepository } from "./team.repository";
import { GqlContext, ID, Resolved } from "@/shared/types";
import DataLoader from "dataloader";
import _ from "lodash";

export class TeamService {
  static async create(
    input: FeaturesModule.CreateTeamInput
  ): Promise<FeaturesModule.CreateTeamResponse> {
    const team = await TeamRepository.create({
      team: {
        ...input,
        updatedAt: new Date(),
      },
      userId: 1,
    });
    return {
      team,
    };
  }

  static async findAll(): Promise<Team[]> {
    return TeamRepository.findAll({
      userId: 1,
    });
  }

  static async loadById(ctx: GqlContext, teamId: ID) {
    const loader = ctx.getOrCreateLoader("Team:byId", () => {
      const teamLoader = new DataLoader<ID, Resolved<Team>>(async (ids) => {
        const teams: Array<Resolved<Team>> = await TeamRepository.findByIdBatch(
          ids
        );
        const idToTeam = _.keyBy(teams, (u) => u.id);
        return ids.map((id) => idToTeam[id]);
      });
      return teamLoader;
    });
    return loader.load(teamId);
  }
}
