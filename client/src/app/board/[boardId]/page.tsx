"use client";
import React from "react";
import BoardCanvas from "./_components/boardCanvas";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useParams } from "next/navigation";

const BoardPage = () => {
  const { boardId} = useParams<{ boardId: string }>();
  return (
    <TooltipProvider>
      <BoardCanvas boardId={boardId} />
    </TooltipProvider>
  );
};

export default BoardPage;
