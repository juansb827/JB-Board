"use client";

import React from "react";
import Item from "./item";
import { graphql } from "@generated/graphql/gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { useUserDashboardInfo } from "@/features/user/user.queries";

export const List = (props: {}) => {
  const { data, error, isFetching } = useUserDashboardInfo();
  const teams = data?.user.teams || [];
  // const teams = [
  //   {
  //     id: 1,
  //     name: "Team 1",
  //     imageUrl: "/logoipsum-247.svg",
  //   },
  //   {
  //     id: 2,
  //     name: "Team 2",
  //     imageUrl: "/logoipsum-327.svg",
  //   },
  //   {
  //     id: 3,
  //     name: "Team 3",
  //     imageUrl: "/logoipsum-293.svg",
  //   },
  //   {
  //     id: 4,
  //     name: "Team 3",
  //   },
  // ];

  return (
    <ul className="space-y-4 w-full">
      {teams.map((team) => (
        <Item
          key={team.id}
          id={team.id}
          name={team.name}
          imageUrl="/logoipsum-293.svg"
          isActive={team.id === "9"}
        />
      ))}
    </ul>
  );
};
