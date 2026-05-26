
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Plus } from 'lucide-react';

export default function Vouchers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="mr-4 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">凭证管理</h1>
              <p className="text-gray-600">管理会计凭证</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-5 w-5 mr-2" />
            添加凭证
          </button>
        </div>

        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">暂无凭证数据</p>
        </div>
      </div>
    </div>
  );
}

