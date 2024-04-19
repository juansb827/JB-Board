import { FeaturesModule } from "../generated-types/module-types";

const Query: FeaturesModule.QueryResolvers = {
  user: async (root) => {
    return {
      id: "1",
      name: "User 342",
    };
  },
};

const Mutation: FeaturesModule.MutationResolvers = {
  createUser: async (root, args, context, info) => {
    return {
      id: "1",
      name: "User 342 " + args.input,
    };
  },
};
const User: FeaturesModule.UserResolvers = {
  teams: async (root) => {
    return Array(3).fill(root.name);
  },
};
const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  User,
};
export default resolvers;
