import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractDetail from "./pages/ContractDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contract/:id" element={<ContractDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;