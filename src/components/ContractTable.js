import React, { useEffect, useState } from "react";

export default function ContractTable() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/contracts.json")
      .then((res) => res.json())
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (contracts.length === 0) return <div>No contracts yet</div>;

  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Parties</th>
          <th className="p-2 border">Expiry</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Risk</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((c) => (
          <tr key={c.id}>
            <td className="p-2 border">{c.name}</td>
            <td className="p-2 border">{c.parties}</td>
            <td className="p-2 border">{c.expiry}</td>
            <td className="p-2 border">{c.status}</td>
            <td className="p-2 border">{c.risk}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}