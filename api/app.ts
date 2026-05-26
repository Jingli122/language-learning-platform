
import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import coursesRoutes from './routes/courses.js'
import practiceRoutes from './routes/practice.js'
import progressRoutes from './routes/progress.js'
import communityRoutes from './routes/community.js'
import achievementsRoutes from './routes/achievements.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/practice', practiceRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/achievements', achievementsRoutes)

app.use('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ok',
  })
})

app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  })
})

export default app

