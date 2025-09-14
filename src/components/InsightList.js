import React from "react";

export default function InsightList({ insights }) {
  return (
    <ul>
      {insights.map((ins, idx) => (
        <li key={idx} className="mb-2 p-2 bg-gray-100 rounded">
          <span className={`font-bold mr-2 ${ins.risk === "High" ? "text-red-500" : ins.risk === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
            {ins.risk}
          </span>
          {ins.message}
        </li>
      ))}
    </ul>
  );
}