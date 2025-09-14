import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full flex flex-col">
      <div className="p-6 font-bold text-xl border-b">Contracts App</div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4"><Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Contracts</Link></li>
          <li className="mb-4"><Link to="/insights" className="text-gray-700 hover:text-blue-500">Insights</Link></li>
          <li className="mb-4"><Link to="/reports" className="text-gray-700 hover:text-blue-500">Reports</Link></li>
          <li><Link to="/settings" className="text-gray-700 hover:text-blue-500">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
}