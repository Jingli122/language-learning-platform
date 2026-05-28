import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, User, Phone, Mail, Building2 } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  status: '在职' | '离职';
  joinDate: string;
}

const mockEmployees: Employee[] = [
  { id: '1', name: '张涛', department: '财务部', position: '财务经理', phone: '13800138001', email: 'zhangtao@example.com', status: '在职', joinDate: '2021-03-15' },
  { id: '2', name: '李明', department: '财务部', position: '会计', phone: '13800138002', email: 'liming@example.com', status: '在职', joinDate: '2022-01-10' },
  { id: '3', name: '王芳', department: '财务部', position: '出纳', phone: '13800138003', email: 'wangfang@example.com', status: '在职', joinDate: '2022-06-20' },
  { id: '4', name: '赵强', department: '销售部', position: '销售经理', phone: '13800138004', email: 'zhaoqiang@example.com', status: '在职', joinDate: '2020-08-05' },
  { id: '5', name: '陈静', department: '人事部', position: '人事专员', phone: '13800138005', email: 'chenjing@example.com', status: '离职', joinDate: '2019-11-12' },
];

export default function Zhangtao() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.includes(searchTerm) || 
    emp.department.includes(searchTerm) ||
    emp.position.includes(searchTerm)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">张涛管理</h1>
        <p className="text-gray-600">员工信息管理</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索员工姓名、部门、职位..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              筛选
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              新增员工
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  employee.status === '在职' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {employee.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="text-sm text-gray-500 pt-2 border-t border-gray-100">
                  入职日期：{employee.joinDate}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1">
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

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无员工数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
