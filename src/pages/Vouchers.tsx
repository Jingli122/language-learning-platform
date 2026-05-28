import { Plus, FileText } from 'lucide-react';

export default function Vouchers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">凭证管理</h1>
          <p className="text-gray-600">管理会计凭证</p>
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
  );
}
