import express from 'express'
import OrderController from './order.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
import authorize from '../../middlewares/authorize.middleware.js'


const router = express.Router()
router.use(authMiddleware)

router.post('/', OrderController.create)
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getById)
router.patch('/:id/cancel', OrderController.cancel)

router.patch('/:id/status', authorize('admin'), OrderController.update)

export default router