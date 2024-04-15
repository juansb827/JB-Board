import React from "react";
import NewTeam from "./new-team-button";
import { List } from "./list";

export const Sidebar = () => {
  return (
    <aside className="fixed z-10 bg-blue-950 h-full w-16 p-3 flex flex-col items-center gap-y-4 text-white">
      <List />
      <NewTeam />
    </aside>
  );
};
