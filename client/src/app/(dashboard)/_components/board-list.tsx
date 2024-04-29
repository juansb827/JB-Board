"use client";
import React, { MouseEventHandler, forwardRef } from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyTeamBoards from "./empty-team-boards";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import { useBoards, useCreateBoard } from "@/features/board/board.queries";
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
import { BoardsDocument, BoardsQuery } from "@generated/graphql/graphql";
import { formatDistanceToNow } from "date-fns";
import { junit } from "node:test/reporters";
import { Skeleton } from "@/components/ui/skeleton";

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

const SquarePlusButton = ({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick: MouseEventHandler;
}) => (
  <Button variant="ghost" className="p-0" disabled={disabled} onClick={onClick}>
    <div className="aspect-square w-10 h-10">
      <div className="bg-blue-600 h-full w-full rounded-md flex justify-center items-center hover:opacity-100 transition">
        <Plus className="text-white" />
      </div>
    </div>
  </Button>
);

const BoardTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-10 h-10 rounded-sm" />
      </TableCell>
      <TableCell className="h-10 space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
    </TableRow>
  );
};
const BoardTableRow = ({
  board,
}: {
  board: BoardsQuery["boards"]["nodes"][number];
}) => {
  const author = board.author.name;
  const lastEditor = board.author.name; // TODO: fix
  const lastUpdateAt = formatDistanceToNow(board.updatedAt, {
    addSuffix: true,
  });
  return (
    <TableRow key={board.id}>
      <TableCell>
        <div className="w-10 h-10  border rounded-sm relative">
          <Image alt={"Board Image"} fill src={board.imageUrl} />
        </div>
      </TableCell>
      <TableCell className="h-10">
        <div className="">
          <p className="font-semibold truncate ... ">{board.title}</p>
          <p className="text-muted-foreground truncate ...">
            Modified by {lastEditor}, {lastUpdateAt}
          </p>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{author}</TableCell>
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
  );
};

type BoardTableProps = {
  team: {
    id: string;
    name: string;
  };
  isQueryLoading?: boolean;
  boards: BoardsQuery["boards"]["nodes"];
};

const BoardTable = (props: BoardTableProps) => {
  const { team, isQueryLoading, boards } = props;
  const { mutateAsync, mutate, isPending: isCreatePending } = useCreateBoard();
  const handleCreate = async () => {
    if (isCreatePending) {
      return;
    }
    mutate({
      teamId: team.id,
    });
  };

  const isAnyLoading = isCreatePending || isQueryLoading;

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="group hover:bg-inherit">
          <TableHead className="w-12 p-4 ">
            <SquarePlusButton onClick={handleCreate} disabled={isAnyLoading} />
          </TableHead>
          <TableHead>
            <span
              onClick={handleCreate}
              className={cn(
                "group-hover:text-blue-800 transition cursor-pointer",
                isAnyLoading && "cursor-not-allowed opacity-50"
              )}
            >
              New Board
            </span>
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            <span>Owner</span>
          </TableHead>
          <TableHead className="lg:w-32 text-center">Favorites</TableHead>
          {/* Dropdown button */}
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isQueryLoading
          ? Array(7)
              .fill(null)
              .map((_, idx) => <BoardTableRowSkeleton key={idx} />)
          : boards.map((board) => (
              <BoardTableRow board={board} key={board.id} />
            ))}
      </TableBody>
    </Table>
  );
};

interface BoardListProps {
  team: {
    id: string;
    name: string;
  };
  searchParams: {
    favorites: boolean;
    searchTerm?: string;
  };
}
const BoardList = ({
  team,
  searchParams: { favorites, searchTerm },
}: BoardListProps) => {
  // const { data: dashboardInfo } = useUserDashboardInfo();
  // console.log("List Team Component", dashboardInfo);
  const result = useBoards({ teamId: team.id });
  const { data, isLoading: isQueryLoading } = result;

  if (isQueryLoading) {
    return <BoardTable team={team} isQueryLoading={true} boards={[]} />;
  }

  if (!data) {
    return <div>Error</div>;
  }
  const boards = data.boards.nodes;

  if (!boards?.length) {
    if (favorites) {
      return <EmptyFavorites teamName={team.name} />;
    }
    if (searchTerm) {
      return <EmptySearch searchTerm={searchTerm} teamName={team.name} />;
    }
    return <EmptyTeamBoards team={team} />;
  }
  return <BoardTable team={team} boards={data.boards.nodes} />;
};

export default BoardList;
