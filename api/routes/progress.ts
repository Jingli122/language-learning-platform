
import { Router } from 'express'
import { storage } from '../data/storage'

const router = Router()

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) {
      res.status(400).json({ success: false, message: '缺少用户ID' })
      return
    }
    
    const progress = storage.getUserProgress(userId as string)
    res.json({ success: true, progress })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取进度失败' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, courseId, chapterId, exerciseId, completed, score } = req.body
    
    if (!userId) {
      res.status(400).json({ success: false, message: '缺少用户ID' })
      return
    }
    
    let progress = storage.getUserProgress(userId as string)
    if (!progress) {
      res.status(404).json({ success: false, message: '用户进度不存在' })
      return
    }
    
    const updates: any = {}
    
    if (exerciseId && completed) {
      updates.exercisesCompleted = (progress.exercisesCompleted || 0) + 1
    }
    
    if (courseId) {
      const today = new Date().toISOString().split('T')[0]
      let history = [...(progress.learningHistory || [])]
      const todayRecord = history.find(r => r.date === today)
      
      if (todayRecord) {
        todayRecord.hours = (todayRecord.hours || 0) + 0.1
        todayRecord.exercises = (todayRecord.exercises || 0) + (exerciseId && completed ? 1 : 0)
      } else {
        history.unshift({
          date: today,
          hours: 0.1,
          exercises: exerciseId && completed ? 1 : 0
        })
      }
      updates.learningHistory = history
      updates.totalHours = (progress.totalHours || 0) + 0.1
      
      let courseProgress = [...(progress.courseProgress || [])]
      const courseIndex = courseProgress.findIndex(cp => cp.courseId === courseId)
      
      if (courseIndex !== -1) {
        courseProgress[courseIndex].progress = Math.min((courseProgress[courseIndex].progress || 0) + 10, 100)
        courseProgress[courseIndex].lastStudiedAt = new Date().toISOString()
        if (chapterId) {
          courseProgress[courseIndex].chaptersCompleted = (courseProgress[courseIndex].chaptersCompleted || 0) + 1
        }
      } else {
        courseProgress.push({
          courseId,
          progress: 10,
          chaptersCompleted: chapterId ? 1 : 0,
          lastStudiedAt: new Date().toISOString()
        })
      }
      updates.courseProgress = courseProgress
    }
    
    const updatedProgress = storage.updateUserProgress(userId as string, updates)
    res.json({ success: true, progress: updatedProgress })
  } catch (error) {
    res.status(500).json({ success: false, message: '更新进度失败' })
  }
})

export default router

