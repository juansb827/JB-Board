"use client";

import React from "react";
import Item from "./item";

export const List = () => {
  const teams = [
    {
      id: 1,
      name: "Team 1",
      imageUrl: "/logoipsum-247.svg",
    },
    {
      id: 2,
      name: "Team 2",
      imageUrl: "/logoipsum-327.svg",
    },
    {
      id: 3,
      name: "Team 3",
      imageUrl: "/logoipsum-293.svg",
    },
    {
      id: 4,
      name: "Team 3",
    },
  ];

  return (
    <ul className="space-y-4 w-full">
      {teams.map((team) => (
        <Item
          key={team.id}
          id={team.id}
          name={team.name}
          imageUrl={team.imageUrl}
          isActive={team.id === 3}
        />
      ))}
    </ul>
  );
};
