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

const Board: FeaturesModule.BoardResolvers = {
  imageUrl: (parent) => {
    return parent.imageUrl || "https://placehold.co/512x512";
  },
  title: (parent) => parent.title || "Untitled",
  author: (parent) => {
    return BoardService.loadAuthor(parent);
  },
};

const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  Board,
};
export default resolvers;
