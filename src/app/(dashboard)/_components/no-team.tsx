import { Button } from "@/components/ui/button";
import React from "react";
import NewTeam from "./sidebar/new-team-button";

const NoTeam = () => {
  return (
    <div className="h-full flex flex-col items-center gap-5 pt-20">
      <h2 className="text-2xl font-semibold">Welcome!</h2>
      <p className="text-lg text-muted-foreground">
        Create your first Team to get started
      </p>
      <NewTeam>
        <Button size={"lg"}>Create Team</Button>
      </NewTeam>
    </div>
  );
};

export default NoTeam;
