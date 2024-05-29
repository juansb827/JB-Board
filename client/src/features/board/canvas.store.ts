import { create } from "zustand";
import { CanvasState, ToolType } from "./board.types";
import { combine } from "zustand/middleware";

const initialState: CanvasState = {
  activeToolType: "Selection",
};

export const useCanvasStore = create(
  combine(initialState, (set) => ({
    setActiveToolType: (toolType: ToolType) =>
      set((state) => ({ ...state, activeToolType: toolType })),
    setActiveLayer: (layerId: string) =>
      set((state) => ({ ...state, activeLayer: { layerId } })),
  }))
);
