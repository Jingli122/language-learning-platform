import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Transactions from "@/pages/Transactions";
import Companies from "@/pages/Companies";
import Vouchers from "@/pages/Vouchers";
import Reports from "@/pages/Reports";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<Transactions />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}
