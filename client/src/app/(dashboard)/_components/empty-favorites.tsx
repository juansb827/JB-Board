"use client";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import Link from "next/link";
import React from "react";

interface EmptySearchProps {
  teamName: string;
}

const EmptyFavorites = ({ teamName }: EmptySearchProps) => {
  const { setSearchParams } = useDashboardStore();
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-semibold">
        You have no favorites boards in {teamName}
      </h2>
      <p className="text-lg text-muted-foreground">
        Mark a board as favorite and it will appear here.
      </p>
      <Button size={"lg"} asChild>
        <Link href={"/"} onClick={() => setSearchParams({})}>
          Show me all boards in the current team
        </Link>
      </Button>
    </div>
  );
};

export default EmptyFavorites;
