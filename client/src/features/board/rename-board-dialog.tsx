import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRenameBoard } from "./board.queries";
import { BoardsQuery } from "@generated/graphql/graphql";

export const RenameBoardDialog = ({
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
