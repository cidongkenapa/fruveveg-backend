import prisma from '../../config/db.js'

class ProductService {
    static async getAllProducts({page = 1, limit = 10, search = '', categoryId, sort}){

        page = Number(page)
        limit = Number(limit)

        const where = {}

        const skip = (page - 1) * limit

        if (search) {
            where.name = {
                contains : search,
                mode : 'insensitive'
            }
        }

        if (categoryId) {
            where.categoryId = Number(categoryId)
        }

        let orderBy = { id : 'asc' }

        if (sort) {
            const [field, direction] = sort.split("_")
            orderBy = { [field] : direction }
        }

        const [items, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take : limit,
                orderBy,
                include : { category : true }
            }),
            prisma.product.count({where})
        ])

        const totalPages = Math.ceil(total/limit)

        return {
            items,
            meta : {
                total,
                page,
                limit,
                totalPages
            }
        }
    }

    static async createProduct (data) {
        return await prisma.product.create({
            data
        })
    }

    static async updateProduct (id, data) {
        return await prisma.product.update({
            where : { id : Number(id) },
            data
        })
    }

    static async deleteProduct (id) {
        return await prisma.product.delete({
            where : { id : Number(id) }
        })
    }
}

export default ProductService