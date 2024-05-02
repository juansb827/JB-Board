import { graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import {
  BoardsFilterInput,
  BoardsQuery,
  CreateBoardInput,
  DeleteBoardInput,
} from "@generated/graphql/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Maybe } from "graphql/jsutils/Maybe";
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

const deleteBoardDocument = graphql(`
  mutation deleteBoard($input: DeleteBoardInput!) {
    deleteBoard(input: $input)
  }
`);

const boardsDocument = graphql(`
  query boards($filter: BoardsFilterInput!) {
    boards(filter: $filter) {
      nodes {
        id
        updatedAt
        imageUrl
        title
        author {
          id
          name
        }
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
    onSuccess: (data, variables) => {
      toast.success("Board created", {});
      queryClient.invalidateQueries({ queryKey: ["boards", variables.teamId] });
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DeleteBoardInput) => {
      toast.info("Deleting...", {});
      return graphQLClient.request(deleteBoardDocument, { input });
    },
    onError: () => {
      toast.error("Board NOT Deleted", {});
    },
    onSuccess: (data, variables) => {
      toast.success("Board deleted", {});
      queryClient.setQueriesData(
        { queryKey: ["boards", variables.teamId] },
        (oldData: BoardsQuery["boards"]["nodes"] | undefined) => {
          if (!oldData) {
            return;
          }
          return oldData.filter((board) => board.id !== variables.id);
        }
      );
    },
  });
};

export const useBoards = (filter: BoardsFilterInput) => {
  return useQuery({
    queryKey: ["boards", filter.teamId, filter],
    queryFn: () =>
      graphQLClient
        .request(boardsDocument, { filter })
        .then((res) => res.boards.nodes),
  });
};
