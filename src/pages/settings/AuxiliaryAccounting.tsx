import { useState } from 'react';
import { Plus, Search, Edit, Trash2, FolderTree, Building, Users, Briefcase } from 'lucide-react';

interface AuxiliaryItem {
  id: string;
  name: string;
  type: '部门' | '个人' | '供应商' | '客户' | '项目';
  code: string;
  count: number;
}

const mockAuxiliaryData: AuxiliaryItem[] = [
  { id: '1', name: '销售一部', type: '部门', code: 'DEPT001', count: 12 },
  { id: '2', name: '销售二部', type: '部门', code: 'DEPT002', count: 8 },
  { id: '3', name: '财务部', type: '部门', code: 'DEPT003', count: 5 },
  { id: '4', name: '技术部', type: '部门', code: 'DEPT004', count: 15 },
  { id: '5', name: '张三', type: '个人', code: 'PERSON001', count: 0 },
  { id: '6', name: '李四', type: '个人', code: 'PERSON002', count: 0 },
  { id: '7', name: '王五', type: '个人', code: 'PERSON003', count: 0 },
  { id: '8', name: '北京科技有限公司', type: '供应商', code: 'SUP001', count: 0 },
  { id: '9', name: '上海贸易公司', type: '供应商', code: 'SUP002', count: 0 },
  { id: '10', name: '广州实业集团', type: '客户', code: 'CUST001', count: 0 },
  { id: '11', name: '深圳电子科技', type: '客户', code: 'CUST002', count: 0 },
  { id: '12', name: '新产品研发项目', type: '项目', code: 'PROJ001', count: 0 },
  { id: '13', name: '市场推广项目', type: '项目', code: 'PROJ002', count: 0 },
];

export default function AuxiliaryAccounting() {
  const [auxiliaryData] = useState<AuxiliaryItem[]>(mockAuxiliaryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  const filteredData = auxiliaryData.filter(item => {
    const matchesSearch = item.name.includes(searchTerm) || item.code.includes(searchTerm);
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, AuxiliaryItem[]>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '部门': return <FolderTree className="w-5 h-5" />;
      case '个人': return <Users className="w-5 h-5" />;
      case '供应商': return <Building className="w-5 h-5" />;
      case '客户': return <Briefcase className="w-5 h-5" />;
      case '项目': return <FolderTree className="w-5 h-5" />;
      default: return <FolderTree className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '部门': return 'bg-blue-100 text-blue-600';
      case '个人': return 'bg-purple-100 text-purple-600';
      case '供应商': return 'bg-green-100 text-green-600';
      case '客户': return 'bg-orange-100 text-orange-600';
      case '项目': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">辅助核算</h1>
        <p className="text-gray-600">管理辅助核算项目和明细</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索名称或编码..."
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
              <option value="部门">部门</option>
              <option value="个人">个人</option>
              <option value="供应商">供应商</option>
              <option value="客户">客户</option>
              <option value="项目">项目</option>
            </select>

            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              新增核算项目
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(groupedData).map(([type, items]) => (
            <div key={type} className="border border-gray-200 rounded-lg">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
                      {getTypeIcon(type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{type}</h3>
                      <p className="text-xs text-gray-500">{items.length} 个项目</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs text-gray-500 font-mono">{item.code}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {items.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500">暂无数据</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {Object.keys(groupedData).length === 0 && (
          <div className="text-center py-12">
            <FolderTree className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无辅助核算数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
