import { pubsub } from "@/core/server/pubsub";
import { GqlContext } from "@/shared/types";
import {
  ResolversTypes,
  RoomCurrentState,
  RoomEvent,
  RoomEventsInput,
  RoomUserJoined,
} from "@generated/graphql/graphql.generated";

export class RoomService {
  static async *getRoomEventsIterator(
    ctx: GqlContext,
    input: RoomEventsInput
  ): AsyncIterable<ResolversTypes["RoomEvent"]> {
    const topicId = `team:teamId:board:${input.boardId}`;

    const initialState: RoomCurrentState = {
      __typename: "RoomCurrentState",
      data: "board state...",
      type: "initial_state",
    };
    const roomUserJoined: ResolversTypes["RoomUserJoined"] = {
      __typename: "RoomUserJoined",
      user: {
        id: 1,
        name: "Se",
        email: "ws@sample.com",
      },
    };

    yield initialState;
    yield roomUserJoined;
    // send event to the rest of the room
    await pubsub.publish(topicId, roomUserJoined);
    yield* pubsub.asyncIterator<RoomEvent>([
      topicId,
      "asd",
    ]) as unknown as AsyncIterable<RoomEvent>;
  }
}
