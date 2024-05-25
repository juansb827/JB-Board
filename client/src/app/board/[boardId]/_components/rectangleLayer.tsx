import { IRectangleLayer } from "@/features/board/board.types";
import { cn } from "@/lib/utils";
import {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
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
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setAttributes(layer.attributes);
  }, [layer.attributes]);

  const componentHandle = useRef({});
  useImperativeHandle(
    componentHandle,
    () => ({
      setSelected: (value: boolean) => setSelected(value),
    }),
    []
  );

  const attributesOnPointerDown = useRef<IRectangleLayer["attributes"]>(
    {} as any
  );

  const { x, y, width, height } = attributes;
  return (
    <>
      <rect
        onPointerDown={(e: any) => {
          attributesOnPointerDown.current = {
            ...attributes,
          };
          e.target.setPointerCapture(e.pointerId);
          console.log("r down");
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          const { x: initialX, y: initialY } = attributesOnPointerDown.current;

          const width = Math.abs(e.clientX - initialX);
          const height = Math.abs(e.clientY - initialY);
          const x = e.clientX < initialX ? e.clientX : initialX;
          const y = e.clientY < initialY ? e.clientY : initialY;
          // Vgcconst x = e.clientX < initialX ? initialX - width : initialX;

          setAttributes((prevState) => ({
            ...prevState,
            width,
            height,
            x,
            y,
          }));
          // console.log("rect move");
        }}
        onPointerUp={() => console.log("r up")}
        onClick={() => onClick(componentHandle.current)}
        key={layer.id}
        width={width}
        height={height}
        x={x}
        y={y}
        // rx="30"
        // ry="30"
        className={cn(
          selected ? "fill-red-300" : "fill-blue-300",
          "stroke-[20px] stroke-purple-700"
        )}
        // transform="rotate(-40, 300, 300)"
      />
    </>
  );
};

export default RectangleLayer;
