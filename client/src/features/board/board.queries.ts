import { graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql";
import { CreateBoardInput } from "@generated/graphql/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
