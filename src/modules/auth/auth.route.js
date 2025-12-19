import express from 'express'
import { register, login } from './auth.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
import { getProfile } from '../user/user.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getProfile)

export default router