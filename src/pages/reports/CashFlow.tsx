import { Download, Filter, Calendar } from 'lucide-react';

interface CashFlowItem {
  category: string;
  name: string;
  amount: number;
}

const cashFlowData: CashFlowItem[] = [
  { category: '经营活动', name: '销售商品、提供劳务收到的现金', amount: 850000 },
  { category: '经营活动', name: '收到的税费返还', amount: 45000 },
  { category: '经营活动', name: '收到其他与经营活动有关的现金', amount: 25000 },
  { category: '经营活动', name: '购买商品、接受劳务支付的现金', amount: -520000 },
  { category: '经营活动', name: '支付给职工以及为职工支付的现金', amount: -180000 },
  { category: '经营活动', name: '支付的各项税费', amount: -65000 },
  { category: '投资活动', name: '收回投资收到的现金', amount: 150000 },
  { category: '投资活动', name: '取得投资收益收到的现金', amount: 35000 },
  { category: '投资活动', name: '处置固定资产、无形资产收回的现金净额', amount: 0 },
  { category: '投资活动', name: '购建固定资产、无形资产支付的现金', amount: -120000 },
  { category: '投资活动', name: '投资支付的现金', amount: -80000 },
  { category: '筹资活动', name: '吸收投资收到的现金', amount: 200000 },
  { category: '筹资活动', name: '取得借款收到的现金', amount: 150000 },
  { category: '筹资活动', name: '偿还债务支付的现金', amount: -100000 },
  { category: '筹资活动', name: '分配股利、利润或偿付利息支付的现金', amount: -45000 },
];

export default function CashFlow() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">现金流量表</h1>
        <p className="text-gray-600">企业现金和现金等价物流入和流出的报表</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">统计期间：</span>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>2024年5月</option>
                  <option>2024年4月</option>
                  <option>2024年3月</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                筛选
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              <Download className="w-5 h-5" />
              导出报表
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">项目</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cashFlowData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                    <td className={`px-4 py-3 text-sm text-right font-medium ${
                      item.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.amount >= 0 ? '+' : ''}¥{Math.abs(item.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900">现金及现金等价物净增加额</td>
                  <td className="px-4 py-3 text-sm text-right text-orange-600">
                    +¥520,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
