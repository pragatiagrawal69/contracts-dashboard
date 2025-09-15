import React, { useEffect, useState } from "react";

export default function ContractTable() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

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

  // 🔍 Filter contracts based on search + filters
  const filteredContracts = contracts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesRisk = riskFilter === "All" || c.risk === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search contracts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Renewal Due">Renewal Due</option>
        </select>

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Risk</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}
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
          {filteredContracts.map((c) => (
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
    </div>
  );
}
