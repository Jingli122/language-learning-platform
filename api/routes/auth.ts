
import { Router, Request, Response } from 'express'
import { storage } from '../data/storage'
import crypto from 'crypto'

const router = Router()

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body
    
    if (!email || !password || !username) {
      res.status(400).json({ success: false, message: '缺少必填字段' })
      return
    }
    
    const existingUser = storage.getUserByEmail(email)
    if (existingUser) {
      res.status(400).json({ success: false, message: '用户已存在' })
      return
    }
    
    const userId = generateId()
    const user = {
      id: userId,
      email,
      password: crypto.createHash('md5').update(password).digest('hex'),
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      targetLanguage: 'english',
      createdAt: new Date().toISOString()
    }
    
    storage.createUser(user)
    
    const progress = {
      id: generateId(),
      userId,
      totalHours: 0,
      streakDays: 0,
      coursesCompleted: 0,
      exercisesCompleted: 0,
      courseProgress: [],
      learningHistory: []
    }
    storage.createUserProgress(progress)
    
    const token = crypto.randomBytes(32).toString('hex')
    const userResponse = { ...user }
    delete (userResponse as any).password
    
    res.json({ success: true, user: userResponse, token })
  } catch (error) {
    res.status(500).json({ success: false, message: '注册失败' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      res.status(400).json({ success: false, message: '缺少必填字段' })
      return
    }
    
    const user = storage.getUserByEmail(email)
    if (!user) {
      res.status(401).json({ success: false, message: '用户不存在' })
      return
    }
    
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex')
    if (user.password !== hashedPassword) {
      res.status(401).json({ success: false, message: '密码错误' })
      return
    }
    
    const token = crypto.randomBytes(32).toString('hex')
    const userResponse = { ...user }
    delete (userResponse as any).password
    
    res.json({ success: true, user: userResponse, token })
  } catch (error) {
    res.status(500).json({ success: false, message: '登录失败' })
  }
})

router.post('/logout', async (req, res) => {
  res.json({ success: true, message: '登出成功' })
})

export default router

