import {
  BoardResponse,
  BoardRoomEvent,
} from "@generated/graphql/graphql.generated";
import { FeaturesModule } from "../generated-types/module-types";
import { BoardService } from "./board.service";
import { Board } from "@generated/db/types.generated";
import { asyncLocalStorage } from "@/core/server/asyncLocalStorage";
import { PubSub } from "graphql-subscriptions";
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
const pubsub = new PubSub();
let i = 0;
setInterval(() => {
  pubsub.publish("asd", { boardRoomEvents: { data: i++, type: "sub" } });
}, 1000);

const Subscription: FeaturesModule.SubscriptionResolvers = {
  boardRoomEvents: {
    subscribe: async (parent, args, ctx) => {
      const topicId = `team:teamId:board:${args.input.boardId}`;
      return {
        [Symbol.asyncIterator]: async function* () {
          yield { boardRoomEvents: { data: "yide", type: "yie" } };
          yield* pubsub.asyncIterator(["asd"]) as any;
        },
      };
    },
    // subscribe: async (parent, args, ctx) => {
    //   const topicId = `team:teamId:board:${args.input.boardId}`;
    //   return {
    //     [Symbol.asyncIterator]: async function* () {
    //       yield { boardRoomEvents: { data: "yie", type: "yie" } };
    //       const a = {
    //         [Symbol.asyncIterator]: () => pubsub.asyncIterator<any>(["asd"]),
    //       };
    //       yield* a;
    //       // pubsub.asyncIterator([topicId]).
    //       // for await (const x of . as any) {
    //       //   console.log("X", x);
    //       //   yield x;
    //       // }
    //     },
    //   };
    // },
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
  Subscription,
};
export default resolvers;
