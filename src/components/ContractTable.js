import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ContractTable() {
  // States
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Form state for manual add
  const [newContract, setNewContract] = useState({
    name: "",
    parties: "",
    expiry: "",
    status: "Active",
    risk: "Low",
  });

  // Fetch initial JSON contracts
  useEffect(() => {
  const savedContracts = JSON.parse(localStorage.getItem("contracts"));
  if (savedContracts && savedContracts.length > 0) {
    setContracts(savedContracts);
    setLoading(false);
  } else {
    fetch("/contracts.json")
      .then((res) => res.json())
      .then((data) => {
        setContracts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }
}, []);


  // Add contract manually
const addContract = (e) => {
  e.preventDefault();
  const contract = { id: Date.now(), ...newContract };
  const updatedContracts = [...contracts, contract];
  setContracts(updatedContracts);
  localStorage.setItem("contracts", JSON.stringify(updatedContracts)); // save to localStorage
  setNewContract({
    name: "",
    parties: "",
    expiry: "",
    status: "Active",
    risk: "Low",
  });
};


  if (loading) return <div>Loading...</div>;
  if (contracts.length === 0) return <div>No contracts yet</div>;

  // Filter contracts
  const filteredContracts = contracts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesRisk = riskFilter === "All" || c.risk === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredContracts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedContracts = filteredContracts.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div>
      {/* Manual Add Form */}
      <form onSubmit={addContract} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Contract Name"
          value={newContract.name}
          onChange={(e) =>
            setNewContract({ ...newContract, name: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Parties"
          value={newContract.parties}
          onChange={(e) =>
            setNewContract({ ...newContract, parties: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          value={newContract.expiry}
          onChange={(e) =>
            setNewContract({ ...newContract, expiry: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <select
          value={newContract.status}
          onChange={(e) =>
            setNewContract({ ...newContract, status: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option>Active</option>
          <option>Expired</option>
          <option>Renewal Due</option>
        </select>
        <select
          value={newContract.risk}
          onChange={(e) =>
            setNewContract({ ...newContract, risk: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Contract
        </button>
      </form>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search contracts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
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
          {paginatedContracts.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">
                <Link
                  to={`/dashboard/contracts/${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {c.name}
                </Link>
              </td>
              <td className="p-2 border">{c.parties}</td>
              <td className="p-2 border">{c.expiry}</td>
              <td className="p-2 border">{c.status}</td>
              <td className="p-2 border">{c.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
