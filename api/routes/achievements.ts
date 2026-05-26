
import { Router } from 'express'
import { storage } from '../data/storage'

const router = Router()

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    const achievements = storage.getAchievements()
    let unlocked = []
    
    if (userId) {
      const userAchievements = storage.getUserAchievements(userId as string)
      unlocked = userAchievements.map(a => a.achievementId)
    }
    
    res.json({ success: true, achievements, unlocked })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取成就失败' })
  }
})

router.post('/unlock', async (req, res) => {
  try {
    const { userId, achievementId } = req.body
    
    if (!userId || !achievementId) {
      res.status(400).json({ success: false, message: '缺少必填字段' })
      return
    }
    
    const existing = storage.getUserAchievements(userId).find(
      a => a.achievementId === achievementId
    )
    
    if (existing) {
      res.status(400).json({ success: false, message: '成就已解锁' })
      return
    }
    
    const userAchievement = {
      id: generateId(),
      userId,
      achievementId,
      unlockedAt: new Date().toISOString()
    }
    
    storage.unlockAchievement(userAchievement)
    res.json({ success: true, userAchievement })
  } catch (error) {
    res.status(500).json({ success: false, message: '解锁成就失败' })
  }
})

export default router

