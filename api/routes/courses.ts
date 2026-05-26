
import { Router } from 'express'
import { storage } from '../data/storage'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { language } = req.query
    let courses
    
    if (language) {
      courses = storage.getCoursesByLanguage(language as string)
    } else {
      courses = storage.getCourses()
    }
    
    res.json({ success: true, courses })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取课程失败' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const course = storage.getCourseById(req.params.id)
    if (!course) {
      res.status(404).json({ success: false, message: '课程不存在' })
      return
    }
    res.json({ success: true, course })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取课程失败' })
  }
})

export default router

