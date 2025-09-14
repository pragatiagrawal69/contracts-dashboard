import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white shadow flex justify-end items-center p-4">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">User</span>
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}