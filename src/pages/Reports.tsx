import { PieChart, BarChart3, TrendingUp } from 'lucide-react';

export default function Reports() {
  const reportTypes = [
    { icon: PieChart, label: '资产负债表', description: '查看企业资产、负债和所有者权益情况' },
    { icon: BarChart3, label: '利润表', description: '查看企业收入、费用和利润情况' },
    { icon: TrendingUp, label: '现金流量表', description: '查看企业现金流入流出情况' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">会计报表</h1>
        <p className="text-gray-600">查看财务报表和分析数据</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="p-3 bg-purple-100 rounded-lg mb-4">
                <Icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
