
// 数据库类型定义 - 财务软件

// 企业信息
export interface Company {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  phone: string;
  email: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}

// 用户信息
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'accountant' | 'viewer';
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

// 会计科目
export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parentId?: string;
  companyId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// 记账凭证
export interface Voucher {
  id: string;
  voucherNumber: string;
  date: string;
  summary: string;
  companyId: string;
  createdBy: string;
  status: 'draft' | 'posted' | 'audited';
  createdAt: string;
  updatedAt: string;
}

// 凭证明细
export interface VoucherItem {
  id: string;
  voucherId: string;
  accountId: string;
  debit: number;
  credit: number;
  summary: string;
  createdAt: string;
}

// 收支记录
export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  accountId: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// 财务报表
export interface Report {
  id: string;
  name: string;
  type: 'balance' | 'income' | 'cashflow' | 'custom';
  companyId: string;
  periodStart: string;
  periodEnd: string;
  data: Record&lt;string, any&gt;;
  createdAt: string;
  updatedAt: string;
}

