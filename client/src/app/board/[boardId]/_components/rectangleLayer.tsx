import { IRectangleLayer } from "@/features/board/board.types";
import { cn } from "@/lib/utils";
import { at, flip } from "lodash-es";
import {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface RectangleLayerProps {
  layer: IRectangleLayer;
  onClick: (instance: any) => void;
  leref?: MutableRefObject<any>;
}
const RectangleLayer = ({ layer, leref, onClick }: RectangleLayerProps) => {
  const [attributes, setAttributes] = useState<IRectangleLayer["attributes"]>(
    layer.attributes
  );
  const [boxAttributes, setBoxAttributes] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [selected, setSelected] = useState(false);

  const layerRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    const box = layerRef.current?.getBBox();
    if (!box) {
      return;
    }
    setBoxAttributes({
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    });
  }, []);

  const componentHandle = useRef({});
  useImperativeHandle(
    componentHandle,
    () => ({
      setSelected: (value: boolean) => setSelected(value),
    }),
    []
  );

  const attributesOnPointerDown = useRef<{
    clientX: number;
    clientY: number;
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    layer: {
      flipX: boolean;
      flipY: boolean;
    };
  } | null>(null);

  const {
    x,
    y,
    width,
    height,
    transform: { flipX, flipY },
  } = attributes;
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  const translateX = flipX ? -(2 * x + width) : 0;
  const translateY = flipY ? -(2 * y + height) : 0;
  return (
    <>
      <svg
        ref={layerRef}
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`${x} ${y} ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <g
          transform={`scale(${scaleX} ${scaleY}) translate(${translateX} ${translateY})`}
        >
          <rect
            width={width}
            height={height}
            x={x}
            y={y}
            className={cn(
              selected ? "fill-red-300" : "fill-blue-300",
              "outline-[20px] outline-offset-[-20px] outline-purple-700 outline"
            )}
          />
          <line
            x1={x}
            y1={y}
            x2={x + width}
            y2={y + height}
            className="stroke-blue-900"
          />
          <line
            x1={x + 40}
            y1={y}
            x2={x + width}
            y2={y + height}
            className="stroke-blue-900"
          />
        </g>
      </svg>
      <g>
        <rect
          x={boxAttributes.x}
          y={boxAttributes.y}
          width={boxAttributes.width}
          height={boxAttributes.height}
          className="outline-[3px] outline-dashed  fill-none"
        />
        {/* top left */}
        <circle cx={boxAttributes.x} cy={boxAttributes.y} r="10" />
        {/* bottom left */}
        <circle
          cx={boxAttributes.x}
          cy={boxAttributes.y + boxAttributes.height}
          r="10"
        />
        {/* top right */}
        <circle
          cx={boxAttributes.x + boxAttributes.width}
          cy={boxAttributes.y}
          r="10"
        />
        <circle
          cx={boxAttributes.x + boxAttributes.width}
          cy={boxAttributes.y + boxAttributes.height}
          r="10"
          onPointerDown={(e: any) => {
            attributesOnPointerDown.current = null;
            console.log("r down", e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            e.target.setPointerCapture(e.pointerId);
            if (!attributesOnPointerDown.current) {
              attributesOnPointerDown.current = {
                box: { ...boxAttributes },
                layer: {
                  flipX: attributes.transform.flipX,
                  flipY: attributes.transform.flipY,
                },
                clientX: e.clientX,
                clientY: e.clientY,
              };
            }

            // console.log("r nmove");
            let {
              box,
              layer: { flipX, flipY },
              clientX: initialClientX,
              clientY: initialClientY,
            } = attributesOnPointerDown.current;
            const {
              x: initialBoxX,
              y: initialBoxY,
              width: initialBoxWidth,
              height: initialBoxHeight,
            } = box;

            const cursorDeltaX = e.clientX - initialClientX;
            const cursorDeltaY = e.clientY - initialClientY;
            let boxWidth = initialBoxWidth + cursorDeltaX;
            let boxHeight = initialBoxHeight + cursorDeltaY;
            const boxX = Math.floor(
              boxWidth >= 0 ? initialBoxX : initialBoxX + boxWidth
            );
            const boxY = Math.floor(
              boxHeight >= 0 ? initialBoxY : initialBoxY + boxHeight
            );

            flipX = boxWidth >= 0 ? flipX : !flipX;

            flipY = boxHeight >= 0 ? flipY : !flipY;

            boxWidth = Math.abs(boxWidth);
            boxHeight = Math.abs(boxHeight);

            setBoxAttributes({
              width: boxWidth,
              height: boxHeight,
              x: boxX,
              y: boxY,
            });
            setAttributes({
              width: boxWidth,
              height: boxHeight,
              x: boxX,
              y: boxY,
              transform: {
                flipX,
                flipY,
              },
            });
          }}
          onPointerUp={() => {
            attributesOnPointerDown.current = null;
            console.log("r up");
          }}
        />
      </g>
    </>
  );
};

export default RectangleLayer;
