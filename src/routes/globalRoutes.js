import { Router } from "express";
import authRoutes from '../modules/auth/auth.route.js'
import userRoutes from '../modules/user/user.route.js'
import productRoutes from '../modules/product/product.route.js'
import categoryRoutes from '../modules/category/category.route.js'
import orderRoutes from '../modules/order/order.route.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/product', productRoutes)
router.use('/category', categoryRoutes)
router.use('/order', orderRoutes)

export default router