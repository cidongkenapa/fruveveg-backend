import prisma from "../../config/db.js"

export const findAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })
}

export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where : { id : Number(id) },
        select : {
            id : true,
            name : true,
            email : true,
            role : true,
            createdAt : true
        }
    })
}

export const updateUserById = async (id, data) => {
    return await prisma.user.update({
        where : { id : Number(id) },
        data,
        select : {
            id : true,
            name : true, 
            email : true,
            role : true,
        }
    })
}

export const deleteUserById = async (id) => {
    return await prisma.user.delete({
        where : { id : Number(id) },
    })
}