import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, Activity, Plus } from 'lucide-react';
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">工作台</h1>
        <p className="text-gray-600 mt-2">欢迎回来，这是您的财务概览</p>
      </div>

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

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">常用功能</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/transactions')}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">收支记录</span>
          </button>
          <button
            onClick={() => navigate('/vouchers')}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Plus className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-900">凭证管理</span>
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">报表分析</span>
          </button>
          <button
            onClick={() => navigate('/companies')}
            className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <span className="font-medium text-gray-900">企业管理</span>
          </button>
        </div>
      </div>
    </div>
  );
}
