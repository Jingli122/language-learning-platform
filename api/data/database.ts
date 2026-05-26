
import { Company, User, Account, Voucher, VoucherItem, Transaction, Report } from './types.js';

// 内存存储 - 用于演示，实际项目应该用真实数据库
class Database {
  companies: Company[] = [
    {
      id: '1',
      name: '示例科技有限公司',
      taxNumber: '91440101MA12345678',
      address: '广州市天河区天河路385号',
      phone: '020-12345678',
      email: 'contact@example.com',
      industry: '软件和信息技术服务业',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  users: User[] = [
    {
      id: '1',
      username: 'admin',
      password: 'admin123',
      name: '系统管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      role: 'admin',
      companyId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  accounts: Account[] = [
    { id: '1', code: '1001', name: '库存现金', type: 'asset', companyId: '1', balance: 10000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', code: '1002', name: '银行存款', type: 'asset', companyId: '1', balance: 500000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', code: '2001', name: '短期借款', type: 'liability', companyId: '1', balance: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', code: '5001', name: '主营业务收入', type: 'income', companyId: '1', balance: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', code: '6001', name: '管理费用', type: 'expense', companyId: '1', balance: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ];

  vouchers: Voucher[] = [];
  voucherItems: VoucherItem[] = [];
  
  transactions: Transaction[] = [
    {
      id: '1',
      date: new Date().toISOString(),
      type: 'income',
      amount: 10000,
      category: '销售收入',
      description: '软件销售',
      accountId: '2',
      companyId: '1',
      createdBy: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  reports: Report[] = [];

  // 生成唯一ID
  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const db = new Database();

