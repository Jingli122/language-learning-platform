import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Voucher {
  id: string;
  number: string;
  date: string;
  type: '收款' | '付款' | '转账' | '记账';
  summary: string;
  debitAmount: number;
  creditAmount: number;
  creator: string;
  status: '已审核' | '未审核';
}

const mockVouchers: Voucher[] = [
  {
    id: '1',
    number: '记-2024-05-0001',
    date: '2024-05-28',
    type: '收款',
    summary: '收到客户货款',
    debitAmount: 50000,
    creditAmount: 50000,
    creator: '张会计',
    status: '已审核',
  },
  {
    id: '2',
    number: '记-2024-05-0002',
    date: '2024-05-27',
    type: '付款',
    summary: '支付供应商货款',
    debitAmount: 30000,
    creditAmount: 30000,
    creator: '李会计',
    status: '已审核',
  },
  {
    id: '3',
    number: '记-2024-05-0003',
    date: '2024-05-26',
    type: '转账',
    summary: '银行间资金划转',
    debitAmount: 100000,
    creditAmount: 100000,
    creator: '张会计',
    status: '未审核',
  },
  {
    id: '4',
    number: '记-2024-05-0004',
    date: '2024-05-25',
    type: '记账',
    summary: '计提本月折旧',
    debitAmount: 5000,
    creditAmount: 5000,
    creator: '王会计',
    status: '已审核',
  },
  {
    id: '5',
    number: '记-2024-05-0005',
    date: '2024-05-24',
    type: '收款',
    summary: '收到应收账款',
    debitAmount: 25000,
    creditAmount: 25000,
    creator: '张会计',
    status: '已审核',
  },
];

export default function Vouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch = 
      voucher.summary.includes(searchTerm) || 
      voucher.number.includes(searchTerm);
    const matchesType = !selectedType || voucher.type === selectedType;
    const matchesStatus = !selectedStatus || voucher.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">凭证列表</h1>
        <p className="text-gray-600">管理和查看所有会计凭证</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索凭证号或摘要..."
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
              <option value="收款">收款</option>
              <option value="付款">付款</option>
              <option value="转账">转账</option>
              <option value="记账">记账</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">全部状态</option>
              <option value="已审核">已审核</option>
              <option value="未审核">未审核</option>
            </select>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              更多筛选
            </button>

            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              新增凭证
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  凭证号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  摘要
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  借方金额
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  贷方金额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  制单人
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{voucher.number}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{voucher.date}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      voucher.type === '收款' ? 'bg-green-100 text-green-800' :
                      voucher.type === '付款' ? 'bg-red-100 text-red-800' :
                      voucher.type === '转账' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {voucher.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900">{voucher.summary}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ¥{voucher.debitAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ¥{voucher.creditAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{voucher.creator}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      voucher.status === '已审核' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {voucher.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVouchers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">暂无凭证数据</div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            共 {filteredVouchers.length} 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-orange-500 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
