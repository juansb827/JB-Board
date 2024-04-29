import { Button } from "@/components/ui/button";
import { useCreateBoard } from "@/features/board/board.queries";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import React from "react";

interface EmptyTeamBoards {
  team: {
    id: string;
    name: string;
  };
}

const EmptyTeamBoards = ({ team }: EmptyTeamBoards) => {
  const { mutateAsync, mutate, data, isPending } = useCreateBoard();

  const handleCreate = async () => {
    mutate({
      teamId: team.id,
    });
  };

  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-semibold">
        You have no boards in {team.name}
      </h2>
      <p className="text-lg text-muted-foreground">Create your first board</p>
      <Button disabled={isPending} onClick={handleCreate} size={"lg"}>
        Create Board
      </Button>
    </div>
  );
};

export default EmptyTeamBoards;
