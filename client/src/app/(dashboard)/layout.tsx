import React from "react";
import { Sidebar } from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";
import { getQueryClient } from "@/core/query";
import { userDashboardQuery } from "@/features/user/user.queries";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(userDashboardQuery());

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-full">
        <Sidebar />
        <div className="pl-16 h-full flex gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1 flex flex-col px-5 pt-5 gap-y-5">
            <Navbar />
            <div className="flex-1">{children}</div>
          </div>
          {/* <div className="flex gap-x-3 h-full">
        </div> */}
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default DashboardLayout;
