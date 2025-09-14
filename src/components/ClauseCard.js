import React from "react";

export default function ClauseCard({ clause }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="font-bold">{clause.title}</div>
      <div className="text-gray-700">{clause.summary}</div>
      <div className="text-sm text-gray-500">Confidence: {Math.round(clause.confidence * 100)}%</div>
    </div>
  );
}