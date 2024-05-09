import { pubsub } from "@/core/server/pubsub";
import {
  RoomCurrentState,
  RoomEvent,
  RoomEventsInput,
  RoomUserJoined,
} from "@generated/graphql/graphql.generated";

export class RoomService {
  static async *getRoomEventsIterator(input: RoomEventsInput) {
    const topicId = `team:teamId:board:${input.boardId}`;

    const initialState: RoomCurrentState = {
      __typename: "RoomCurrentState",
      data: "board state...",
      type: "initial_state",
    };
    const memberJoined: RoomUserJoined = {
      __typename: "RoomUserJoined",
      data: "user 125 joined",
      type: "user_joined",
    };

    yield initialState;
    yield memberJoined;
    // send event to the rest of the room
    await pubsub.publish(topicId, memberJoined);
    yield* pubsub.asyncIterator<RoomEvent>([
      topicId,
      "asd",
    ]) as unknown as AsyncIterable<RoomEvent>;
  }
}
