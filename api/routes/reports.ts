
import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// 获取报表数据
router.get('/overview', (req, res) => {
  const { companyId } = req.query;
  
  // 计算统计数据
  const income = db.transactions
    .filter(t => t.companyId === companyId && t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expense = db.transactions
    .filter(t => t.companyId === companyId && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = income - expense;
  
  res.json({
    success: true,
    data: {
      income,
      expense,
      profit,
      transactions: db.transactions.filter(t => t.companyId === companyId).length,
      accounts: db.accounts.filter(a => a.companyId === companyId).length
    }
  });
});

export default router;

