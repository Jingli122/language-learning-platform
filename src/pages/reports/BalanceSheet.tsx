import { Download, Filter, Calendar } from 'lucide-react';

interface BalanceItem {
  category: string;
  name: string;
  currentPeriod: number;
  previousPeriod: number;
}

const assetsData: BalanceItem[] = [
  { category: '流动资产', name: '货币资金', currentPeriod: 520000, previousPeriod: 480000 },
  { category: '流动资产', name: '应收账款', currentPeriod: 320000, previousPeriod: 280000 },
  { category: '流动资产', name: '存货', currentPeriod: 450000, previousPeriod: 420000 },
  { category: '流动资产', name: '其他应收款', currentPeriod: 80000, previousPeriod: 75000 },
  { category: '非流动资产', name: '固定资产', currentPeriod: 1200000, previousPeriod: 1150000 },
  { category: '非流动资产', name: '无形资产', currentPeriod: 180000, previousPeriod: 200000 },
];

const liabilitiesEquityData: BalanceItem[] = [
  { category: '流动负债', name: '短期借款', currentPeriod: 200000, previousPeriod: 180000 },
  { category: '流动负债', name: '应付账款', currentPeriod: 280000, previousPeriod: 250000 },
  { category: '流动负债', name: '应付职工薪酬', currentPeriod: 120000, previousPeriod: 110000 },
  { category: '流动负债', name: '应交税费', currentPeriod: 50000, previousPeriod: 45000 },
  { category: '非流动负债', name: '长期借款', currentPeriod: 500000, previousPeriod: 500000 },
  { category: '所有者权益', name: '实收资本', currentPeriod: 1000000, previousPeriod: 1000000 },
  { category: '所有者权益', name: '资本公积', currentPeriod: 200000, previousPeriod: 200000 },
  { category: '所有者权益', name: '未分配利润', currentPeriod: 400000, previousPeriod: 320000 },
];

export default function BalanceSheet() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">资产负债表</h1>
        <p className="text-gray-600">企业某一特定日期财务状况的报表</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                资产
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">项目</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">期末余额</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">期初余额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {assetsData.map((item, index) => (
                      <tr key={index} className={item.category ? 'bg-gray-50 font-medium' : ''}>
                        <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                        <td className="px-3 py-2 text-sm text-gray-900 text-right">
                          ¥{item.currentPeriod.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 text-right">
                          ¥{item.previousPeriod.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50 font-semibold">
                      <td className="px-3 py-2 text-sm text-gray-900">资产总计</td>
                      <td className="px-3 py-2 text-sm text-orange-600 text-right">
                        ¥2,750,000
                      </td>
                      <td className="px-3 py-2 text-sm text-orange-600 text-right">
                        ¥2,605,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                负债和所有者权益
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">项目</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">期末余额</th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">期初余额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {liabilitiesEquityData.map((item, index) => (
                      <tr key={index} className={item.category ? 'bg-gray-50 font-medium' : ''}>
                        <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                        <td className="px-3 py-2 text-sm text-gray-900 text-right">
                          ¥{item.currentPeriod.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 text-right">
                          ¥{item.previousPeriod.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50 font-semibold">
                      <td className="px-3 py-2 text-sm text-gray-900">负债和所有者权益总计</td>
                      <td className="px-3 py-2 text-sm text-orange-600 text-right">
                        ¥2,750,000
                      </td>
                      <td className="px-3 py-2 text-sm text-orange-600 text-right">
                        ¥2,605,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
