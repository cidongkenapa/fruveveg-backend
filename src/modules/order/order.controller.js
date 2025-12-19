import OrderService from './order.service.js'
import {ok, created, fail} from '../../utils/response.js'

class OrderController {
    static async create(req, res) {
        try{
            const order = await OrderService.createOrder(req.user.id, req.body)
            return created(res, 'Order created', order)
        }catch (err){
            return fail(res, err.message, err.statusCode || 500)
        }
    }
    static async getAll(req, res) {
        try{
            const orders = await OrderService.getMyOrders(req.user.id)
            return ok(res, 'Order fetched', orders)
        }catch (err){
            return fail(res, err.message, err.statusCode || 500)
        }
    }
    static async getById(req, res) {
        try{
            const orders = await OrderService.getOrderById(req.params.id, req.user.id)
            if (!orders) {
                return fail(res, 'Order not found', 404)
            }
            return ok(res, 'Order fetched', orders)
        }catch(err) {
            return fail(res, err.message, err.statusCode || 500)
        }
    }

    static async cancel(req, res) {
        try{
            const order = await OrderService.cancelOrder(req.params.id, req.user.id)
            return ok(res, 'Order cancelled', order)
        }catch(err) {
            return fail(res, err.message, err.statusCode || 500)
        }
    }

    static async update(req, res) {
        try{
            const order = await OrderService.updateStatus(req.params.id, req.body.status)
            return ok(res, 'Order status updated', order)
        }catch(err) {
            return fail(res, err.message, err.statusCode || 500)
        }
    }
}

export default OrderController