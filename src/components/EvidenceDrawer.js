import React from "react";

export default function EvidenceDrawer({ open, onClose, evidence }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="bg-white w-80 h-full p-6 shadow-lg">
        <button className="mb-4 text-red-500" onClick={onClose}>Close</button>
        <h3 className="text-lg font-bold mb-2">Evidence</h3>
        <ul>
          {evidence.map((ev, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{ev.source}</div>
              <div className="text-gray-700">{ev.snippet}</div>
              <div className="text-sm text-gray-500">Relevance: {Math.round(ev.relevance * 100)}%</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}