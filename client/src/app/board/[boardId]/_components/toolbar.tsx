import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Tool, ToolType } from "@/features/board/board.types";
import { useCanvasStore } from "@/features/board/canvas.store";
import {
  LucideProps,
  Pencil,
  Square,
  Type as TextIcon,
  Undo,
  Redo,
  LucideIcon,
  MousePointer,
} from "lucide-react";
import React, { ComponentType } from "react";

const Tools: Tool[] = [
  { icon: MousePointer, type: "Selection" },
  { icon: Pencil, type: "Pencil" },
  { icon: Square, type: "Square" },
  { icon: TextIcon, type: "Text" },
];

const ToolBarButton = ({
  icon: Icon,
  label,
  isActive,
  isDisabled,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <SimpleTooltip label={label} side="right" sideOffset={20} asChild>
      <Button
        variant={isActive ? "boardActive" : "board"}
        className="p-2 "
        disabled={isDisabled}
        onClick={onClick}
      >
        <Icon className="w-6 h-6" />
      </Button>
    </SimpleTooltip>
  );
};
const ToolBar = () => {
  const activeToolType = useCanvasStore((store) => store.activeToolType);
  const setActiveToolType = useCanvasStore((store) => store.setActiveToolType);

  return (
    <div className="space-y-3">
      <div className="bg-background drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        {Tools.map(({ icon, type }) => (
          <ToolBarButton
            key={type}
            icon={icon}
            label={type}
            isActive={type === activeToolType}
            onClick={() => setActiveToolType(type)}
          />
        ))}
      </div>
      <div className="bg-background h-full drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        <ToolBarButton icon={Undo} label="Undo" isDisabled />
        <ToolBarButton icon={Redo} label="Redo" isDisabled />
      </div>
    </div>
  );
};

export default ToolBar;
