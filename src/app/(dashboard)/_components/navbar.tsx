"use client";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex align-center gap-x-4 p-5 bg-green-500">
      <div className="hidden lg:flex lg:flex-1 bg-yellow-500">Search</div>
      <div>UserBtn</div>
    </div>
  );
};
