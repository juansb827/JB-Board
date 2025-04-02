import { LucideIcon } from "lucide-react";

export interface Tool {
  icon: LucideIcon;
  type: ToolType;
}

export type ToolType = "Selection" | "Pencil" | "Square" | "Text";
export interface CanvasState {
  activeToolType: ToolType;
  activeLayer?: {
    // componentHandle?: any;
    layerId: string;
  };
}

export interface BoundingBoxAttributes {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ILayerBase {
  id: string;
  orderIndex: number;

  //
  // changesCount: number;
}
export interface IRectangleLayer extends ILayerBase {
  type: "rectangle";
  attributes: {
    x: number;
    y: number;
    width: number;
    height: number;
    transform: {
      flipX: boolean;
      flipY: boolean;
    };
    // color: string;
    // strokeWidth: number;
    // strokeColor: string;
  };
}

export interface ILineLayer extends ILayerBase {
  id: string;
  type: "line";
  attributes: {
    points: { x: number; y: number }[];
  };
}
export type ILayer = IRectangleLayer | ILineLayer;
export type ILayerType = ILayer["type"];
