import React from "react";
import ToolBar from "./toolbar";
import Collaborators from "./collaborators";
import BoardInfo from "./boardInfo";

const BoardCanvas = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <div className="absolute top-2 left-2 h-12">
        <BoardInfo />
      </div>
      <div className="absolute top-2 right-2 h-12">
        <Collaborators />
      </div>
      <div className="absolute left-2 top-[50%] -translate-y-[50%] ">
        <ToolBar />
      </div>
    </main>
  );
};

export default BoardCanvas;
