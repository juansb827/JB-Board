"use client";
import React from "react";
import BoardCanvas from "./_components/boardCanvas";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useParams } from "next/navigation";

const BoardPage = () => {
  const router = useParams();
  console.log(6666, router);
  return (
    <TooltipProvider>
      <BoardCanvas />
    </TooltipProvider>
  );
};

export default BoardPage;
