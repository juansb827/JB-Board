import React from "react";

const ToolBar = () => {
  return (
    <div className="space-y-3">
      <div className="bg-background h-full drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        <div>Pencil</div>
        <div>Square</div>
        <div>Text</div>
      </div>
      <div className="bg-background h-full drop-shadow-md p-2 rounded-sm flex flex-col items-center">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

export default ToolBar;
