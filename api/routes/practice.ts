
import { Router } from 'express'
import { storage } from '../data/storage'

const router = Router()

router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params
    const { language } = req.query
    let exercises
    
    if (language) {
      exercises = storage.getExercisesByLanguage(language as string).filter(e => e.type === type)
    } else {
      exercises = storage.getExercisesByType(type)
    }
    
    res.json({ success: true, exercises })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取练习失败' })
  }
})

export default router

