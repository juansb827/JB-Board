"use client";
import React from "react";
import { Search, Plus, Settings, LogOut, CircleUserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserImage = () => {
  return (
    <div className="w-10 h-10 relative ">
      <Image
        src="/user-profile-picture.jpeg"
        fill
        alt="user profile image"
        className="rounded-full"
      />
    </div>
  );
};

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <UserImage />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-8"
        align="end"
        alignOffset={20}
        side="bottom"
        sideOffset={20}
      >
        <div className="flex gap-x-3 items-center">
          <UserImage />
          <div className="flex flex-col flex-1">
            <span className="font-semibold">User Name</span>
            <span>useremail@sample.com</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CircleUserRound className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  return (
    <div className="flex align-center gap-x-4 p-5">
      <div className="group hidden lg:flex lg:w-96 bg-background items-center pl-8 gap-x-3 rounded-sm border border-gray-300 ">
        <Search className="group-hover:text-blue-500 transition duration-300" />
        <Input
          placeholder="Search boards"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
        />
      </div>
      <div className="flex-1"></div>
      <div className="flex w-48 bg-background items-center gap-x-3 rounded-sm border border-blue-500 justify-center hover:bg-gray-50 transition duration-300">
        <Plus className="text-blue-500" />
        <span className="text-blue-500">Invite Members</span>
      </div>
      <UserDropdown />
    </div>
  );
};
