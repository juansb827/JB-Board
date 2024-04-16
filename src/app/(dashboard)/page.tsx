import { Button } from "@/components/ui/button";
import NoTeam from "./_components/no-team";
import { NextPage } from "next";
import BoardList from "./_components/board-list";

interface DashboardPageSearchParams {
  favorites?: string;
  searchTerm?: string;
}
export default async function DashboardPage({
  searchParams: { favorites, searchTerm },
}: {
  searchParams: DashboardPageSearchParams;
}) {
  const teams = [{}];
  // const teams = [];
  const boards = [{}];
  return (
    <div className="h-full p-6">
      {!teams.length ? (
        <NoTeam />
      ) : (
        <BoardList
          teamId="123"
          searchParams={{ favorites: favorites === "true", searchTerm }}
        />
      )}
    </div>
  );
}
