import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ContractTable from "../components/ContractTable";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 overflow-auto">
          <ContractTable />
        </main>
      </div>
    </div>
  );
}