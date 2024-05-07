import { Button } from "@/components/ui/button";
import React from "react";

interface EmptySearchProps {
  searchTerm: string;
  teamName: string;
}

const EmptySearch = ({ searchTerm, teamName }: EmptySearchProps) => {
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-normal">
        No search results for{" "}
        <span className="font-semibold">{`'${searchTerm}'`}</span> in {teamName}
      </h2>
      <p className="text-lg text-muted-foreground">
        Try searching for something else
      </p>
      <Button size={"lg"}>Show me all boards in the current team</Button>
    </div>
  );
};

export default EmptySearch;
