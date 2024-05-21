"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";
import { Star, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { TeamDropdown } from "./team-dropdown";
import { useDashboardStore } from "@/features/dashboard/dashboard.store";
import { font } from "@/shared/ui";

const OrgSidebar = () => {
  const { activeTeam, searchParams, setSearchParams } = useDashboardStore();
  // const searchParams = useSearchParams();
  const favorites = searchParams.favorites;

  const TeamMenu = () => (
    <>
      {/* Team Name */}
      <TeamDropdown />
      {/* Others */}
      <div className="flex flex-col gap-y-2">
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size="lg"
          className="font-normal justify-start px-2 gap-x-2"
        >
          <Link href="/" onClick={() => setSearchParams({})}>
            {/* <div className="rounded-lg flex items-center gap-x-2 bg-gray-200 p-2">
            </div> */}
            <LayoutDashboard className="w-4 h-4" />
            <span>Team Boards</span>
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size="lg"
          className="font-normal justify-start px-2 gap-x-2"
        >
          <Link
            onClick={() => setSearchParams({ favorites: true })}
            href={{
              pathname: "/",
              query: {
                favorites: true,
              },
            }}
          >
            {/* <div className="rounded-lg flex items-center gap-x-2 bg-gray-200 p-2">
            </div> */}
            <Star className="w-4 h-4" />
            <span>Favorite Boards</span>
          </Link>
        </Button>
      </div>
    </>
  );

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-52 pl-5 pt-5">
      {/* Header */}
      <Link href={"/"}>
        <div className="flex gap-x-3 items-center">
          <div className="rounded-lg relative w-16 h-16 bg-yellow-300">
            <Image fill alt="logo" src={"/logoipsum-280.svg"} className="p-2" />
          </div>
          <span className={cn("font-semibold text-2xl", font.className)}>
            Boards
          </span>
        </div>
      </Link>
      {activeTeam && <TeamMenu />}
    </div>
  );
};

export default OrgSidebar;
// Opeimport {
//   Cloud,
//   CreditCard,
//   Github,
//   Keyboard,
//   LifeBuoy,
//   LogOut,
//   Mail,
//   MessageSquare,
//   Plus,
//   PlusCircle,
//   Settings,
//   User,
//   UserPlus,
//   Users,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function DropdownMenuDemo() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <User className="mr-2 h-4 w-4" />
//             <span>Profile</span>
//             <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <CreditCard className="mr-2 h-4 w-4" />
//             <span>Billing</span>
//             <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Settings className="mr-2 h-4 w-4" />
//             <span>Settings</span>
//             <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Keyboard className="mr-2 h-4 w-4" />
//             <span>Keyboard shortcuts</span>
//             <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <Users className="mr-2 h-4 w-4" />
//             <span>Team</span>
//           </DropdownMenuItem>
//           <DropdownMenuSub>
//             <DropdownMenuSubTrigger>
//               <UserPlus className="mr-2 h-4 w-4" />
//               <span>Invite users</span>
//             </DropdownMenuSubTrigger>
//             <DropdownMenuPortal>
//               <DropdownMenuSubContent>
//                 <DropdownMenuItem>
//                   <Mail className="mr-2 h-4 w-4" />
//                   <span>Email</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <MessageSquare className="mr-2 h-4 w-4" />
//                   <span>Message</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <PlusCircle className="mr-2 h-4 w-4" />
//                   <span>More...</span>
//                 </DropdownMenuItem>
//               </DropdownMenuSubContent>
//             </DropdownMenuPortal>
//           </DropdownMenuSub>
//           <DropdownMenuItem>
//             <Plus className="mr-2 h-4 w-4" />
//             <span>New Team</span>
//             <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           <Github className="mr-2 h-4 w-4" />
//           <span>GitHub</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem>
//           <LifeBuoy className="mr-2 h-4 w-4" />
//           <span>Support</span>
//         </DropdownMenuItem>
//         <DropdownMenuItem disabled>
//           <Cloud className="mr-2 h-4 w-4" />
//           <span>API</span>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>
//           <LogOut className="mr-2 h-4 w-4" />
//           <span>Log out</span>
//           <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
