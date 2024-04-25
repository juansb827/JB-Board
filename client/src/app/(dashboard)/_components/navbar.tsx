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
import SearchInput from "./search-input";
import { TeamDropdown } from "./team-dropdown";
import InviteMember from "./invite-member-button";
import { useUserDashboardInfo } from "@/features/user/user.queries";
import { UserDashboardQuery } from "@generated/graphql/graphql";

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

const UserDropdown = ({ user }: { user: UserDashboardQuery["user"] }) => {
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
            <span className="font-semibold">{user?.name}</span>
            <span>{user?.email}</span>
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
  const { data, error, isFetching } = useUserDashboardInfo();
  return (
    <div className="flex align-center gap-4 flex-wrap ">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="flex-1 lg:hidden">
        <TeamDropdown />
      </div>
      <InviteMember />
      {data && <UserDropdown user={data.user} />}
    </div>
  );
};
