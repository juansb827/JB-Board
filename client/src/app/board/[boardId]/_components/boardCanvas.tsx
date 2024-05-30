"use client";
import React, { useEffect, useRef, useState } from "react";
import ToolBar from "./toolbar";
import Collaborators from "./collaborators";
import BoardInfo from "./boardInfo";
import { useRoom, useRoomSubscription } from "@/features/room/room.queries";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { UserAwarenessData, isNonNullable } from "@/shared/types";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import { Maybe } from "@generated/graphql/graphql";
import { useDebounceValue } from "usehooks-ts";
import { type ClassValue, clsx } from "clsx";
import { getStroke } from "perfect-freehand";
import { useCanvasStore } from "@/features/board/canvas.store";
import {
  ILayer,
  IRectangleLayer,
  ToolType,
} from "@/features/board/board.types";
import RectangleLayer from "./rectangleLayer";
import { useStore } from "zustand";

/**
 * Don’t construct class names dynamically
 * or tailwind compiler wont be able to include them in the build
 * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
const avatarColors: string[] = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-lime-500",
];
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

interface BoardCanvasProps {
  boardId: string;
}
const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
  const [roomState, setRoomState] = useState({});
  const docRef = useRef<Y.Doc>();
  const [awareness, setAwareness] = useState<
    WebsocketProvider["awareness"] | null
  >(null);
  const { data: userData } = useUserDashboardInfo();
  const [awarenessDataList, setAwarenessDataList] = useState<
    UserAwarenessData[]
  >([]);
  const [debouncedMousePosition, setMousePosition] = useDebounceValue<{
    x: number;
    y: number;
  } | null>(null, 500);
  const [avatarColorClassName] = useState(() => {
    const randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
  });
  const [currentConnectionId, setCurrentConnectionId] = useState<
    string | undefined
  >(undefined);
  const activeToolType = useCanvasStore((store) => store.activeToolType);

  useEffect(() => {
    // Initialize yjs
    // collection of shared objects
    docRef.current = new Y.Doc();
    const doc = docRef.current;
    // const doc = new Y.Doc();
    const wsProvider: WebsocketProvider = new WebsocketProvider(
      "ws://localhost:5555",
      "roomId4",
      doc
    );

    const wsAwareness = wsProvider.awareness;

    wsAwareness.on("change", (changes: any) => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      // const list2: UserAwarenessData[] = Array.from(
      //   wsAwareness.getStates().entries()
      // ) as unknown as UserAwarenessData[];
      const list: UserAwarenessData[] = Array.from(
        wsAwareness.getStates().values()
      ) as unknown as UserAwarenessData[];
      // console.log("prefilter", list);
      setAwarenessDataList(list.filter((data) => data.user || data.cursor));
    });

    wsProvider.on("status", (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    const layersMap = doc.getMap<ILayer>("layersMap");
    layersMap.observe((event) => {
      console.log("ymap was modified", Array.from(event.keysChanged));
      Array.from(event.keysChanged).forEach((key) =>
        console.log(key, layersMap.get(key))
      );
      setLayers(
        Array.from(layersMap.values()).sort(
          (a, b) => a.orderIndex - b.orderIndex
        )
      );
    });

    setAwareness(wsAwareness);
    return () => {
      wsAwareness.destroy();
      wsProvider.destroy();
      doc.destroy();
    };
  }, []);

  useEffect(() => {
    const user = userData?.user;
    if (awareness && user) {
      const connectionId = `${user.id}-${Math.floor(Math.random() * 1000)}`;
      const info: UserAwarenessData["user"] = {
        id: user.id,
        connectionId,
        name: user.email,
        color: "#ffb61e", // should be a hex color
        avatarColorClassName: avatarColorClassName,
        nameInitials: user.name
          .split(" ")
          .filter(Boolean)
          .map((name) => name[0].toLocaleUpperCase())
          .join(""),
        avatarUrl: undefined,
        //avatarUrl: "https://github.com/shadcn.png",
      };
      awareness.setLocalStateField("user", info);
      setCurrentConnectionId(connectionId);
    }
  }, [awareness, userData?.user, avatarColorClassName]);

  useEffect(() => {
    if (!awareness || !debouncedMousePosition) {
      return;
    }
    const { x, y } = debouncedMousePosition;
    const info: UserAwarenessData["cursor"] = {
      x,
      y,
    };
    awareness.setLocalStateField("cursor", info);
    console.log("Re render - mouse", debouncedMousePosition);
  }, [awareness, debouncedMousePosition]);

  // useRoomSubscription({ boardId: "2" });

  // const { data } = useRoom({ boardId: "2" });

  const [layers, setLayers] = useState<ILayer[]>([
    // {
    //   width: 100,
    //   height: 100,
    //   x: 100,
    //   y: 100,
    // },
    // {
    //   width: 100,
    //   height: 100,
    //   x: 300,
    //   y: 300,
    // },
  ]);

  const setActiveLayer = useCanvasStore((store) => store.setActiveLayer);
  // const activeLayer = useCanvasStore((store) => store.activeLayer);
  function drawLayer(layer: ILayer) {
    let Component = null;
    switch (layer.type) {
      case "rectangle":
        Component = RectangleLayer;
        break;
      default:
        Component = RectangleLayer;
        break;
    }

    return (
      <Component
        key={layer.id}
        layer={layer as any}
        // leref={layerRef}
        onClick={() => {
          // if (activeLayer) {
          //   activeLayer.componentHandle.setSelected(false);
          // }
          setActiveLayer({ layerId: layer.id });
          // componentHandle.setSelected(true);
        }}
        onCommitChanges={(updatedLayer) => {
          console.log("onCommitChanges", updatedLayer);
          docRef.current?.getMap("layersMap")?.set(layer.id, updatedLayer);
        }}
      />
    );
  }
  const handleOnCanvasClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    switch (activeToolType) {
      case "Selection":
        const clickedNoElement = e.target === e.currentTarget;
        if (clickedNoElement) {
          setActiveLayer(undefined);
        }
        return;
        break;
      case "Pencil":
        return;
        break;
      case "Square":
        const doc = docRef.current;
        if (!doc) return;
        const layerMap = doc.getMap<ILayer>("layersMap");
        const newRectangle: IRectangleLayer = {
          id: crypto.randomUUID(),
          orderIndex: layerMap.size,
          type: "rectangle",
          attributes: {
            x: e.clientX,
            y: e.clientY,
            width: 100,
            height: 100,
            transform: {
              flipX: false,
              flipY: false,
            },
          },
        };
        layerMap.set(newRectangle.id, newRectangle);
        break;
      case "Text":
        break;
      default:
        const exhaustiveCheck: never = activeToolType;
        console.log("Tool Type not handled");
        break;
    }
    // setLayers((prevState) => [
    //   ...prevState,
    //   {
    //     width: 100,
    //     height: 100,
    //     x: e.clientX,
    //     y: e.clientY,
    //   },
    // ]);
  };

  const [points, setPoints] = useState<any>([]);
  const [pointerState, setPointerState] = useState<string>("up");
  const handleOnMouseMove: React.MouseEventHandler = (e) => {
    // if (pointerState === "up") {
    //   return;
    // }
    // const x = e.clientX;
    // const y = e.clientY;
    // setPoints((prevState) => [...prevState, { x, y }]);
  };
  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);

  //console.log(points);

  console.log("Layers", layers);
  return (
    <main
      className="h-full w-full relative  touch-none"
      // onMouseMove={handleOnMouseMove}
      // onMouseDown={() => setPointerState("down")}
      // onMouseUp={() => setPointerState("up")}
    >
      <div className="absolute top-2 left-2 h-12 z-30">
        {/* {JSON.stringify(roomState, null, 4)} */}
        <BoardInfo boardId={boardId} />
      </div>
      <div className="absolute top-2 right-2 h-14 z-30">
        <Collaborators
          collaborators={awarenessDataList
            .map((data) => data.user)
            .filter(isNonNullable)}
          userId={userData?.user?.id}
          connectionId={currentConnectionId}
        />
      </div>
      <div className="absolute left-2 top-[50%] -translate-y-[50%] z-30">
        <ToolBar />
      </div>
      <div
        className="absolute top-[0px] left-0px] bg-gray-600 w-[100vw] h-[100vh] z-0"
        // onMouseDown={() => console.log("down")}
        // onMouseUp={() => console.log("up")}
        // onMouseMove={(e) => console.log("move")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          onClick={handleOnCanvasClick}
        >
          {layers.map((layer) => drawLayer(layer))}
          <path d={pathData} /> Sorry, your browser does not support inline SVG.
        </svg>
      </div>
    </main>
  );
};

export default BoardCanvas;
