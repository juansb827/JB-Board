import React from "react";
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
const InviteMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-48 bg-background items-center gap-x-3 rounded-sm border border-blue-500 justify-center hover:bg-gray-50 transition duration-300">
          <Plus className="text-blue-500" />
          <span className="text-blue-500">Invite Members</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>Name of your new team</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
                Name
              </Label> */}
            <Input id="name" placeholder="Enter team Name" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start gap-y-4 sm:gap-x-2 ">
          <Button type="submit">Create</Button>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMember;
