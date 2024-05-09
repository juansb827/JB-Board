import { graphqlSubscriptionsClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import {
  RoomEventsInput,
  RoomEventsSubscription,
} from "@generated/graphql/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const gql = `subscription roomEvents($input: RoomEventsInput!) {
    roomEvents(input: $input) {
      data
      type
    }
  }` as const;
const roomEventsDocument = graphql(`
  subscription roomEvents($input: RoomEventsInput!) {
    roomEvents(input: $input) {
      data
      type
    }
  }
`);
export const useRoomSubscription = (input: RoomEventsInput) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const client = graphqlSubscriptionsClient;
    const subscription = client.iterate<RoomEventsSubscription>({
      query: gql,
      variables: {
        input: {
          boardId: input.boardId,
        },
      },
    });
    (async () => {
      for await (const event of subscription) {
        queryClient.setQueryData(
          ["room", input.boardId],
          (oldData: RoomState | undefined) => {
            if (!oldData) {
              return;
            }
            return {
              ...oldData,
              lastEventId: event.data?.roomEvents?.data,
            };
          }
        );
        console.log("E", event.data?.roomEvents);
        // complete a running subscription by breaking the iterator loop
      }
    })();
    return () => {
      subscription.return && subscription.return();
    };
  }, [queryClient, input.boardId]);
};

interface RoomState {
  boardId: string;
  members: string[];
  lastEventId: number;
}
const getInitialRoomState = (input: RoomEventsInput): RoomState => {
  const initialRoomState = {
    boardId: input.boardId,
    members: [],
    lastEventId: 0,
  };
  return initialRoomState;
};
export const useRoom = (input: RoomEventsInput) => {
  return useQuery({
    queryKey: ["room", input.boardId],
    queryFn: () => getInitialRoomState(input),
    staleTime: Infinity,
  });
};
