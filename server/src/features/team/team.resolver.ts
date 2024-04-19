import { FeaturesModule } from "../generated-types/module-types";

export const Query: FeaturesModule.QueryResolvers = {
  team: async (root) => {
    return {
      id: "1",
      name: "Team 1",
    };
  },
};

export const Team: FeaturesModule.TeamResolvers = {
  extra: async (root) => {
    return Array(10).fill(root.name);
  },
};
