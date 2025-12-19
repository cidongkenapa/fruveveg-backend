import express from 'express'
import ProductController from './product.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
import authorize from '../../middlewares/authorize.middleware.js'

const router = express.Router()

router.get('/', ProductController.getAll)

router.post('/', authMiddleware, authorize('admin'), ProductController.create)
router.patch('/:id', authMiddleware, authorize('admin'), ProductController.update)
router.delete('/:id', authMiddleware, authorize('admin'), ProductController.delete)

export default router