
import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import companiesRoutes from './routes/companies.js'
import transactionsRoutes from './routes/transactions.js'
import accountsRoutes from './routes/accounts.js'
import vouchersRoutes from './routes/vouchers.js'
import reportsRoutes from './routes/reports.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/api/companies', companiesRoutes)
app.use('/api/transactions', transactionsRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/vouchers', vouchersRoutes)
app.use('/api/reports', reportsRoutes)

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

