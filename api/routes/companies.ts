
import express from 'express';
import { db } from '../data/database.js';

const router = express.Router();

// 获取所有企业
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: db.companies
  });
});

// 获取单个企业
router.get('/:id', (req, res) => {
  const company = db.companies.find(c => c.id === req.params.id);
  if (!company) {
    return res.status(404).json({ success: false, error: '企业不存在' });
  }
  res.json({ success: true, data: company });
});

// 创建企业
router.post('/', (req, res) => {
  const newCompany = {
    id: db.generateId(),
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.companies.push(newCompany);
  res.json({ success: true, data: newCompany });
});

// 更新企业
router.put('/:id', (req, res) => {
  const index = db.companies.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: '企业不存在' });
  }
  db.companies[index] = {
    ...db.companies[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json({ success: true, data: db.companies[index] });
});

// 删除企业
router.delete('/:id', (req, res) => {
  const index = db.companies.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: '企业不存在' });
  }
  db.companies.splice(index, 1);
  res.json({ success: true, message: '企业已删除' });
});

export default router;

