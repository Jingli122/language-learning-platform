
import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// 获取所有凭证
router.get('/', (req, res) => {
  const { companyId } = req.query;
  let vouchers = db.vouchers;
  if (companyId) {
    vouchers = vouchers.filter(v => v.companyId === companyId);
  }
  res.json({ success: true, data: vouchers });
});

// 创建凭证
router.post('/', (req, res) => {
  const newVoucher = {
    id: db.generateId(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.vouchers.push(newVoucher);
  res.json({ success: true, data: newVoucher });
});

export default router;

