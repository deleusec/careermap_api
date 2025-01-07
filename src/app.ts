import express, { Application } from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import compression from 'compression'
import router from './routes'
import prisma from './config/client'

dotenv.config()

/* Initialize express */
const app: Application = express()
const PORT = process.env.NODE_PORT || 5000

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Security Middlewares */
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
  }),
)
app.use(hpp())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(
  compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false
      }
      return compression.filter(req, res)
    },
  }),
)

/* Trust proxy */
app.set('trust proxy', 1)

/* Disable powered by header */
app.disable('x-powered-by')

/* Logging */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'))
}

/* Rate limiting */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  }),
)

/* Routes */
app.use('/api', router)

/* Create HTTP server */
const server = createServer(app)

/* Start server */
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 💜`)
})

process.on('SIGTERM', async () => {
  console.log(
    'SIGTERM signal received. Closing HTTP server and Prisma connection.',
  )
  await prisma.$disconnect()
  server.close(() => {
    console.log('HTTP server closed.')
  })
})
