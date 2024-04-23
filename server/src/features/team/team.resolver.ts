import { FeaturesModule } from "../generated-types/module-types";
import { TeamService } from "./team.service";

const Query: FeaturesModule.QueryResolvers = {
  team: async (root) => {
    return {
      id: "1",
      name: "Team 1",
    };
  },
  teams: async (root) => {
    return {
      nodes: await TeamService.findAll(),
    };
  },
};

const Mutation: FeaturesModule.MutationResolvers = {
  createTeam: async (root, args, context, info) => {
    return TeamService.create(args.input);
  },
};

const Team: FeaturesModule.TeamResolvers = {
  extra: async (root) => {
    return Array(10).fill(root.name);
  },
};

const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  Team,
};
export default resolvers;
