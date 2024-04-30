"use client";
import { Button } from "@/components/ui/button";
import NoTeam from "./_components/no-team";
import { NextPage } from "next";
import BoardList from "./_components/board-list";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import { useUserDashboardInfo } from "@/features/user/user.queries";

interface DashboardPageSearchParams {
  favorites?: string;
  searchTerm?: string;
}
export default function DashboardPage({
  searchParams: { favorites, searchTerm },
}: {
  searchParams: DashboardPageSearchParams;
}) {
  // TODO:

  const { data } = useUserDashboardInfo();
  const { activeTeam } = useDashboardStore();

  if (!data) {
    return <h1>Error</h1>;
  }
  const teams = data.user.teams;

  if (!teams.length) {
    return <NoTeam />;
  }

  if (!activeTeam) {
    return <div>No active team</div>;
  }

  return (
    <div className="h-full p-6">
      <h1 className="text-3xl pl-4 mb-4 font-semibold">
        Boards in {activeTeam.name}
      </h1>
      <BoardList
        team={activeTeam}
        searchParams={{ favorites: favorites === "true", searchTerm }}
      />
    </div>
  );
}
