"use client";
import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyTeamBoards from "./empty-team-boards";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import { useBoards } from "@/features/board/board.queries";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CircleUserRound,
  Ellipsis,
  ImageIcon,
  LogOut,
  Pencil,
  Plus,
  PlusIcon,
  Star,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const BoardDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="text-gray-400 hover:text-black transition" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SquarePlusButton = () => (
  <Button variant="ghost" className="p-0">
    <div className="aspect-square w-10 h-10">
      <div className="bg-blue-600 h-full w-full rounded-md flex justify-center items-center hover:opacity-100 transition">
        <Plus className="text-white" />
      </div>
    </div>
  </Button>
);

interface BoardListProps {
  teamId: string;
  teamName: string;
  searchParams: {
    favorites: boolean;
    searchTerm?: string;
  };
}
const BoardList = ({
  teamName,
  searchParams: { favorites, searchTerm },
}: BoardListProps) => {
  // const { data: dashboardInfo } = useUserDashboardInfo();
  // console.log("List Team Component", dashboardInfo);
  const { data, isLoading } = useBoards({ teamId: "33" });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }
  const boards = data.boards.nodes;

  if (!boards?.length) {
    if (favorites) {
      return <EmptyFavorites teamName={teamName} />;
    }
    if (searchTerm) {
      return <EmptySearch searchTerm={searchTerm} teamName={teamName} />;
    }
    return <EmptyTeamBoards teamName={teamName} />;
  }
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="group hover:bg-inherit">
          <TableHead className="w-12 p-4 ">
            <SquarePlusButton />
          </TableHead>
          <TableHead>
            <span className="group-hover:text-blue-800 transition cursor-pointer">
              New Board
            </span>
          </TableHead>
          <TableHead className="lg:w-64">
            <span>Owner</span>
          </TableHead>
          <TableHead className="lg:w-32 text-center">Favorites</TableHead>
          {/* Dropdown button */}
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boards.map((board) => (
          <TableRow key={board.id}>
            <TableCell>
              <div className="w-10 h-10  border rounded-sm relative">
                <Image
                  alt={"Board Image"}
                  fill
                  src={"https://placehold.co/600x600"}
                />
              </div>
            </TableCell>
            <TableCell className="h-10">
              <div className="">
                <p className="font-semibold truncate ... ">
                  {board.title}
                  {board.title}
                </p>
                <p className="text-muted-foreground truncate ...">
                  Modified by Put A Name Here. Apr 25{" "}
                </p>
              </div>
            </TableCell>
            <TableCell>Some Other User</TableCell>
            <TableCell className="flex justify-center">
              <Star
                // fill="rgb(30 64 175)"
                // className="text-gray-500 hover:text-blue-800 "
                className={cn([
                  "text-gray-300 hover:text-blue-800 transition",
                  +board.id % 2 === 1 && "text-blue-800 fill-blue-800",
                ])}
              />
            </TableCell>
            <TableCell>
              <BoardDropdown />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BoardList;
