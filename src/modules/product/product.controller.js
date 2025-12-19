import ProductService from './product.service.js'
import { ok, fail, created } from '../../utils/response.js'

class ProductController {
    static async getAll(req, res){
        try{
            const { page, limit , search, categoryId, sort } = req.query
            const products = await ProductService.getAllProducts({
                page,
                limit,
                search,
                categoryId,
                sort
            })

            if(!products) return fail(res, 'Product not found', 404)

            return ok(res, 'Product fetched', products, 200)
        }catch(err){
            return fail(res, err.message, 500)
        }
    }

    static async create(req, res){
        try{
            const product = await ProductService.createProduct(req.body)
            return created(res, 'Product created', product)
        }catch(err){
            return fail(res, err.message, 500)
        }
    }

    static async update(req, res){
        try{
            const { id } = req.params

            const product = await ProductService.updateProduct(id, req.body)
            return ok(res, 'Product updated', product)
        }catch(err){
            return fail(res, err.message, 500)
        }
    }

    static async delete(req, res){
        try{
            const { id } = req.params

            const deleted = await ProductService.deleteProduct(id)
            return ok(res, 'Product deleted', deleted)
        }catch(err){
            return fail(res, err.message, 500)
        }
    }
}

export default ProductController