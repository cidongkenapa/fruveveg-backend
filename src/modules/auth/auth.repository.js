import prisma from "../../config/db";

class authRepository {
    static async createUser ({name, email, password}) {
        return await prisma.user.create({
            data : {name , email, password},
            select : {
                id : true,
                name : true,
                email : true,
            }
        })
    }

    static async getUser ({email}) {
        return await prisma.user.findUnique({
            where : { email },
            select : {
                id : true,
                name : true,
                email : true,
                role : true,
                password : true,
            }
        })
    }
}

export default authRepository