import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js'
import authorize from '../../middlewares/authorize.middleware.js'
import * as userRouter from '../user/user.controller.js'

const router = express.Router()

router.get('/', authMiddleware, authorize('admin'), userRouter.getAllUsers)
router.get('/:id', authMiddleware, userRouter.getUserById)
router.patch('/:id', authMiddleware, userRouter.updateUser)
router.delete('/:id', authMiddleware, authorize('admin'), userRouter.deleteUser)

export default router