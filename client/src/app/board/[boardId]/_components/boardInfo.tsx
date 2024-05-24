"use client";
import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { font } from "@/shared/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useBoard } from "@/features/board/board.queries";
import { RenameBoardDialog } from "@/features/board/rename-board-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface BoardInfoProps {
  boardId: string;
}
const BoardInfo = ({ boardId }: BoardInfoProps) => {
  const router = useRouter();
  const { data: board, isLoading } = useBoard(boardId);
  const [isRenameDialogOpen, setRenameDialogOpen] = useState(false);

  const handleGoToHome = () => {
    router.push("/");
  };

  const handleRenameBoard = () => {
    setRenameDialogOpen(true);
  };

  const BoardTitle = forwardRef<HTMLButtonElement, any>(function BoardTitle(
    props,
    ref
  ) {
    if (!board) {
      return <Skeleton className="rounded-sm h-full w-36" />;
    }
    return (
      <Button
        {...props}
        onClick={handleRenameBoard}
        variant="board"
        className="flex items-center"
        ref={ref}
      >
        {board?.title}
      </Button>
    );
  });

  return (
    <div className="bg-background h-full drop-shadow-md rounded-sm flex items-center gap-2 py-1 pl-1 pr-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="board"
            onClick={handleGoToHome}
            className="flex items-center px-2 py-1 gap-4 hover:text-primary"
          >
            <div className="rounded-lg relative h-8 w-16 bg-yellow-300">
              <Image
                fill
                alt="logo"
                src={"/logoipsum-280.svg"}
                className="p-2"
              />
            </div>
            <span className={cn("font-semibold text-2xl ", font.className)}>
              Boards
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="z-50">Go to Home</p>
        </TooltipContent>
      </Tooltip>

      <div className="border  h-6"></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <BoardTitle />
        </TooltipTrigger>
        <TooltipContent>
          <p>Rename board</p>
        </TooltipContent>
      </Tooltip>

      {board && (
        <RenameBoardDialog
          board={board}
          open={isRenameDialogOpen}
          setOpen={setRenameDialogOpen}
        />
      )}
    </div>
  );
};

/**
 * Memoize the BoardInfo component because canvas is constantly rerendered.
 */
export default React.memo(BoardInfo);
