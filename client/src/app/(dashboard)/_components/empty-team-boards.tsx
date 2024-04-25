import { Button } from "@/components/ui/button";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import React from "react";

interface EmptyTeamBoards {
  teamName: string;
}

const EmptyTeamBoards = ({ teamName }: EmptyTeamBoards) => {
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-semibold">
        You have no boards in {teamName}
      </h2>
      <p className="text-lg text-muted-foreground">Create your first board</p>
      <Button size={"lg"}>Create Board</Button>
    </div>
  );
};

export default EmptyTeamBoards;
