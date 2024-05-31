import {
  BoundingBoxAttributes,
  IRectangleLayer,
} from "@/features/board/board.types";
import { useCanvasStore } from "@/features/board/canvas.store";
import { cn } from "@/lib/utils";
import { at, flip } from "lodash-es";
import { Squirrel } from "lucide-react";
import { isAbsolute } from "path";
import {
  PointerEvent,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface RectangleLayerProps {
  layer: IRectangleLayer;
  onClick: () => void;
  onCommitChanges: (updatedLayer: IRectangleLayer) => void;
  leref?: MutableRefObject<any>;
}
const RectangleLayer = ({
  layer,
  leref,
  onClick,
  onCommitChanges,
}: RectangleLayerProps) => {
  const [attributes, setAttributes] = useState<IRectangleLayer["attributes"]>(
    layer.attributes
  );
  const [boxAttributes, setBoxAttributes] = useState<BoundingBoxAttributes>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const selected = useCanvasStore(
    (state) => state.activeLayer?.layerId === layer.id
  );
  const showBoundingBox = selected;

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

  useLayoutEffect(() => {
    console.log("LAYER CHANGED");
    setAttributes(layer.attributes);
  }, [layer]);

  useEffect(() => {
    // TODO: unhack this
    setTimeout(() => {
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
      console.log("LAYER BBOX UPDATED");
    }, 0);
  }, [layer]);

  // const componentHandle = useRef({});
  // useImperativeHandle(
  //   componentHandle,
  //   () => ({
  //     setSelected: (value: boolean) => setSelected(value),
  //   }),
  //   []
  // );

  const attributesBeforeResize = useRef<{
    clientX: number;
    clientY: number;
    box: BoundingBoxAttributes;
    layer: {
      flipX: boolean;
      flipY: boolean;
    };
  } | null>(null);

  const attributesBeforeReposition = useRef<{
    clientX: number;
    clientY: number;
    x: number;
    y: number;
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
  const translateX = flipX ? -width : 0;
  const translateY = flipY ? -height : 0;

  const commitChanges = () => {
    onCommitChanges({
      ...layer,
      attributes: {
        ...layer.attributes,
        ...attributes,
      },
    });
  };
  const handleOnPointerDown: React.PointerEventHandler = (e) => {
    console.log("Resize Box - onPointerDown");
    attributesBeforeResize.current = null;
  };
  const handleOnPointerUp: React.PointerEventHandler = (e) => {
    attributesBeforeResize.current = null;
    commitChanges();
    console.log("Resize Box - onPointerUp");
  };
  const handleOnPointerMove = (
    e: PointerEvent<SVGCircleElement>,
    handlerPosition: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  ) => {
    if (e.buttons !== 1) return;
    console.log("r onPointerMove", handlerPosition);
    (e.target as SVGCircleElement).setPointerCapture(e.pointerId);
    if (!attributesBeforeResize.current) {
      attributesBeforeResize.current = {
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
    } = attributesBeforeResize.current;
    const {
      x: initialBoxX,
      y: initialBoxY,
      width: initialBoxWidth,
      height: initialBoxHeight,
    } = box;

    const cursorDeltaX = e.clientX - initialClientX;
    const cursorDeltaY = e.clientY - initialClientY;

    let boxWidth: number;
    let boxHeight: number;
    let boxX: number;
    let boxY: number;
    if (handlerPosition === "bottomLeft") {
      boxWidth = initialBoxWidth + -cursorDeltaX;
      boxHeight = initialBoxHeight + cursorDeltaY;
      boxX =
        boxWidth >= 0
          ? initialBoxX + cursorDeltaX
          : initialBoxX + initialBoxWidth;
      boxY = boxHeight >= 0 ? initialBoxY : initialBoxY + boxHeight;
    } else if (handlerPosition === "bottomRight") {
      boxWidth = initialBoxWidth + cursorDeltaX;
      boxHeight = initialBoxHeight + cursorDeltaY;
      boxX = boxWidth >= 0 ? initialBoxX : initialBoxX + boxWidth;
      boxY = boxHeight >= 0 ? initialBoxY : initialBoxY + boxHeight;
    } else if (handlerPosition === "topRight") {
      boxWidth = initialBoxWidth + cursorDeltaX;
      boxHeight = initialBoxHeight - cursorDeltaY;
      boxX = boxWidth >= 0 ? initialBoxX : initialBoxX + boxWidth;
      boxY =
        boxHeight >= 0
          ? initialBoxY + cursorDeltaY
          : initialBoxY + initialBoxHeight;
    } else if (handlerPosition === "topLeft") {
      boxWidth = initialBoxWidth - cursorDeltaX;
      boxHeight = initialBoxHeight - cursorDeltaY;
      boxX =
        boxWidth >= 0
          ? initialBoxX + cursorDeltaX
          : initialBoxX + initialBoxWidth;
      boxY =
        boxHeight >= 0
          ? initialBoxY + cursorDeltaY
          : initialBoxY + initialBoxHeight;
    } else {
      return;
    }

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
        // flipX: false,
        // flipY: false,
      },
    });
  };

  const handleRadius = "7px";
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
        onClick={(e) => {
          onClick();
          // console.log("click", e.target.getBBox());
        }}
      >
        <svg
          x={x}
          y={y}
          width={width}
          height={height}
          // wrapper to make all children coordinates relative to this container
        >
          <g
            transform={`scale(${scaleX} ${scaleY}) translate(${translateX} ${translateY})`}
          >
            <rect
              width={width}
              height={height}
              x={0}
              y={0}
              className={cn(
                selected ? "fill-red-300" : "fill-blue-300",
                "stroke-purple-900 stroke-[20px]"
                // "outline-[20px] outline-offset-[-20px] outline-purple-700 outline"
              )}
            />
            <Squirrel
              x={width / 2 - Math.min(50, width) / 2}
              y={height / 2 - Math.min(50, height) / 2}
              width={Math.min(50, width)}
              height={Math.min(50, height)}
            />
            {/* <line
              x1={0}
              y1={0}
              x2={width}
              y2={height}
              className="stroke-blue-900"
            />
            <line
              x1={Math.min(10, width)}
              y1={0}
              x2={width}
              y2={height}
              className="stroke-blue-900"
            /> */}
          </g>
        </svg>
      </svg>
      {showBoundingBox && (
        <g>
          <rect
            x={boxAttributes.x}
            y={boxAttributes.y}
            width={boxAttributes.width}
            height={boxAttributes.height}
            strokeDasharray={"5, 5"}
            strokeWidth={"1"}
            // "We put fill but make it transparent so we can catch the pointer events"
            fillOpacity={0}
            className="fill-white  stroke-black cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => (attributesBeforeReposition.current = null)}
            onPointerMove={(e) => {
              if (e.buttons !== 1) return;
              (e.target as SVGRectElement).setPointerCapture(e.pointerId);
              if (!attributesBeforeReposition.current) {
                attributesBeforeReposition.current = {
                  clientX: e.clientX,
                  clientY: e.clientY,
                  x,
                  y,
                };
              }
              const {
                clientX: initialClientX,
                clientY: initialClientY,
                x: initialX,
                y: initialY,
              } = attributesBeforeReposition.current;
              const cursorDeltaX = e.clientX - initialClientX;
              const cursorDeltaY = e.clientY - initialClientY;
              setAttributes((prevState) => ({
                ...prevState,
                x: initialX + cursorDeltaX,
                y: initialY + cursorDeltaY,
              }));
              setBoxAttributes((prevState) => ({
                ...prevState,
                x: initialX + cursorDeltaX,
                y: initialY + cursorDeltaY,
              }));
            }}
            onPointerUp={(e) => {
              attributesBeforeReposition.current = null;
              commitChanges();
            }}
          />
          {/* top left */}
          <circle
            className="cursor-nwse-resize"
            cx={boxAttributes.x}
            cy={boxAttributes.y}
            r={handleRadius}
            onPointerDown={(e) => handleOnPointerDown(e)}
            onPointerMove={(e) => handleOnPointerMove(e, "topLeft")}
            onPointerUp={(e) => handleOnPointerUp(e)}
          />
          {/* top right */}
          <circle
            className="cursor-nesw-resize "
            cx={boxAttributes.x + boxAttributes.width}
            cy={boxAttributes.y}
            r={handleRadius}
            onPointerDown={(e) => handleOnPointerDown(e)}
            onPointerMove={(e) => handleOnPointerMove(e, "topRight")}
            onPointerUp={(e) => handleOnPointerUp(e)}
          />
          {/* bottom left */}
          <circle
            className="cursor-nesw-resize "
            cx={boxAttributes.x}
            cy={boxAttributes.y + boxAttributes.height}
            r={handleRadius}
            onPointerDown={(e) => handleOnPointerDown(e)}
            onPointerMove={(e) => handleOnPointerMove(e, "bottomLeft")}
            onPointerUp={(e) => handleOnPointerUp(e)}
          />
          <circle
            className="cursor-nwse-resize"
            cx={boxAttributes.x + boxAttributes.width}
            cy={boxAttributes.y + boxAttributes.height}
            r={handleRadius}
            onPointerDown={(e) => handleOnPointerDown(e)}
            onPointerMove={(e) => handleOnPointerMove(e, "bottomRight")}
            onPointerUp={(e) => handleOnPointerUp(e)}
          />
        </g>
      )}
    </>
  );
};
export default RectangleLayer;
