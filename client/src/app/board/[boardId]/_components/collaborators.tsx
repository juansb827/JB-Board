import { UserAwarenessData } from "@/shared/types";
import React from "react";

const Collaborators = ({
  collaborators,
}: {
  collaborators: UserAwarenessData[];
}) => {
  return (
    <div className="bg-background h-full drop-shadow-md p-2 rounded-sm flex items-center">
      Collaborators
      {collaborators.map(
        ({ user: { id, name, sessionId }, cursor: { x, y } }) => (
          <li key={sessionId}>
            {id}-{name} <br></br>
            {x}-{y}
          </li>
        )
      )}
    </div>
  );
};

export default Collaborators;
