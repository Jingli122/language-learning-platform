import { useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

interface Account {
  id: string;
  code: string;
  name: string;
  type: '资产' | '负债' | '权益' | '成本' | '损益';
  balance: '借' | '贷';
  hasChildren: boolean;
  children?: Account[];
}

const mockAccounts: Account[] = [
  {
    id: '1',
    code: '1001',
    name: '库存现金',
    type: '资产',
    balance: '借',
    hasChildren: false,
  },
  {
    id: '2',
    code: '1002',
    name: '银行存款',
    type: '资产',
    balance: '借',
    hasChildren: true,
    children: [
      { id: '2-1', code: '100201', name: '工商银行', type: '资产', balance: '借', hasChildren: false },
      { id: '2-2', code: '100202', name: '建设银行', type: '资产', balance: '借', hasChildren: false },
    ],
  },
  {
    id: '3',
    code: '1122',
    name: '应收账款',
    type: '资产',
    balance: '借',
    hasChildren: false,
  },
  {
    id: '4',
    code: '2001',
    name: '短期借款',
    type: '负债',
    balance: '贷',
    hasChildren: false,
  },
  {
    id: '5',
    code: '2201',
    name: '应付票据',
    type: '负债',
    balance: '贷',
    hasChildren: false,
  },
  {
    id: '6',
    code: '4001',
    name: '实收资本',
    type: '权益',
    balance: '贷',
    hasChildren: false,
  },
  {
    id: '7',
    code: '5001',
    name: '生产成本',
    type: '成本',
    balance: '借',
    hasChildren: false,
  },
  {
    id: '8',
    code: '6001',
    name: '主营业务收入',
    type: '损益',
    balance: '贷',
    hasChildren: false,
  },
  {
    id: '9',
    code: '6401',
    name: '主营业务成本',
    type: '损益',
    balance: '借',
    hasChildren: false,
  },
];

export default function AccountSettings() {
  const [accounts] = useState<Account[]>(mockAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>(['2']);
  const [selectedType, setSelectedType] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.name.includes(searchTerm) || acc.code.includes(searchTerm);
    const matchesType = !selectedType || acc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case '资产': return 'bg-blue-100 text-blue-800';
      case '负债': return 'bg-red-100 text-red-800';
      case '权益': return 'bg-purple-100 text-purple-800';
      case '成本': return 'bg-yellow-100 text-yellow-800';
      case '损益': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAccount = (account: Account, level: number = 0) => {
    const isExpanded = expandedIds.includes(account.id);

    return (
      <>
        <tr key={account.id} className="hover:bg-gray-50">
          <td className="px-4 py-3">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {account.hasChildren && (
                <button
                  onClick={() => toggleExpand(account.id)}
                  className="mr-2 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
              {!account.hasChildren && <div className="w-6" />}
              <span className="text-sm font-mono text-gray-900">{account.code}</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="text-sm text-gray-900">{account.name}</span>
          </td>
          <td className="px-4 py-3">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(account.type)}`}>
              {account.type}
            </span>
          </td>
          <td className="px-4 py-3">
            <span className={`text-sm font-medium ${account.balance === '借' ? 'text-blue-600' : 'text-red-600'}`}>
              {account.balance === '借' ? '借方' : '贷方'}
            </span>
          </td>
          <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-2">
              <button className="text-blue-600 hover:text-blue-900">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        {account.hasChildren && isExpanded && account.children && (
          account.children.map(child => renderAccount(child, level + 1))
        )}
      </>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">科目设置</h1>
        <p className="text-gray-600">管理会计科目体系</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索科目编码或名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">全部类型</option>
                <option value="资产">资产</option>
                <option value="负债">负债</option>
                <option value="权益">权益</option>
                <option value="成本">成本</option>
                <option value="损益">损益</option>
              </select>

              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                新增科目
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">科目编码</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">科目名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">余额方向</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAccounts.map(account => renderAccount(account))}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无科目数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
