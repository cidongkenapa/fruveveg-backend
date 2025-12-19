import CategoryService from "./category.service.js";
import { ok, fail, created } from '../../utils/response.js'

class CategoryController {
    static async getAll(req, res){
        try{
            const category = await CategoryService.getAll()
            return ok(res, 'Category fetched', category)
        }catch(err){
            fail(res, err.message, 500)
        }
    }
    static async create(req, res){
        try{
            const category = await CategoryService.create(req.body)
            return created(res, 'Category created', category)
        }catch(err){
            fail(res, err.message, 500)
        }
    }
    static async update(req, res){
        try{
            const category = await CategoryService.update(req.params.id, req.body)
            return ok(res, 'Category updated', category)
        }catch(err){
            fail(res, err.message, 500)
        }
    }
    static async delete(req, res){
        try{
            const category = await CategoryService.delete(req.params.id)
            return ok(res, 'Category deleted', category)
        }catch(err){
            fail(res, err.message, 500)
        }
    }
}

export default CategoryController