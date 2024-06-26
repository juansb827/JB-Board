import { graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import {
  BoardsFilterInput,
  BoardsQuery,
  CreateBoardInput,
  DeleteBoardInput,
  QueryBoardArgs,
  RenameBoardInput,
  UpdateBoardIsFavoriteInput,
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

const renameBoardDocument = graphql(`
  mutation renameBoard($input: RenameBoardInput!) {
    renameBoard(input: $input) {
      board {
        # TODO fragment
        id
        title
        updatedAt
        team {
          id
        }
      }
    }
  }
`);

const deleteBoardDocument = graphql(`
  mutation deleteBoard($input: DeleteBoardInput!) {
    deleteBoard(input: $input)
  }
`);

const boardDocument = graphql(`
  query board($boardId: ID!) {
    board(id: $boardId) {
      id
      updatedAt
      imageUrl
      title
      author {
        id
        name
      }
      isFavorite
    }
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
        isFavorite
      }
    }
  }
`);

const updateBoardIsFavoriteDocument = graphql(`
  mutation updateBoardIsFavorite($input: UpdateBoardIsFavoriteInput!) {
    updateBoardIsFavorite(input: $input) {
      isFavorite
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

export const useRenameBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RenameBoardInput) => {
      return graphQLClient.request(renameBoardDocument, { input });
    },
    onError: () => {},
    onSuccess: (data, variables) => {
      const updatedBoard = data.renameBoard.board;
      queryClient.setQueryData(
        ["boards", "detail", variables.id],
        updatedBoard
      );
      queryClient.setQueriesData(
        { queryKey: ["boards", updatedBoard.team.id] },
        (oldData: BoardsQuery["boards"]["nodes"] | undefined) => {
          if (!oldData) {
            return;
          }
          return oldData.map((board) => {
            if (board.id !== updatedBoard.id) {
              return board;
            }
            return {
              ...board,
              ...updatedBoard,
            };
          });
        }
      );
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DeleteBoardInput) => {
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

export const useUpdateBoardIsFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateBoardIsFavoriteInput) => {
      return graphQLClient.request(updateBoardIsFavoriteDocument, { input });
    },
    onError: () => {},
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        { queryKey: ["boards", variables.teamId] },
        (oldData: BoardsQuery["boards"]["nodes"] | undefined) => {
          if (!oldData) {
            return;
          }
          return oldData.map((board) => {
            if (board.id !== variables.id) {
              return board;
            }
            return {
              ...board,
              isFavorite: data.updateBoardIsFavorite.isFavorite,
            };
          });
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["boards", variables.teamId],
        // refetchType: "none",
      });
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

export const useBoard = (id: string) => {
  return useQuery({
    // todo query key factory
    // https://tkdodo.eu/blog/effective-react-query-keys
    // todo: invalidate
    queryKey: ["boards", "detail", id],
    queryFn: () =>
      graphQLClient
        .request(boardDocument, { boardId: id })
        .then((res) => res.board),
  });
};
