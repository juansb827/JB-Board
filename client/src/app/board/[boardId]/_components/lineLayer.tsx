import { ILineLayer } from "@/features/board/board.types";
import { getStroke } from "perfect-freehand";
import React, { useState } from "react";

function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

const options = {
  size: 16,
  thinning: 0,
  // smoothing: 0.5,
  // streamline: 0.5,
  // easing: (t) => t,
  // start: {
  //   taper: 0,
  //   easing: (t) => t,
  //   cap: true,
  // },
  // end: {
  //   taper: 100,
  //   easing: (t) => t,
  //   cap: true,
  // },
};
interface LineLayerProps {
  layer: ILineLayer;
}
export const LineLayer = ({ layer }: LineLayerProps) => {
  const stroke = getStroke(layer.attributes.points, options);
  const pathData = getSvgPathFromStroke(stroke);

  return <path d={pathData} />;
};

interface UncommitedLineLayerProps {
  onCommitChanges: (newLine: Pick<ILineLayer, "attributes">) => void;
  // x: number;
  // y: number;
  // width: number;
  // height: number;
  // viewbox: {
  //   x: number;
  //   y: number;
  //   width: number;
  //   height: number;
  // };
}
const UncommitedLineLayer = ({
  onCommitChanges,
  viewbox,
  x,
  y,
  width,
  height,
}: UncommitedLineLayerProps) => {
  const [points, setPoints] = useState<any>([]);
  const handleOnPointerDown = (e) => {
    {
      /* This allows the pointerUp and  pointerDown to be captured even if the cursor leaves the canvas or the  cursor
      moves to an area where the rect is overlapped e.g (the toolbar)  */
    }
    (e.target as SVGRectElement).setPointerCapture(e.pointerId);
    setPoints([]);
  };
  const handleOnPointerMove: React.MouseEventHandler = (e) => {
    if (e.buttons !== 1) return;
    // console.log("Drawing - onMouseMove", e.clientX, e.clientY);
    const x = e.clientX;
    const y = e.clientY;
    setPoints((prevState) => [...prevState, { x, y }]);
  };

  const handleOnPointerUp: React.PointerEventHandler<SVGRectElement> = (e) => {
    onCommitChanges({
      attributes: {
        points,
      },
    });
    setPoints([]);
  };
  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);
  console.log(points.length, stroke.length);

  return (
    <>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        width="100%"
        height="100%"
        // onClick={() => {
        //   console.log("click drawing");
        // }}
        onPointerDown={handleOnPointerDown}
        onPointerMove={handleOnPointerMove}
        onPointerUp={handleOnPointerUp}
        fillOpacity={0}
        fill="red"
      ></rect>
      <path d={pathData} />
    </>
  );
};

export default UncommitedLineLayer;
