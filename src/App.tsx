import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Workbench from '@/pages/Workbench';
import Vouchers from '@/pages/Vouchers';
import BalanceSheet from '@/pages/reports/BalanceSheet';
import CashFlow from '@/pages/reports/CashFlow';
import Profit from '@/pages/reports/Profit';
import Zhangtao from '@/pages/Zhangtao';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Workbench />} />
              <Route path="/vouchers" element={<Vouchers />} />
              <Route path="/reports/balance" element={<BalanceSheet />} />
              <Route path="/reports/cashflow" element={<CashFlow />} />
              <Route path="/reports/profit" element={<Profit />} />
              <Route path="/zhangtao" element={<Zhangtao />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
