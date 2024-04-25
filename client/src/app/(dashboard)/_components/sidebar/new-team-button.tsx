"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Maybe } from "@generated/graphql/graphql";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCreateTeam } from "@/features/team/team.queries";
const NewTeam = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [teamName, setTeamName] = useState<Maybe<string>>(null);

  const mutation = useCreateTeam();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({ name: teamName! });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>Name of your new team</DialogDescription>
        </DialogHeader>
        <form
          id="create-team-form"
          className="grid gap-4 py-4"
          onSubmit={handleCreate}
        >
          <div className="grid grid-cols-1 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
                Name
              </Label> */}
            <Input
              id="name"
              placeholder="Enter team Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter className="sm:justify-start gap-y-4 sm:gap-x-2 ">
          <Button
            type="submit"
            form="create-team-form"
            disabled={mutation.isPending}
          >
            Create
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

export default NewTeam;
