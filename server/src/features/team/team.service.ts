import { FeaturesModule } from "../generated-types/module-types";
import { TeamRepository } from "./team.repository";

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
      team: { ...team, id: team.id.toString() },
    };
  }
}
