import React, { useState } from "react";

export default function UploadModal({ open, onClose }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    selectedFiles.forEach((file) => {
      setStatus((prev) => ({ ...prev, [file.name]: "Uploading" }));
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          [file.name]: Math.random() > 0.2 ? "Success" : "Error",
        }));
      }, 1500);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload Files</h2>
        <input
          type="file"
          multiple
          className="mb-4"
          onChange={handleFiles}
        />
        <ul>
          {files.map((file) => (
            <li key={file.name} className="mb-2 flex justify-between items-center">
              <span>{file.name}</span>
              <span
                className={
                  status[file.name] === "Success"
                    ? "text-green-500"
                    : status[file.name] === "Error"
                    ? "text-red-500"
                    : "text-yellow-500"
                }
              >
                {status[file.name]}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}