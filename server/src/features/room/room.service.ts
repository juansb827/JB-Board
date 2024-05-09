import { pubsub } from "@/core/server/pubsub";
import {
  RoomEvent,
  RoomEventsInput,
} from "@generated/graphql/graphql.generated";

export class RoomService {
  static async getRoomEventsIterator(
    input: RoomEventsInput
  ): Promise<AsyncIterable<RoomEvent>> {
    const topicId = `team:teamId:board:${input.boardId}`;

    setTimeout(() => {}, 2000);
    pubsub.publish(topicId, { data: "user 125 joined", type: "user_joined" });
    return {
      [Symbol.asyncIterator]: async function* () {
        yield { data: "board state...", type: "initial_state" };
        yield* pubsub.asyncIterator([topicId]) as any;
      },
    };
  }
}
