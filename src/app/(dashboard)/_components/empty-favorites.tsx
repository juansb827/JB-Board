import { Button } from "@/components/ui/button";
import React from "react";

interface EmptySearchProps {
  teamName: string;
}

const EmptyFavorites = ({ teamName }: EmptySearchProps) => {
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-semibold">
        You have no favorites boards in {teamName}
      </h2>
      <p className="text-lg text-muted-foreground">
        Mark a board as favorite and it will appear here.
      </p>
      <Button size={"lg"}>Show me all boards in the current team</Button>
    </div>
  );
};

export default EmptyFavorites;
