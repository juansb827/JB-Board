import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
export const TeamDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-lg flex cursor-pointer items-center border gap-x-2 hover:border-gray-500 max-w-64">
          <div className="rounded-lg relative w-12 h-12 bg-gray-100 ">
            <Image fill alt="logo" src={"/logoipsum-247.svg"} className="p-2" />
          </div>
          <span>Team Name</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Team</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Leave Team</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
