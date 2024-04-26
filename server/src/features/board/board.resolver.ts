import { FeaturesModule } from "../generated-types/module-types";
import { BoardService } from "./board.service";

const Mutation: FeaturesModule.MutationResolvers = {
  createBoard: async (parent, args, ctx) => {
    return { board: await BoardService.create(args.input) };
  },
};

const resolvers: FeaturesModule.Resolvers = {
  //   Query,
  Mutation,
  //   Team,
};
export default resolvers;
