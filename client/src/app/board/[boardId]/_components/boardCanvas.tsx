"use client";
import React, { useEffect, useState } from "react";
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

interface BoardCanvasProps {
  boardId: string;
}
const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
  const [roomState, setRoomState] = useState({});
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

  useEffect(() => {
    // Initialize yjs
    const doc = new Y.Doc(); // collection of shared objects
    const wsProvider: WebsocketProvider = new WebsocketProvider(
      "ws://localhost:5555",
      "roomId",
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
      console.log("prefilter", list);
      setAwarenessDataList(list.filter((data) => data.user || data.cursor));
    });

    wsProvider.on("status", (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    const roomState = doc.getMap("roomState");
    roomState.set("slot1", "999");
    roomState.set("slot2", "999");
    roomState.set("slot3", "999");
    roomState.observe((event) => {
      setRoomState(doc.toJSON());
      console.log("roomState changed", doc.toJSON());
    });
    const slot = ["slot1", "slot2", "slot3"].at(Math.floor(Math.random() * 3));

    console.log("Writing to " + slot);
    const a = setInterval(() => {
      roomState.set(slot, +Math.random());
    }, 5000);

    setAwareness(wsAwareness);
    return () => {
      clearInterval(a);
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

  const handleOnMouseMove: React.MouseEventHandler = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });
  };
  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
      onMouseMove={handleOnMouseMove}
    >
      <div className="absolute top-2 left-2 h-12">
        {/* {JSON.stringify(roomState, null, 4)} */}
        <BoardInfo boardId={boardId} />
      </div>
      <div className="absolute top-2 right-2 h-14">
        <Collaborators
          collaborators={awarenessDataList
            .map((data) => data.user)
            .filter(isNonNullable)}
          userId={userData?.user?.id}
          connectionId={currentConnectionId}
        />
      </div>
      <div className="absolute left-2 top-[50%] -translate-y-[50%] ">
        <ToolBar />
      </div>
    </main>
  );
};

export default BoardCanvas;
