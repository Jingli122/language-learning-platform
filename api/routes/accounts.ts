
import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// 获取所有科目
router.get('/', (req, res) => {
  const { companyId } = req.query;
  let accounts = db.accounts;
  if (companyId) {
    accounts = accounts.filter(a => a.companyId === companyId);
  }
  res.json({ success: true, data: accounts });
});

// 获取单个科目
router.get('/:id', (req, res) => {
  const account = db.accounts.find(a => a.id === req.params.id);
  if (!account) {
    return res.status(404).json({ success: false, error: '科目不存在' });
  }
  res.json({ success: true, data: account });
});

// 创建科目
router.post('/', (req, res) => {
  const newAccount = {
    id: db.generateId(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.accounts.push(newAccount);
  res.json({ success: true, data: newAccount });
});

export default router;

