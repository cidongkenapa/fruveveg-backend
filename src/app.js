import express from 'express'
import globalRoutes from './routes/globalRoutes.js'
import errorHandler from './middlewares/error.middleware.js'
import cors from 'cors'
import loggerMiddleware from './middlewares/logger.middleware.js'
const app = express()

app.use(express.json())

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fruveveg.vercel.app',
    'https://fruveveg-frontend-git-main-cidongkenapa.vercel.app', // Ganti cidongkenapa dengan username GitHub kamu
    /\.vercel\.app$/  // Allow all Vercel preview deployments
  ],
  credentials: true,
}))
app.use(loggerMiddleware)

app.use('/api', globalRoutes)
app.use('/images', express.static('public/images'));

app.use(errorHandler)

export default app