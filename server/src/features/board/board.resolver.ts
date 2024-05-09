import { FeaturesModule } from "../generated-types/module-types";
import { BoardService } from "./board.service";
import { Board } from "@generated/db/types.generated";

const Query: FeaturesModule.QueryResolvers = {
  boards: async (parent, args, ctx) => {
    const res = {
      nodes: await BoardService.findAll(ctx, args.filter),
    };
    return res;
  },
};
const Mutation: FeaturesModule.MutationResolvers = {
  createBoard: async (parent, args, ctx) => {
    return { board: await BoardService.create(ctx, args.input) };
  },
  deleteBoard: async (parent, args, ctx) => {
    await BoardService.delete(args.input);
    return true;
  },
  renameBoard: async (parent, args, ctx) => {
    return { board: await BoardService.rename(args.input) };
  },
  updateBoardIsFavorite: async (parent, args, ctx) => {
    return BoardService.updateIsFavorite(args.input);
  },
};

const Board: FeaturesModule.BoardResolvers = {
  imageUrl: (parent) => {
    return parent.imageUrl || "https://placehold.co/512x512";
  },
  title: (parent) => parent.title || "Untitled",
  author: (parent, args, ctx) => {
    return BoardService.loadAuthor(ctx, parent);
  },
  isFavorite: (parent, args, ctx) => {
    return BoardService.loadIsFavorite(ctx, parent);
  },
};

const resolvers: FeaturesModule.Resolvers = {
  Query,
  Mutation,
  Board,
};
export default resolvers;
