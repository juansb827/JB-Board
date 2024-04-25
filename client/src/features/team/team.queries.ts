import { getQueryClient, graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql/gql";
import { CreateTeamInput } from "@generated/graphql/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTeamDocument = graphql(`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      team {
        id
        name
      }
    }
  }
`);
const createTeam = (input: CreateTeamInput) => {
  return graphQLClient.request(createTeamDocument, { input });
};
export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateTeamInput) => {
      return graphQLClient.request(createTeamDocument, { input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDashboard"] });
    },
  });
};
