import React, { useEffect, useState } from "react";
import ClauseCard from "../components/ClauseCard";
import InsightList from "../components/InsightList";
import EvidenceDrawer from "../components/EvidenceDrawer";

export default function ContractDetail() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    // Example: contract id = c1
    fetch("/contracts.json")
      .then((res) => res.json())
      .then((data) => {
        const detail = data.find((c) => c.id === "c1"); // Change as needed
        setContract(detail);
        setLoading(false);
      });
  }, []);

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
        {contract.clauses?.map((clause, idx) => (
          <ClauseCard key={idx} clause={clause} />
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
      <InsightList insights={contract.insights || []} />
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