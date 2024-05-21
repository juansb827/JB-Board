"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { font } from "@/shared/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BoardInfo = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push("/");
  };

  const handleRenameBoard = () => {};

  return (
    <div className="bg-background h-full drop-shadow-md rounded-sm flex items-center gap-2 py-1 pl-1 pr-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={handleGoToHome}
            className="rounded-lg  h-full transition hover:bg-muted cursor-pointer flex items-center px-2 py-1 gap-4"
          >
            <div className="w-16 h-full ">
              <div className="rounded-lg relative h-full w-16 bg-yellow-300">
                <Image
                  fill
                  alt="logo"
                  src={"/logoipsum-280.svg"}
                  className="p-1"
                />
              </div>
            </div>
            <span className={cn("font-semibold text-2xl", font.className)}>
              Boards
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="z-50">Go to Home</p>
        </TooltipContent>
      </Tooltip>

      <div className="border  h-6"></div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={handleRenameBoard}
            className="rounded-lg h-full px-2 transition cursor-pointer hover:bg-muted flex items-center"
          >
            <span className={cn(" text-base text-muted-foreground 3 ")}>
              Board Tile 12
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Rename board</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BoardInfo;
