import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClauseCard from "../components/ClauseCard";
import InsightList from "../components/InsightList";
import EvidenceDrawer from "../components/EvidenceDrawer";

export default function ContractDetail() {
  const { id } = useParams(); 
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // 1️⃣ JSON fetch
        const res = await fetch("/contracts.json");
        const data = await res.json();

        // 2️⃣ localStorage me saved contracts check
        const savedContracts = JSON.parse(localStorage.getItem("contracts")) || [];

        // 3️⃣ JSON + localStorage merge
        const allContracts = [...data, ...savedContracts];

        // 4️⃣ ID ke basis pe contract find karo
        const detail = allContracts.find((c) => c.id.toString() === id.toString());
        setContract(detail);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contract:", err);
        setLoading(false);
      }
    };

    fetchContracts();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!contract) return <div>Error: Contract not found</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{contract.name}</h2>
      <div className="mb-4 text-gray-700">
        <div>Parties: {contract.parties}</div>
        <div>Status: {contract.status}</div>
        <div>Expiry: {contract.expiry}</div>
        <div>Risk: {contract.risk}</div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Clauses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {contract.clauses && contract.clauses.length > 0 ? (
          contract.clauses.map((clause, idx) => <ClauseCard key={idx} clause={clause} />)
        ) : (
          <div>No clauses available</div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
      {contract.insights && contract.insights.length > 0 ? (
        <InsightList insights={contract.insights} />
      ) : (
        <div>No insights available</div>
      )}

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowEvidence(true)}
      >
        Show Evidence
      </button>
      <EvidenceDrawer
        open={showEvidence}
        onClose={() => setShowEvidence(false)}
        evidence={contract.evidence || []}
      />
    </div>
  );
}
