import prisma from '../../config/db.js'
import AppError from '../../utils/AppError.js'

class OrderService {
    static async createOrder(userId, { items, address, payment }) {
        if (!items || items.length === 0) {
            throw new AppError('Items cannot be empty', 400)
        }

        const productIds = items.map(item => item.productId)

        const products = await prisma.product.findMany({
            where: { id: { in: productIds } }
        })

        if (productIds.length != products.length) {
            throw new AppError('Some product not found', 404)
        }

        let total = 0

        const orderItemsData = items.map(item => {
            const product = products.find(p => p.id === item.productId)

            if (product.stock < item.quantity) {
                throw new AppError(`Stock not enough for ${product.name}`, 400)
            }

            total += item.quantity * product.price

            return {
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            }
        })

        return await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    total,
                    address,
                    payment,
                }
            })

            for (const item of orderItemsData) {
                await tx.orderItem.create({
                    data: {
                        ...item,
                        orderId: order.id
                    }
                })

                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: { decrement: item.quantity }
                    }
                })
            }

            return await tx.order.findUnique({
                where: { id: order.id },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            })
        })
    }
    static async getMyOrders(userId) {
        return await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    static async getOrderById(id, userId) {
        return await prisma.order.findFirst({
            where: { id: Number(id), userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }

    static async cancelOrder(orderId, userId) {
        const order = await prisma.order.findFirst({
            where: { id: Number(orderId), userId },
            include: { items: true }
        })

        if (!order) throw new AppError('Order not found', 404)
        if (order.status != 'PENDING') {
            throw new AppError('Order cannot be cancelled', 400)
        }

        return await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: { increment: item.quantity }
                    }
                })

                await tx.order.update({
                    where: { id: item.orderId },
                    data: {
                        status: 'CANCELLED',
                        cancelAt: new Date()
                    }
                })
            }
        })
    }

    static async updateStatus(orderId, status) {
        const allowed = ['PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED']
        if (!allowed.includes(status)) {
            throw new AppError('Invalid status', 400)
        }

        const order = await prisma.order.findUnique({
            where: { id: Number(orderId) }
        })

        if (!order) throw new AppError('Order cannot be empty', 404)
        if (order.status === 'COMPLETED') {
            throw new AppError('Order already completed', 400)
        }

        return await prisma.order.update({
            where: { id: Number(orderId) },
            data: { status }
        })
    }
}

export default OrderService