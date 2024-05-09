import { graphqlSubscriptionsClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import {
  BoardRoomEventInput,
  RoomEventsSubscription,
} from "@generated/graphql/graphql";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subSeconds } from "date-fns";
import { useEffect } from "react";

const gql = `subscription roomEvents($input: BoardRoomEventInput!) {
    boardRoomEvents(input: $input) {
      data
      type
    }
  }` as const;
const roomEventsDocument = graphql(`
  subscription roomEvents($input: BoardRoomEventInput!) {
    boardRoomEvents(input: $input) {
      data
      type
    }
  }
`);
export const useRoomSubscription = (input: BoardRoomEventInput) => {
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
              lastEventId: event.data?.boardRoomEvents?.data,
            };
          }
        );
        console.log("E", event.data?.boardRoomEvents);
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
const getInitialRoomState = (input: BoardRoomEventInput): RoomState => {
  const initialRoomState = {
    boardId: input.boardId,
    members: [],
    lastEventId: 0,
  };
  return initialRoomState;
};
export const useRoom = (input: BoardRoomEventInput) => {
  return useQuery({
    queryKey: ["room", input.boardId],
    queryFn: () => getInitialRoomState(input),
    staleTime: Infinity,
  });
};
