import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SimpleTooltip,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { UserAwarenessData, isNonNullable } from "@/shared/types";
import { connect } from "http2";
import React from "react";

const MAX_SHOWN_COLLABORATORS = 4;

const Collaborators = ({
  collaborators,
  userId,
  connectionId,
}: {
  userId?: string;
  connectionId?: string;
  collaborators: Array<NonNullable<UserAwarenessData["user"]>>;
}) => {
  if (!userId || !connectionId) {
    return (
      <div className="bg-background h-full drop-shadow-md rounded-sm flex items-center py-2 px-1 ">
        <Skeleton className="rounded-sm h-full w-52" />
      </div>
    );
  }
  let self = collaborators.find((c) => c.connectionId === connectionId);
  let others = collaborators.filter((c) => c.connectionId !== connectionId);

  let shownCollaborators = [self, ...others].filter(isNonNullable);
  shownCollaborators = shownCollaborators.slice(0, MAX_SHOWN_COLLABORATORS);
  let hiddenCollaboratorsCount = collaborators.length - MAX_SHOWN_COLLABORATORS;
  return (
    <div className="bg-background h-full drop-shadow-md px-4 rounded-sm flex items-center gap-3">
      {shownCollaborators.map((user) => {
        if (!user) {
          return null;
        }
        return (
          <SimpleTooltip
            key={user.connectionId}
            label={user.id === userId ? `${user.name} (You)` : user.name}
          >
            <Avatar>
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback
                className={cn(user.avatarColorClassName, "text-white")}
              >
                {user.nameInitials.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </SimpleTooltip>
        );
      })}
      {hiddenCollaboratorsCount > 0 && (
        <SimpleTooltip label={`${hiddenCollaboratorsCount} more collaborators`}>
          <Avatar>
            <AvatarFallback className="text-white bg-gray-600">
              {`+${hiddenCollaboratorsCount}`}
            </AvatarFallback>
          </Avatar>
        </SimpleTooltip>
      )}
    </div>
  );
};

export default Collaborators;
