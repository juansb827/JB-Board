import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import {
  LucideProps,
  Pencil,
  Square,
  Type as TextIcon,
  Undo,
  Redo,
  LucideIcon,
} from "lucide-react";
import React, { ComponentType } from "react";

const ToolBarButton = ({
  icon: Icon,
  label,
  isActive,
  isDisabled,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <SimpleTooltip label={label} side="right" sideOffset={20} asChild>
      <Button
        variant={isActive ? "boardActive" : "board"}
        className="p-2 "
        disabled={isDisabled}
      >
        <Icon className="w-6 h-6" />
      </Button>
    </SimpleTooltip>
  );
};
const ToolBar = () => {
  return (
    <div className="space-y-3">
      <div className="bg-background drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        <ToolBarButton icon={Pencil} label="Pencil" isActive />
        <ToolBarButton icon={Square} label="Square" />
        <ToolBarButton icon={TextIcon} label="Text" />
      </div>
      <div className="bg-background h-full drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        <ToolBarButton icon={Undo} label="Undo" isDisabled />
        <ToolBarButton icon={Redo} label="Redo" isDisabled />
      </div>
    </div>
  );
};

export default ToolBar;
