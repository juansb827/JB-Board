import { LucideIcon } from "lucide-react";

export interface Tool {
  icon: LucideIcon;
  type: ToolType;
}

export type ToolType = "Selection" | "Pencil" | "Square" | "Text";
export interface CanvasState {
  activeToolType: ToolType;
  activeLayer?: {
    componentHandle: any;
    // ref: any;
  };
}

export interface IRectangleLayer {
  id: string;
  type: "rectangle";
  attributes: {
    x: number;
    y: number;
    width: number;
    height: number;
    // color: string;
    // strokeWidth: number;
    // strokeColor: string;
  };
}

export interface ILineLayer {
  id: string;
  type: "line";
  attributes: {
    path: string;
    // color: string;
    // strokeWidth: number;
    // strokeColor: string;
  };
}
export type ILayer = IRectangleLayer | ILineLayer;
