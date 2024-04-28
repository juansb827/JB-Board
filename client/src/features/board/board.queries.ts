import { graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import {
  BoardsFilterInput,
  CreateBoardInput,
} from "@generated/graphql/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createBoardDocument = graphql(`
  mutation createBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      board {
        id
        title
      }
    }
  }
`);

const boardsDocument = graphql(`
  query boards($filter: BoardsFilterInput!) {
    boards(filter: $filter) {
      nodes {
        id
        imageUrl
        title
      }
    }
  }
`);

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateBoardInput) => {
      return graphQLClient.request(createBoardDocument, { input });
    },
    onError: () => {
      toast.error("Error creating board", {});
    },
    onSuccess: () => {
      toast.success("Board created", {});
    },
  });
};

export const useBoards = (filter: BoardsFilterInput) => {
  return useQuery({
    queryKey: ["boards", filter],
    queryFn: () => graphQLClient.request(boardsDocument, { filter }),
  });
};
