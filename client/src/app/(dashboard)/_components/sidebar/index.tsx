"use client";
import React from "react";
import NewTeam from "./new-team-button";
import { List } from "./list";
import { Plus } from "lucide-react";
import { useUserDashboardInfo } from "@/features/user/user.queries";

export const Sidebar = () => {
  return (
    <aside className="fixed z-10 bg-blue-950 h-full w-16 p-3 flex flex-col items-center gap-y-4 text-white">
      <List />
      <NewTeam>
        <div className="aspect-square w-full">
          <div className="bg-white/25 h-full w-full rounded-md flex justify-center items-center opacity-60 hover:opacity-100 transition">
            <Plus className="text-white" />
          </div>
        </div>
      </NewTeam>
    </aside>
  );
};
