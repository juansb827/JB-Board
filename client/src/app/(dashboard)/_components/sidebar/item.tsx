import React, { MouseEventHandler } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ItemProps {
  id: string;
  isActive: boolean;
  name: string;
  imageUrl?: string;
  onClick: MouseEventHandler;
}
const Item = ({ id, name, imageUrl, isActive, onClick }: ItemProps) => {
  let baseClass = [
    "rounded-md cursor-pointer opacity-70 hover:opacity-100 transition",
    isActive && "opacity-100",
  ];
  return (
    <div className="aspect-square relative">
      {imageUrl ? (
        <Image
          fill
          alt={name}
          src={imageUrl}
          className={cn(baseClass)}
          onClick={onClick}
        />
      ) : (
        <div
          className={cn([
            ...baseClass,
            "bg-pink-500 h-full w-full text-3xl flex justify-center items-center",
          ])}
        >
          T
        </div>
      )}
    </div>
  );
};

export default Item;
