import { FeaturesModule } from "../generated-types/module-types";
import { BoardService } from "./board.service";

const Query: FeaturesModule.QueryResolvers = {
  boards: async (parent, args, ctx) => {
    return {
      nodes: await BoardService.findAll(args.filter),
    };
  },
};
const Mutation: FeaturesModule.MutationResolvers = {
  createBoard: async (parent, args, ctx) => {
    return { board: await BoardService.create(args.input) };
  },
};

const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  //   Team,
};
export default resolvers;
