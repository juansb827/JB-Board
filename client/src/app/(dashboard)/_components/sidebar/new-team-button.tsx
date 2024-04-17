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
const NewTeam = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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

export default NewTeam;
