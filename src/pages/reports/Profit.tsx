import { Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface ProfitItem {
  name: string;
  currentPeriod: number;
  previousPeriod: number;
  isTotal?: boolean;
}

const profitData: ProfitItem[] = [
  { name: '一、营业收入', currentPeriod: 1250000, previousPeriod: 1100000 },
  { name: '减：营业成本', currentPeriod: 680000, previousPeriod: 600000 },
  { name: '税金及附加', currentPeriod: 45000, previousPeriod: 40000 },
  { name: '销售费用', currentPeriod: 120000, previousPeriod: 105000 },
  { name: '管理费用', currentPeriod: 180000, previousPeriod: 160000 },
  { name: '财务费用', currentPeriod: 35000, previousPeriod: 30000 },
  { name: '二、营业利润', currentPeriod: 190000, previousPeriod: 165000, isTotal: true },
  { name: '加：营业外收入', currentPeriod: 25000, previousPeriod: 20000 },
  { name: '减：营业外支出', currentPeriod: 15000, previousPeriod: 12000 },
  { name: '三、利润总额', currentPeriod: 200000, previousPeriod: 173000, isTotal: true },
  { name: '减：所得税费用', currentPeriod: 50000, previousPeriod: 43250 },
  { name: '四、净利润', currentPeriod: 150000, previousPeriod: 129750, isTotal: true },
];

export default function Profit() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">利润表</h1>
        <p className="text-gray-600">企业在一定会计期间经营成果的报表</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月营业收入</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">¥1,250,000</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+13.6%</span>
            <span className="text-gray-400 ml-2">较上月</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月利润总额</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">¥200,000</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+15.6%</span>
            <span className="text-gray-400 ml-2">较上月</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月净利润</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">¥150,000</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+15.6%</span>
            <span className="text-gray-400 ml-2">较上月</span>
          </div>
        </div>
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
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">本期金额</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">上期金额</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">变动</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {profitData.map((item, index) => {
                  const change = item.currentPeriod - item.previousPeriod;
                  const changePercent = item.previousPeriod !== 0 
                    ? ((change / item.previousPeriod) * 100).toFixed(1)
                    : '0.0';
                  
                  return (
                    <tr key={index} className={item.isTotal ? 'bg-orange-50 font-semibold' : ''}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ¥{item.currentPeriod.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-right">
                        ¥{item.previousPeriod.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${
                        change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {change >= 0 ? '+' : ''}{changePercent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
