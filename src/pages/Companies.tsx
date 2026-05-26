
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Company {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  phone: string;
  email: string;
  industry: string;
}

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/companies');
      if (res.success) {
        setCompanies(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="mr-4 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">企业管理</h1>
              <p className="text-gray-600">管理您的企业信息</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-5 w-5 mr-2" />
            添加企业
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 text-center text-gray-500">加载中...</div>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-1">税号：{company.taxNumber}</p>
                <p className="text-sm text-gray-600 mb-1">行业：{company.industry}</p>
                <p className="text-sm text-gray-600">电话：{company.phone}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

