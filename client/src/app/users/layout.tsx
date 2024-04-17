import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xs p-1 bg-red-500 text-white">Header</div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
