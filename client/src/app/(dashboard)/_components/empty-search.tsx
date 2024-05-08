import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import Link from "next/link";
import React from "react";

interface EmptySearchProps {
  searchTerm: string;
  teamName: string;
}

const EmptySearch = ({ searchTerm, teamName }: EmptySearchProps) => {
  const { setSearchParams } = useDashboardStore();
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-normal">
        No search results for{" "}
        <span className="font-semibold">{`'${searchTerm}'`}</span> in {teamName}
      </h2>
      <p className="text-lg text-muted-foreground">
        Try searching for something else
      </p>
      <Button size={"lg"} asChild>
        <Link href={"/"} onClick={() => setSearchParams({})}>
          Show me all boards in the current team
        </Link>
      </Button>
    </div>
  );
};

export default EmptySearch;
