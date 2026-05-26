
import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// 获取所有收支记录
router.get('/', (req, res) => {
  const { companyId } = req.query;
  let transactions = db.transactions;
  if (companyId) {
    transactions = transactions.filter(t => t.companyId === companyId);
  }
  res.json({ success: true, data: transactions });
});

// 获取单个记录
router.get('/:id', (req, res) => {
  const transaction = db.transactions.find(t => t.id === req.params.id);
  if (!transaction) {
    return res.status(404).json({ success: false, error: '记录不存在' });
  }
  res.json({ success: true, data: transaction });
});

// 创建记录
router.post('/', (req, res) => {
  const newTransaction = {
    id: db.generateId(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.transactions.push(newTransaction);
  res.json({ success: true, data: newTransaction });
});

// 更新记录
router.put('/:id', (req, res) => {
  const index = db.transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: '记录不存在' });
  }
  db.transactions[index] = {
    ...db.transactions[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json({ success: true, data: db.transactions[index] });
});

// 删除记录
router.delete('/:id', (req, res) => {
  const index = db.transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: '记录不存在' });
  }
  db.transactions.splice(index, 1);
  res.json({ success: true, message: '记录已删除' });
});

export default router;

