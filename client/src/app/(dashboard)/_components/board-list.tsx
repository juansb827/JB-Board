"use client";
import React, { MouseEventHandler, forwardRef, useState } from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyTeamBoards from "./empty-team-boards";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import {
  useBoards,
  useCreateBoard,
  useDeleteBoard,
  useRenameBoard,
  useUpdateBoardIsFavorite,
} from "@/features/board/board.queries";
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
import { BoardsDocument, BoardsQuery, Maybe } from "@generated/graphql/graphql";
import { formatDistanceToNow } from "date-fns";
import { junit } from "node:test/reporters";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// TODO: move to components
const ConfirmationAlertDialog = ({
  title,
  description,
  open,
  setOpen,
  onConfirm,
}: {
  /**
   * Do not use `<p>`
   */
  description?: React.ReactNode;
  title?: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
  onConfirm: () => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Confirm"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "Are you sure?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const RenameDialog = ({
  board,
  team,
  open,
  setOpen,
}: {
  // children: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
  board: BoardsQuery["boards"]["nodes"][number];
  team: {
    id: string;
  };
  // onConfirm: () => void;
}) => {
  const [name, setName] = useState<string | undefined>(board.title);
  const mutation = useRenameBoard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({
      id: board.id,
      teamId: team.id,
      name: name!,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
        </DialogHeader>
        <form
          id="create-team-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 items-center gap-4">
            <h3 className="text-muted-foreground text-sm">
              Enter a new board name
            </h3>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter className="sm:justify-start gap-y-4 sm:gap-x-2 ">
          <Button
            type="submit"
            form="create-team-form"
            disabled={mutation.isPending}
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const BoardDropdown = ({
  board,
  team,
}: {
  board: BoardsQuery["boards"]["nodes"][number];
  team: {
    id: string;
  };
}) => {
  const { mutate: deleteBoard } = useDeleteBoard();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);

  const handleDeleteConfirmed = () => {
    deleteBoard({ id: board.id, teamId: team.id });
  };

  return (
    <>
      <ConfirmationAlertDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onConfirm={handleDeleteConfirmed}
        title="Delete Board?"
        description={
          <span>
            You are about to delete{" "}
            <b className="text-primary">{board.title}</b>
          </span>
        }
      />
      <RenameDialog
        board={board}
        team={team}
        open={openRenameDialog}
        setOpen={setOpenRenameDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <Ellipsis className="text-gray-400 hover:text-black transition" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setOpenRenameDialog(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
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
  team,
}: {
  board: BoardsQuery["boards"]["nodes"][number];
  team: {
    id: string;
  };
}) => {
  const { data } = useUserDashboardInfo();
  const currentUserId = data?.user.id;
  const author = board.author.name;
  const lastEditor =
    board.author.id === currentUserId ? "You" : board.author.name;
  const lastUpdateAt = formatDistanceToNow(board.updatedAt, {
    addSuffix: true,
  });

  const { mutate, isPending } = useUpdateBoardIsFavorite();
  const handleToggleFavorite = () => {
    mutate({
      isFavorite: !board.isFavorite,
      id: board.id,
      teamId: team.id,
    });
  };

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
        <Button
          disabled={isPending}
          variant="ghost"
          className="hover:bg-transparent"
          onClick={handleToggleFavorite}
        >
          <Star
            // fill="rgb(30 64 175)"
            // className="text-gray-500 hover:text-blue-800 "
            className={cn([
              "text-gray-300 hover:text-blue-800 transition",
              (board as any).isFavorite && "text-blue-800 fill-blue-800",
            ])}
          />
        </Button>
      </TableCell>
      <TableCell>
        <BoardDropdown board={board} team={team} />
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
            <Button variant="ghost" disabled={isAnyLoading}>
              <span
                onClick={handleCreate}
                className={cn(
                  "group-hover:text-blue-800 transition cursor-pointer"
                )}
              >
                New Board
              </span>
            </Button>
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
              <BoardTableRow board={board} team={team} key={board.id} />
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
    favorites?: boolean;
    searchTerm?: string;
  };
}
const BoardList = ({
  team,
  searchParams: { favorites, searchTerm },
}: BoardListProps) => {
  // const { data: dashboardInfo } = useUserDashboardInfo();
  // console.log("List Team Component", dashboardInfo);
  const result = useBoards({
    teamId: team.id,
    search: searchTerm,
    isFavorite: favorites,
  });

  const { data: boards, isLoading: isQueryLoading, isFetching } = result;

  if (isQueryLoading) {
    return <BoardTable team={team} isQueryLoading={true} boards={[]} />;
  }

  if (!boards) {
    return <div></div>;
  }

  if (!boards?.length) {
    if (favorites) {
      return <EmptyFavorites teamName={team.name} />;
    }
    if (searchTerm) {
      return <EmptySearch searchTerm={searchTerm} teamName={team.name} />;
    }
    return <EmptyTeamBoards team={team} />;
  }
  return <BoardTable team={team} boards={boards} />;
};

export default BoardList;
