import { graphQLClient } from "@/core/query";
import { graphql } from "@generated/graphql/gql";
import { useQuery } from "@tanstack/react-query";

const userDashboardQueryDocument = graphql(`
  query userDashboard {
    user(id: "1") {
      id
      name
      email
      teams {
        id
        name
      }
    }
  }
`);

export const userDashboardQuery = (limit?: any) => ({
  queryKey: ["userDashboard"],
  queryFn: () => {
    console.log("FETCH userDashboardQuery");
    return graphQLClient.request(userDashboardQueryDocument);
  },
});
// export const fetchUserDashboardInfo = async () => {
//   console.log("Fetching user dashboard info");
//   return graphQLClient.request(userDashboardQueryDocument);
// };

export const useUserDashboardInfo = (limit?: any) => {
  return useQuery(userDashboardQuery(limit));
};
