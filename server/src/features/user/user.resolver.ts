import { FeaturesModule } from "../generated-types/module-types";

export const Query: FeaturesModule.QueryResolvers = {
  user: async (root) => {
    return {
      id: "1",
      name: "User 342",
    };
  },
};

export const User: FeaturesModule.UserResolvers = {
  teams: async (root) => {
    return Array(3).fill(root.name);
  },
};
