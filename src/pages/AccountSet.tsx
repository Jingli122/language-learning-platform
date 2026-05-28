import { useState } from 'react';
import { Plus, Search, Database, Edit, Trash2, Eye, Calendar, FileText } from 'lucide-react';

interface AccountSet {
  id: string;
  name: string;
  companyName: string;
  accountingPeriod: string;
  currency: string;
  status: '启用' | '停用';
  voucherCount: number;
  createDate: string;
}

const mockAccountSets: AccountSet[] = [
  { 
    id: '1', 
    name: '主账套', 
    companyName: '示例科技有限公司', 
    accountingPeriod: '2024年1月-12月',
    currency: '人民币',
    status: '启用', 
    voucherCount: 156,
    createDate: '2024-01-01' 
  },
  { 
    id: '2', 
    name: '子账套A', 
    companyName: '分公司A', 
    accountingPeriod: '2024年1月-12月',
    currency: '人民币',
    status: '启用', 
    voucherCount: 89,
    createDate: '2024-03-15' 
  },
  { 
    id: '3', 
    name: '测试账套', 
    companyName: '测试公司', 
    accountingPeriod: '2024年1月-6月',
    currency: '人民币',
    status: '停用', 
    voucherCount: 45,
    createDate: '2024-01-01' 
  },
];

export default function AccountSet() {
  const [accountSets] = useState<AccountSet[]>(mockAccountSets);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccountSets = accountSets.filter(set => 
    set.name.includes(searchTerm) || 
    set.companyName.includes(searchTerm)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">账套管理</h1>
        <p className="text-gray-600">管理企业账套信息</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索账套名称或公司名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            新建账套
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccountSets.map((accountSet) => (
            <div key={accountSet.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{accountSet.name}</h3>
                    <p className="text-sm text-gray-500">{accountSet.companyName}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  accountSet.status === '启用' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {accountSet.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>会计期间：{accountSet.accountingPeriod}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-gray-400">币种：</span>
                  <span>{accountSet.currency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>凭证数量：{accountSet.voucherCount} 张</span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4 pt-3 border-t border-gray-100">
                创建日期：{accountSet.createDate}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  查看
                </button>
                <button className="flex-1 px-3 py-2 text-sm text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50 flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" />
                  编辑
                </button>
                <button className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1">
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAccountSets.length === 0 && (
          <div className="text-center py-12">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无账套数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
