import CategoryController from "./category.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import express from 'express'

const router = express.Router()

router.get('/', CategoryController.getAll)

router.post('/',authMiddleware, authorize('admin') ,CategoryController.create)
router.patch('/:id', authMiddleware, authorize('admin'), CategoryController.update)
router.delete('/:id', authMiddleware, authorize('admin'), CategoryController.delete)

export default router