import { FeaturesModule } from "../generated-types/module-types";
import { User } from "@generated/graphql/graphql.generated";
import { UserService } from "./user.service";

const Query: FeaturesModule.QueryResolvers = {
  user: async (root, args) => {
    return UserService.findOne(args.id);
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
    return UserService.loadUserTeams(root.id);
  },
};
const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  User,
};
export default resolvers;
