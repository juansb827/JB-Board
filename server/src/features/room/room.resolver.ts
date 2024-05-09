import { PubSub } from "graphql-subscriptions";
import { FeaturesModule } from "../generated-types/module-types";
import { RoomEvent, Event } from "@generated/graphql/graphql.generated";
import { RoomService } from "./room.service";

const Subscription: FeaturesModule.SubscriptionResolvers = {
  roomEvents: {
    subscribe: async function* (parent, args, ctx) {
      const ans: AsyncIterable<RoomEvent> = RoomService.getRoomEventsIterator(
        args.input
      );
      for await (let event of ans) {
        yield { roomEvents: event };
      }
    },
  },
};

const resolvers: FeaturesModule.Resolvers = {
  Subscription,
};
export default resolvers;
