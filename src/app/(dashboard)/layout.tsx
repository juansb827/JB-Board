import React from "react";
import { Sidebar } from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Sidebar />
      <div className="pl-16 h-full flex gap-x-3">
        <OrgSidebar />
        <div className="h-full flex-1">
          <Navbar />
          {children}
        </div>
        {/* <div className="flex gap-x-3 h-full">
        </div> */}
      </div>
    </div>
  );
}

export default DashboardLayout;
