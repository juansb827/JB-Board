import { FeaturesModule } from "../generated-types/module-types";

const Query: FeaturesModule.QueryResolvers = {
  team: async (root) => {
    return {
      id: "1",
      name: "Team 1",
    };
  },
};

const Mutation: FeaturesModule.MutationResolvers = {
  createTeam: async (root, args, context, info) => {
    return {
      team: {
        id: "1",
        name: args.input.name,
      },
    };
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
