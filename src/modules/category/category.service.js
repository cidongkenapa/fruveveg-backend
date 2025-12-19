import prisma from '../../config/db.js'

class CategoryService {
    static async getAll() {
        return prisma.category.findMany()
    }
    static async create(data) {
        return prisma.category.create({data})
    }
    static async update(id, data) {
        return prisma.category.update({
            where : { id : Number(id) },
            data
        })
    }
    static async delete(id){
        return prisma.category.delete({
            where : { id : Number(id) }
        })
    }
}

export default CategoryService