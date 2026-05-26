import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Plus, Activity, FileText, Settings } from 'lucide-react';
import { api } from '@/lib/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
    profit: 0,
    transactions: 0,
    accounts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/reports/overview?companyId=1');
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: Activity, label: '收支记录', path: '/transactions', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: FileText, label: '凭证管理', path: '/vouchers', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: PieChart, label: '报表分析', path: '/reports', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Settings, label: '企业管理', path: '/companies', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">财务管理系统</h1>
          <p className="text-gray-600 mt-2">欢迎回来，这是您的财务概览</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总收入</p>
                <p className="text-2xl font-bold text-green-600">
                  ¥{stats.income.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总支出</p>
                <p className="text-2xl font-bold text-red-600">
                  ¥{stats.expense.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">净利润</p>
                <p className={`text-2xl font-bold ${stats.profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ¥{stats.profit.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">交易数量</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.transactions}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 快捷菜单 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 ${item.bg} rounded-lg mr-4`}>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 快速添加按钮 */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/transactions/new')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加收支记录
          </button>
        </div>
      </div>
    </div>
  );
}
